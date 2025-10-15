import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, Hash, MessageCircle, Info } from 'lucide-react';
import { AddChannelModal } from './AddChannelModal';
import { AddDMModal } from './AddDMModal';

interface Channel {
  id: string;
  name: string;
  description?: string;
  unread?: number;
  type: 'channel' | 'dm';
}

interface WorkspaceSidebarProps {
  selectedChannel: string;
  onChannelSelect: (channelId: string) => void;
  onAIChatToggle: () => void;
  onShowChannelDetails: () => void;
  rightSidebarContent: 'ai' | 'details' | null;
  userEmail?: string; // Add this prop
}

export const WorkspaceSidebar = ({ 
  selectedChannel, 
  onChannelSelect, 
  onAIChatToggle, 
  onShowChannelDetails,
  rightSidebarContent,
  userEmail = '' // Provide default value
}: WorkspaceSidebarProps) => {
  // Extract company name from email
  const companyName = userEmail
    ? userEmail.split('@')[1]?.split('.')[0]?.charAt(0).toUpperCase() + 
      userEmail.split('@')[1]?.split('.')[0]?.slice(1)
    : 'Your Workspace';

  const [showAddChannel, setShowAddChannel] = useState(false);
  const [showAddDM, setShowAddDM] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([
    { id: 'general', name: 'general', description: 'General team discussion', unread: 3, type: 'channel' },
    { id: 'random', name: 'random', description: 'Random conversations', unread: 1, type: 'channel' },
    { id: 'development', name: 'development', description: 'Development team updates', type: 'channel' },
    { id: 'design', name: 'design', description: 'Design team collaboration', unread: 5, type: 'channel' },
  ]);
  const [directMessages, setDirectMessages] = useState<Channel[]>([
    { id: 'john-doe', name: 'John Doe', unread: 2, type: 'dm' },
    { id: 'sarah-wilson', name: 'Sarah Wilson', type: 'dm' },
    { id: 'mike-johnson', name: 'Mike Johnson', unread: 1, type: 'dm' },
  ]);

  const handleCreateChannel = (name: string, description: string) => {
    const newChannel: Channel = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      description,
      type: 'channel'
    };
    setChannels(prev => [...prev, newChannel]);
  };

  const handleCreateDM = (userName: string) => {
    const newDM: Channel = {
      id: userName.toLowerCase().replace(/\s+/g, '-'),
      name: userName,
      type: 'dm'
    };
    setDirectMessages(prev => [...prev, newDM]);
  };

  return (
    <>
      <div className="w-64 bg-secondary/80 border-r border-border flex flex-col h-full">
        {/* Workspace Header */}
        <div className="p-4 border-b border-border">
          <h1 className="text-lg font-bold text-foreground">{companyName}</h1>
          <p className="text-sm text-muted-foreground">{companyName.toLowerCase()}.workspace</p>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {/* Channels Section */}
          <div>
            <div className="flex items-center justify-between px-2 py-1 mb-2">
              <span className="text-sm font-medium text-muted-foreground">Channels</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => setShowAddChannel(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {channels.map((channel) => (
                <Button
                  key={channel.id}
                  variant={selectedChannel === channel.id ? "secondary" : "ghost"}
                  className={`w-full justify-start px-2 py-1.5 h-auto ${
                    selectedChannel === channel.id ? 'bg-primary/20 text-primary' : 'text-foreground hover:bg-accent'
                  }`}
                  onClick={() => onChannelSelect(channel.id)}
                >
                  <Hash className="h-4 w-4 mr-2" />
                  <span className={`flex-1 text-left ${channel.unread ? 'font-semibold' : ''}`}>
                    {channel.name}
                  </span>
                  {channel.unread && (
                    <Badge variant="destructive" className="ml-auto h-5 min-w-5 text-xs">
                      {channel.unread}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Direct Messages Section */}
          <div>
            <div className="flex items-center justify-between px-2 py-1 mb-2">
              <span className="text-sm font-medium text-muted-foreground">Direct Messages</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6"
                onClick={() => setShowAddDM(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {directMessages.map((dm) => (
                <Button
                  key={dm.id}
                  variant={selectedChannel === dm.id ? "secondary" : "ghost"}
                  className={`w-full justify-start px-2 py-1.5 h-auto ${
                    selectedChannel === dm.id ? 'bg-primary/20 text-primary' : 'text-foreground hover:bg-accent'
                  }`}
                  onClick={() => onChannelSelect(dm.id)}
                >
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
                  <span className={`flex-1 text-left ${dm.unread ? 'font-semibold' : ''}`}>
                    {dm.name}
                  </span>
                  {dm.unread && (
                    <Badge variant="destructive" className="ml-auto h-5 min-w-5 text-xs">
                      {dm.unread}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* AI Assistant */}
          <div>
            <Button
              variant="ghost"
              className="w-full justify-start px-2 py-1.5 h-auto text-purple-400 hover:bg-purple-500/20 hover:text-purple-300"
              onClick={onAIChatToggle}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="flex-1 text-left">AI Assistant</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddChannelModal
        isOpen={showAddChannel}
        onClose={() => setShowAddChannel(false)}
        onCreateChannel={handleCreateChannel}
      />
      <AddDMModal
        isOpen={showAddDM}
        onClose={() => setShowAddDM(false)}
        onCreateDM={handleCreateDM}
      />
    </>
  );
};

