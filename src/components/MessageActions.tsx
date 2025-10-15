import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Reply, Forward, MoreHorizontal, Smile, MessageSquare, Copy, Bookmark, Bell, Link2, Volume2, Flag } from "lucide-react";
import { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { toast } from 'sonner';

interface MessageActionsProps {
  content: string;
  onReply: () => void;
  onForward: () => void;
  onCreateThread: () => void;  // Add this line
  onMenuOpenChange: (open: boolean) => void;
  onReaction: (emoji: string) => void;
  messageId: string;
}

export const MessageActions = ({ 
  content, 
  onReply, 
  onForward,
  onCreateThread,  // Add this line
  onMenuOpenChange,
  onReaction,
  messageId 
}: MessageActionsProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Handler functions for each action
  const handleAddReaction = () => {
    setShowEmojiPicker(true);
  };

  const handleCreateThread = () => {
    // TODO: Implement thread creation
    console.log('Create thread clicked');
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Copied to clipboard!', {
        duration: 2000,
      });
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const handleBookmarkMessage = () => {
    // TODO: Implement bookmark functionality
    console.log('Message bookmarked');
  };

  const handleMarkUnread = () => {
    // TODO: Implement mark as unread
    console.log('Message marked as unread');
  };

  const handleCopyMessageLink = async () => {
    try {
      // Generate a message link (you'll need to implement this based on your routing)
      const messageLink = `${window.location.origin}/message/${Date.now()}`;
      await navigator.clipboard.writeText(messageLink);
      console.log('Message link copied');
    } catch (err) {
      console.error('Failed to copy message link:', err);
    }
  };

  const handleSpeakMessage = () => {
    const utterance = new SpeechSynthesisUtterance(content);
    window.speechSynthesis.speak(utterance);
  };

  const handleReportMessage = () => {
    if (window.confirm('Are you sure you want to report this message?')) {
      // TODO: Implement report functionality
      console.log('Message reported');
    }
  };

  const handleEmojiSelect = (emojiData: any) => {
    console.log('Emoji selected:', emojiData);
    onReaction(emojiData.native); // Pass the native emoji character
    setShowEmojiPicker(false);
    onMenuOpenChange(false); // Close the menu after selection
  };

  return (
    <div className="flex items-center space-x-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
            onClick={onReply}
          >
            <Reply className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Reply</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
            onClick={onForward}
          >
            <Forward className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Forward</TooltipContent>
      </Tooltip>

      <DropdownMenu onOpenChange={onMenuOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-56"
          style={{ zIndex: 9999 }}
        >
          <DropdownMenuItem onSelect={handleAddReaction}>
            <Smile className="mr-2 h-4 w-4" />
            Add Reaction
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onCreateThread}>  {/* Add this line */}
            <MessageSquare className="mr-2 h-4 w-4" />
            Create Thread
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyText}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Text
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleBookmarkMessage}>
            <Bookmark className="mr-2 h-4 w-4" />
            Bookmark Message
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleMarkUnread}>
            <Bell className="mr-2 h-4 w-4" />
            Mark Unread
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyMessageLink}>
            <Link2 className="mr-2 h-4 w-4" />
            Copy Message Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSpeakMessage}>
            <Volume2 className="mr-2 h-4 w-4" />
            Speak Message
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleReportMessage} className="text-destructive">
            <Flag className="mr-2 h-4 w-4" />
            Report Message
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showEmojiPicker && (
        <div 
          className="absolute bottom-full right-0 mb-2"
          style={{ zIndex: 99999 }}
        >
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="dark"
            previewPosition="none"
            skinTonePosition="none"
          />
        </div>
      )}
    </div>
  );
};