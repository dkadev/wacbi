import React, { useRef } from 'react';

import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const ChatUpload: React.FC = () => {

    // Upload file code here

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload chat backup file</DialogTitle>
                    <DialogDescription>
                        Drag and drop a .zip file containing your
                        messages here.
                    </DialogDescription>
                    <form>
                        <div className="w-full gap-1.5 flex h-[150px] items-center justify-center rounded-md border border-dashed text-sm my-2">
                            <Input className="border-0" type="file" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Supported formats: .zip
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Max file size: 100MB
                        </p>
                        <div className="flex items-center justify-center my-2">
                            <Button type="submit">
                                <Upload className="mr-2 h-4 w-4" />{" "}
                                Upload file
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ChatUpload;