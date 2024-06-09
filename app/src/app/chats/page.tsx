import ChatList from "@/components/chat/ChatList"

export default function Chats() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">All chats</h1>
            <ChatList />
        </div>
    )
}
