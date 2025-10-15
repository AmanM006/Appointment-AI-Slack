import { useState } from 'react';
import { MessageActions } from './MessageActions';
import { toast } from 'sonner';

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

interface MessageProps {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  reactions: Reaction[];
  threadId?: string;
  parentId?: string;
  onReaction: (emoji: string) => void;
  onReply: () => void;
  onForward: () => void;
  onCreateThread: () => void;
}

export const Message = ({ 
  id, 
  content, 
  author, 
  timestamp, 
  reactions, 
  threadId,
  onReaction,
  onReply,
  onForward,
  onCreateThread
}: MessageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCreateThread = () => {
    onCreateThread();
    setIsMenuOpen(false);
  };

  return (
    <div 
      className="group relative px-4 py-2 hover:bg-secondary/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => !isMenuOpen && setIsHovered(false)}
    >
      <div className="flex flex-col relative">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {/* Avatar here */}
          </div>
          <div className="flex-1">
            <div className="flex items-baseline">
              <span className="font-medium text-foreground">{author}</span>
              <span className="ml-2 text-xs text-muted-foreground">{timestamp}</span>
            </div>
            <p className="mt-1 text-sm text-foreground">{content}</p>
          </div>
        </div>

        {reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 justify-end relative z-50">
            {reactions.map(reaction => (
              <button
                key={reaction.emoji}
                onClick={() => onReaction(reaction.emoji)}
                className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-sm
                  ${reaction.users.includes('currentUser') 
                    ? 'bg-primary/20 hover:bg-primary/30' 
                    : 'bg-secondary hover:bg-secondary/80'
                  }`}
              >
                <span>{reaction.emoji}</span>
                <span className="text-xs text-muted-foreground">{reaction.count}</span>
              </button>
            ))}
          </div>
        )}

        {(isHovered || isMenuOpen) && (
          <div className="absolute right-4 top-2 z-50">
            <MessageActions 
              content={content}
              onReply={onReply}
              onForward={onForward}
              onCreateThread={handleCreateThread}
              onMenuOpenChange={setIsMenuOpen}
              onReaction={onReaction}
              messageId={id}
            />
          </div>
        )}

        {/* Show thread indicator if message is part of a thread */}
        {threadId && (
          <div className="mt-2 text-xs text-muted-foreground">
            <button onClick={handleCreateThread} className="hover:underline">
              View Thread
            </button>
          </div>
        )}
      </div>
    </div>
  );
};