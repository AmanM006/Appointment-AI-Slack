import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Smile, Paperclip, Hash } from 'lucide-react';
import { Message } from '@/components/Message';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';
import { getAuth } from "firebase/auth";
import { useAuth } from "../../context/AuthProvider";


interface Message {
  _id: string;
  content: string;
  author: string;
  timestamp: string;
  reactions: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
  threadId?: string;
}

interface MainContentProps {
  selectedChannel: string;
}

export const MainContent = ({ selectedChannel }: MainContentProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { uid } = useAuth();

  // Move socket connection inside component
  const socket = io('http://localhost:3001', {
    withCredentials: true,
    transports: ['websocket', 'polling']
  });

  // Socket connection effect
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
    };
  }, []);

  // Fetch messages effect
  useEffect(() => {
    fetchMessages();
    
    socket.on('receiveMessage', (newMessage: Message) => {
      setMessages(prev => [...prev, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const fetchMessages = async () => {
    try {
      console.log('Fetching messages...');
      const response = await fetch('http://localhost:3001/api/messages', {
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Fetched messages:', data);
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  
  const handleSendMessage = async () => {
  if (!message.trim()) return;

  try {
    const newMessage = {
      uid: uid, // Send this separately
      content: message,
      timestamp: new Date().toISOString(),
      reactions: [],
      threadId: null,
      parentId: null
    };

    const response = await fetch('http://localhost:3001/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const savedMessage = await response.json();

    // Emit the saved message from server
    socket.emit('newMessage', savedMessage);
    setMessage('');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};


  const handleReaction = async (messageId: string, emoji: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/messages/${messageId}/reactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emoji,
          userId: 'currentUser' // Replace with actual user ID
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add reaction');
      }

      const updatedMessage = await response.json();
      setMessages(prev => 
        prev.map(msg => msg._id === messageId ? updatedMessage : msg)
      );
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const getChannelDisplayName = (channelId: string) => {
    const channelNames: Record<string, string> = {
      'general': 'general',
      'random': 'random',
      'development': 'development',
      'design': 'design',
      'john-doe': 'John Doe',
      'sarah-wilson': 'Sarah Wilson',
      'mike-johnson': 'Mike Johnson',
    };
    return channelNames[channelId] || channelId;
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Channel header - Added z-40 to be below reactions */}
      <div className="h-12 bg-card border-b border-border flex items-center px-6 relative z-">
        <div className="flex items-center space-x-2">
          <Hash className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium text-foreground">{selectedChannel}</span>
          <Badge variant="secondary" className="text-xs">
            24 members
          </Badge>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <Message 
            key={msg._id}
            id={msg._id}
            content={msg.content}
            author={msg.author}
            timestamp={new Date(msg.timestamp).toLocaleTimeString()}
            reactions={msg.reactions}
            onReaction={(emoji) => handleReaction(msg._id, emoji)}
            onReply={() => {/* Implement reply */}}
            onForward={() => {/* Implement forward */}}
            onCreateThread={() => {/* Implement thread creation */}}
          />
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <Input
              placeholder={`Message #${getChannelDisplayName(selectedChannel)}`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="pr-20 resize-none bg-background border-input focus:ring-primary/50"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button 
            onClick={handleSendMessage}
            className="glow-button"
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
