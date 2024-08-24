import ChatWindow from "@/components/chat/ChatWindow";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

async function getChat(id: string): Promise<any>{
    const res = await fetch(`http://localhost:8080/api/chats/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch messages');
    }
    const data = await res.json(); // Read the response body once
    return data;
}

export default async function ChatDetails({
    params,
}: {
    params: { id: string }
}) {
    const chat = await getChat(params.id)

    return (
        <>
            <div className="container mx-auto p-10">
                <ChatWindow title={chat.chatName} messages={chat.messages} />
            </div>
        </>
    )
}
