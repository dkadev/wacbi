'use client'

import { Chat, columns } from "@/components/chat/ChatModel"
import { ChatTable } from "@/components/chat/ChatTable"
import { useEffect, useState } from 'react';

async function getChats(): Promise<Chat[]> {
    const response = await fetch("http://localhost:8080/api/chats")
    const data = await response.json()
    console.log(data)
    return data
}

export default function ChatList() {
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        getChats().then(data => setChats(data));
    }, []);

    return <ChatTable columns={columns} data={chats} />
}