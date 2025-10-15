import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Clock, User, Hash } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults] = useState([
    {
      id: 1,
      type: 'message',
      content: 'Hey team, the new feature is ready for review',
      channel: '#development',
      user: 'Sarah Wilson',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'message',
      content: 'Can we schedule a meeting for tomorrow?',
      channel: '#general',
      user: 'Mike Johnson',
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      type: 'channel',
      content: '#design',
      members: 12,
      description: 'Design team discussions'
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex items-start justify-center pt-20">
        <div className="w-full max-w-2xl mx-4">
          {/* Search Input */}
          <div className="bg-card border border-border rounded-lg shadow-lg">
            <div className="flex items-center p-4 border-b border-border">
              <Search className="h-5 w-5 text-muted-foreground mr-3" />
              <Input
                placeholder="Search messages, files, or people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-none bg-transparent focus:ring-0 text-base"
                autoFocus
              />
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="max-h-96 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-3 py-2">
                    Recent searches
                  </div>
                  
                  {searchResults
                    .filter(result => 
                      result.content.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center p-3 hover:bg-accent rounded-md cursor-pointer"
                      >
                        {result.type === 'message' ? (
                          <>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{result.user}</span>
                                <Hash className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{result.channel}</span>
                              </div>
                              <p className="text-sm text-foreground">{result.content}</p>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {result.timestamp}
                            </div>
                          </>
                        ) : (
                          <>
                            <Hash className="h-5 w-5 text-muted-foreground mr-3" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{result.content}</p>
                              <p className="text-xs text-muted-foreground">{result.description}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{result.members} members</span>
                          </>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Search Tips */}
            {!searchQuery && (
              <div className="p-4 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <div>Press <kbd className="px-2 py-1 bg-secondary rounded text-xs">Ctrl+F</kbd> to search</div>
                  <div>Try searching for messages, files, or people</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};