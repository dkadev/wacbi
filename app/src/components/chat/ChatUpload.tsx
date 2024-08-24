import React, { useRef, useState } from 'react';

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
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (fileInputRef.current?.files) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', fileInputRef.current.files[0]);

            try {
                const response = await fetch('http://localhost:8080/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    setOpen(false);
                }
                
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={isLoading}>
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
                            {isLoading ? "Uploading chat file..." : 
                            
                            <Button type="submit">
                                <Upload className="mr-2 h-4 w-4" />{" "}
                                Upload file
                            </Button>
                            }

                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ChatUpload;
