import { Chat, columns } from "@/components/chat/ChatModel"
import { ChatTable } from "@/components/chat/ChatTable"

async function getChats(): Promise<Chat[]> {
    // Fetch data from API here, static data for now
    return [
        {
            id: "728ed52f",
            date: "2021-01-01",
            name: "Marty McFly",
            message_count: 236,
            attachment_count: 12,
        },
        {
            id: "a7b7c7d7",
            date: "2021-01-02",
            name: "Doc Brown",
            message_count: 5938,
            attachment_count: 24,
        },
        {
            id: "e7f7g7h7",
            date: "2021-01-03",
            name: "Biff Tannen",
            message_count: 879,
            attachment_count: 54,
        }
    ]
}

export default async function ChatList() {
    const chats = await getChats()

    return <ChatTable columns={columns} data={chats} />
}

