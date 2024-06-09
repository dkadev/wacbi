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

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (fileInputRef.current && fileInputRef.current.files) {
            const formData = new FormData();
            formData.append('file', fileInputRef.current.files[0]);

            try {
                const response = await fetch('http://localhost:8080/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.text();
                console.log(result); // Log the response from the server
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

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
                    <form onSubmit={handleSubmit}>
                        <div className="w-full gap-1.5 flex h-[150px] items-center justify-center rounded-md border border-dashed text-sm my-2">
                            <Input className="border-0" type="file" ref={fileInputRef}/>
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