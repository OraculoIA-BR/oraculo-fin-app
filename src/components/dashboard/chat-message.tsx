// src/components/dashboard/chat-message.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type MessageProps = {
    role: 'user' | 'model';
    content: string;
};

export const ChatMessage: React.FC<MessageProps> = ({ role, content }) => {
    const isUser = role === 'user';
    return (
        <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
            {!isUser && (
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28.png" alt="Oráculo" />
                    <AvatarFallback>O</AvatarFallback>
                </Avatar>
            )}
            <div className={`rounded-lg px-4 py-2 max-w-[80%] break-words ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                <p className="text-sm">{content}</p>
            </div>
        </div>
    );
};
