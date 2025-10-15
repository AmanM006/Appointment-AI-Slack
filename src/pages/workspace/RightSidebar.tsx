import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Separator } from '@/components/ui/separator';
import { X, Hash, Users, Bell, Info } from 'lucide-react';
interface RightSidebarProps {
  content: 'ai' | 'details';
  onClose: () => void;
  selectedChannel?: string;
  onShowChannelDetails?: () => void;
}

export const RightSidebar = ({ content, onClose, selectedChannel, onShowChannelDetails }: RightSidebarProps) => {
  const getChannelInfo = (channelId?: string) => {
    const channelMap: Record<string, { name: string; description: string; members: number }> = {
      'general': { name: 'general', description: 'General team discussion', members: 24 },
      'random': { name: 'random', description: 'Random conversations', members: 18 },
      'development': { name: 'development', description: 'Development team updates', members: 12 },
      'design': { name: 'design', description: 'Design team collaboration', members: 8 },
    };
    return channelMap[channelId || 'general'] || channelMap['general'];
  };

  const channelInfo = getChannelInfo(selectedChannel);

  if (content === 'ai') {
    return (
      <div className="w-80 bg-background border-l border-border flex flex-col h-full">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">AI Assistant</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 p-4">
          <p className="text-sm text-muted-foreground">AI chat interface would go here...</p>
        </div>
      </div>
    );
  }

  if (content === 'details') {
    return (
      <div className="w-80 bg-background border-l border-border flex flex-col h-full">
        <div className="p-4 h-12 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Hash className="h-5 w-5" />
            <h2 className="text-lg font-semibold">{channelInfo.name}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Channel Description */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">About</h3>
              <p className="text-sm text-muted-foreground">{channelInfo.description}</p>
            </div>

            <Separator />

            {/* Members Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-foreground">Members</h3>
                  <Badge variant="secondary" className="text-xs">
                    {channelInfo.members}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                {['John Doe', 'Sarah Wilson', 'Mike Johnson', 'Emily Davis', 'Alex Chen'].map((member, index) => (
                  <div key={member} className="flex items-center space-x-3 p-2 rounded hover:bg-accent">
                    <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{member.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{member}</p>
                      <p className="text-xs text-muted-foreground">
                        {index === 0 ? 'Admin' : index === 1 ? 'Moderator' : 'Member'}
                      </p>
                    </div>
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Channel Settings */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">Settings</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start h-8 px-2">
                  <Bell className="h-4 w-4 mr-2" />
                  <span className="text-sm">Notification settings</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start h-8 px-2">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">Manage members</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Component for the floating channel details button
export const FloatingChannelDetails = ({ selectedChannel, onShowChannelDetails }: { 
  selectedChannel: string; 
  onShowChannelDetails: () => void; 
}) => {
  const getChannelInfo = (channelId: string) => {
    const channelMap: Record<string, { name: string; description: string; members: number }> = {
      'general': { name: 'general', description: 'General team discussion', members: 24 },
      'random': { name: 'random', description: 'Random conversations', members: 18 },
      'development': { name: 'development', description: 'Development team updates', members: 12 },
      'design': { name: 'design', description: 'Design team collaboration', members: 8 },
    };
    return channelMap[channelId] || channelMap['general'];
  };

  const channelInfo = getChannelInfo(selectedChannel);

  return (
    <div className="fixed top-8px  right-2 bg-background border-border rounded-lg p-1 shadow-lg flex items-center space-x-3 z-50">
      <div>
      </div>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-6"
            onClick={onShowChannelDetails}
          >
            <Info className="h-6 w-3" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" align="center" sideOffset={20}>
          <p>Channel Details</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
