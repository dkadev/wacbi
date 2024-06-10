import { Chat, columns } from "@/components/chat/ChatModel"
import { ChatTable } from "@/components/chat/ChatTable"

async function getChats(): Promise<Chat[]> {
    const response = await fetch("http://localhost:8080/api/chats")
    const data = await response.json()

    console.log(data)

    return data
}

export default async function ChatList() {
    const chats = await getChats()

    return <ChatTable columns={columns} data={chats} />
}

