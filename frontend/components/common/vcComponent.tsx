'use client';
import { useRef, useEffect, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { apiCall } from '@/services/api';

function randomID(len: number) {
    let result = '';
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export default function VideoCall({ roomID, userID }: any) {
    const callContainerRef = useRef<HTMLDivElement>(null);
    const zpRef = useRef<any>(null);

    useEffect(() => {
        const myMeeting = async () => {
            const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APPID);
            const serverSecret = `${process.env.NEXT_PUBLIC_ZEGO_SECRET}`;
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zpRef.current = zp; // Store the zp instance in the ref

            zp.joinRoom({
                container: callContainerRef.current,
                sharedLinks: [
                    {
                        name: 'Personal link',
                        url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                onLeaveRoom: async () => {
                    try {
                        const sessionEnd = new Date();
                        const sessionEndTime = sessionEnd.toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        });
                        console.log('Session End Time:', sessionEndTime);

                        const response = await apiCall({
                            method: 'PUT',
                            endpoint: `client/slot`,
                            body: { sessionEnd: sessionEndTime, roomID }
                        });

                        if (response.status === 'ok') {
                            console.log('Session data saved successfully');
                        } else {
                            console.error('Failed to save session data', response);
                        }
                    } catch (error) {
                        console.error('Error during cleanup:', error);
                    }
                }
            });
        };

        if (typeof window !== 'undefined') {
            myMeeting();
        }

        return () => {
            if (zpRef.current) {
                try {
                    zpRef.current.destroy();
                } catch (error) {
                    console.error('Error destroying ZegoUIKitPrebuilt instance:', error);
                }
            }
        };
    }, [roomID, userID]);

    return (
        <div
            className="myCallContainer"
            ref={callContainerRef}
            style={{ width: '100vw', height: '100vh' }}
        ></div>
    );
}
