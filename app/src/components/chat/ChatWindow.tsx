import React from 'react'; // Import React
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import ChatBubble from "@/components/chat/ChatBubble";

interface ChatWindowProps {
    title: string;
    messages: {
        id: number;
        author: string;
        content: string;
        date: string;
    }[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ title, messages }) => {
    return (
        <Card className="w-full">
            <CardHeader className="bg-primary text-primary-foreground px-4 py-3 rounded-t-md">
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex flex-col gap-4 overflow-auto max-h-[calc(100vh-20vh)]">
                {messages.map((msg) => (
                    <ChatBubble key={msg.id} message={msg.content} author={msg.author} sender={msg.author === 'David'} date={msg.date} />
                ))}
            </CardContent>
            <CardFooter className="bg-muted rounded-b-md px-4 py-3 flex items-center gap-2">
            </CardFooter>
        </Card>
    );
};

export default ChatWindow;