import React from 'react';
import { cn } from '@/lib/utils';
import { ChatMessage as ChatMessageType } from '@/types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = 'user' in message;
  
  return (
    <div className={cn(
      "flex w-full max-w-[85%] flex-col gap-2 rounded-lg px-4 py-3 mb-4",
      isUser ? "ml-auto bg-primary text-primary-foreground" : "mr-auto bg-muted"
    )}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium">
          {isUser ? 'You' : 'Token Metrics AI'}
        </span>
      </div>
      <div className="whitespace-pre-wrap text-sm">
        {isUser ? message.user : message.chatbot}
      </div>
    </div>
  );
};

export default ChatMessage;