'use client';
import { useRef, useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len: number) {
    let result = '';
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    const maxPos = chars.length;
    for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
}

export default function VideoCall({ roomID }: any) {
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
            });
        };

        if (typeof window !== 'undefined') {
            myMeeting();
        }

        // Cleanup function to leave the room and stop the camera
        return () => {
            if (zpRef.current) {
                try {
                    // If there's a specific method to leave the room, use it here
                    // zpRef.current.leaveRoom(); // Uncomment this if such a method exists

                    // Use destroy method to clean up
                    zpRef.current.destroy();
                } catch (error) {
                    console.error('Error during cleanup:', error);
                }
                zpRef.current = null; // Reset the ref
            }
        };
    }, [roomID]);

    return (
        <div
            className="myCallContainer"
            ref={callContainerRef}
            style={{ width: '100vw', height: '100vh' }}
        ></div>
    );
}
