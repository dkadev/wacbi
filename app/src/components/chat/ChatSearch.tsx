import React, { useState } from 'react';

import { Input } from "@/components/ui/input"

interface ChatSearchProps {
    table: any;
}

const ChatSearch: React.FC<ChatSearchProps> = ({ table }) => {

    return (
        <Input
            placeholder="Search chat..."
            value={
                (table.getColumn("name")?.getFilterValue() as string) ??
                ""
            }
            onChange={(event) =>
                table
                    .getColumn("name")
                    ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
        />
    );
};

export default ChatSearch;