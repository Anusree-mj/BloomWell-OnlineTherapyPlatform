'use client'
import VideoCall from "@/components/common/vcComponent"


export default function Page({ params }: { params: { roomId: string, userID: string } }) {
    return <VideoCall roomID={params.roomId} userID={params.userID}/>;

}

