"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash } from "lucide-react"

import Link from "next/link"

import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Chat = {
    _id(_id: any): void
    id: string
    name: string
    date_first_message: string
    date_last_message: string
    message_count: number
    attachment_count: number
}

export const columns: ColumnDef<Chat>[] = [
    {
        accessorKey: "chatName",
        header: "Name",
    },
    {
        accessorKey: "dateFirstMessage",
        header: "First message",
    },
    {
        accessorKey: "dateLastMessage",
        header: "Last message",
    },
    {
        accessorKey: "totalMessages",
        header: "Messages",
    },
    {
        accessorKey: "totalAttachments",
        header: "Attachments",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const chat = row.original

            console.log(chat)

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(chat._id.toString())
                            }
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/chats/${chat._id}`}>View chat</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="link">
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete chat and
                                        remove related data from database.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
