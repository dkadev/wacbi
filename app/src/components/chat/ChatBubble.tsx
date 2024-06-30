import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface ChatBubbleProps {
    message: string;
    author: string;
    sender: boolean;
    date: string;
}

// Simple hash function to generate a number based on the author's name
const generateHash = (input: string) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

const hashToColor = (hash: number) => {
    return '#' + (hash % 0xFFFFFF).toString(16).padStart(6, '0');
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, author, sender, date }) => {
    const authorColor = hashToColor(generateHash(author));

    return (
        <div className={`flex items-start gap-3 ${sender ? 'justify-end' : ''}`}>
            <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>
                    {author[0].toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className={`${sender ? 'bg-primary rounded-lg p-3 max-w-[75%] text-primary-foreground' : 'bg-muted rounded-lg p-3 max-w-[75%]'}`}>
                <p className="font-medium" style={sender ? {} : { color: authorColor }}>{sender ? "You" : author}</p>
                <div>
                    {message.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </div>
                <small className="text-xs">{date}</small>
            </div>
        </div>
    );
};

export default ChatBubble;