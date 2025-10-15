import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from '../types/message';

interface MessageStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  addReaction: (messageId: string, emoji: string, userId: string) => void;
  createThread: (parentMessageId: string, threadMessage: Message) => void;
  addReply: (parentMessageId: string, replyMessage: Message) => void;
}

export const useMessageStore = create<MessageStore>()(
  persist(
    (set, get) => ({
      messages: [],
      
      addMessage: (message) => {
        set((state) => ({
          messages: [...state.messages, message]
        }));
      },
      
      updateMessage: (messageId, updates) => {
        set((state) => ({
          messages: state.messages.map((msg) => 
            msg.id === messageId ? { ...msg, ...updates } : msg
          )
        }));
      },
      
      addReaction: (messageId, emoji, userId) => {
        set((state) => ({
          messages: state.messages.map((msg) => {
            if (msg.id !== messageId) return msg;
            
            const reactions = [...(msg.reactions || [])];
            const existingReaction = reactions.find(r => r.emoji === emoji);
            
            if (existingReaction) {
              if (existingReaction.users.includes(userId)) {
                // Remove reaction
                if (existingReaction.count === 1) {
                  return {
                    ...msg,
                    reactions: reactions.filter(r => r.emoji !== emoji)
                  };
                }
                return {
                  ...msg,
                  reactions: reactions.map(r => 
                    r.emoji === emoji 
                      ? { ...r, count: r.count - 1, users: r.users.filter(u => u !== userId) }
                      : r
                  )
                };
              }
              // Add to existing reaction
              return {
                ...msg,
                reactions: reactions.map(r => 
                  r.emoji === emoji 
                    ? { ...r, count: r.count + 1, users: [...r.users, userId] }
                    : r
                )
              };
            }
            // Add new reaction
            return {
              ...msg,
              reactions: [...reactions, { emoji, count: 1, users: [userId] }]
            };
          })
        }));
      },
      
      createThread: (parentMessageId, threadMessage) => {
        const threadId = `thread-${Date.now()}`;
        set((state) => ({
          messages: [
            ...state.messages.map(msg => 
              msg.id === parentMessageId 
                ? { ...msg, threadId }
                : msg
            ),
            { ...threadMessage, threadId }
          ]
        }));
      },
      
      addReply: (parentMessageId, replyMessage) => {
        set((state) => ({
          messages: [...state.messages, { ...replyMessage, parentId: parentMessageId }]
        }));
      },
    }),
    {
      name: 'message-storage',
    }
  )
);