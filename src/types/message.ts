export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Message {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  reactions: Reaction[];
  parentId?: string; // for replies
  threadId?: string; // for threads
}