import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

async function getMessages(id: string): Promise<Message[]> {
    // const res = await fetch(`/api/chats/${id}/messages`)
    // return res.json()
    return [
        {
            id: "728ed52f",
            body: "Hey, how's everyone doing?",
            author: "User123",
            date: "2023-08-21",
        },
        {
            id: "728ed52f",
            body: "I just watched an amazing movie last night!",
            author: "MovieBuff55",
            date: "2023-08-21",
        },
        {
            id: "728ed52f",
            body: "Any plans for the weekend?",
            author: "ChattyCathy",
            date: "2023-08-22",
        },
        {
            id: "728ed52f",
            body: "Just got back from a fantastic vacation. Missing the beach already!",
            author: "TravelBug2023",
            date: "2023-08-23",
        },
        {
            id: "728ed52f",
            body: "Remember the book club meeting is postponed to next week.",
            author: "BookWorm87",
            date: "2023-08-24",
        },
    ]
}

export default async function ChatDetails({
    params,
}: {
    params: { id: string }
}) {
    const messages = await getMessages(params.id)

    return (
        <>
            <div className="container mx-auto">
                {/* Chat component here */}
            </div>
        </>
    )
}
