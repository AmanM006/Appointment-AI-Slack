import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { SidebarProvider } from '@/components/ui/sidebar';
import { WorkspaceSidebar } from './workspace/WorkspaceSidebar';
import { TopNavigation } from './workspace/TopNavigation';
import { MainContent } from './workspace/MainContent';
import { RightSidebar, FloatingChannelDetails } from './workspace/RightSidebar';
import { SearchOverlay } from './workspace/SearchOverlay';

const Workspace = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [showAIChat, setShowAIChat] = useState(false);
  const [rightSidebarContent, setRightSidebarContent] = useState<'ai' | 'details' | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  // Add auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        navigate('/');
      } else {
        setUser(firebaseUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
    // Don't automatically open details when selecting a channel
  };

  const handleAIChatToggle = () => {
    setShowAIChat(!showAIChat);
    setRightSidebarContent(showAIChat ? null : 'ai');
  };

  const handleShowChannelDetails = () => {
    setRightSidebarContent('details');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        setShowSearch((prev) => !prev);
      }

      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Don't render until we have a user
  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="h-screen flex flex-col bg-[#121212]">
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <div className="flex flex-1 overflow-hidden">
              <WorkspaceSidebar
                selectedChannel={selectedChannel}
                onChannelSelect={handleChannelSelect}
                onAIChatToggle={handleAIChatToggle}
                onShowChannelDetails={handleShowChannelDetails}
                rightSidebarContent={rightSidebarContent}
                userEmail={user.email ?? ''} // Add null check
              />
              
              <div className="flex-1 flex flex-col">
                <TopNavigation 
                  user={user} 
                  onSignOut={handleSignOut} 
                />
                
                <div className="flex-1 flex overflow-hidden relative">
                  <MainContent selectedChannel={selectedChannel} />
                  
                  {rightSidebarContent && (
                    <RightSidebar 
                      content={rightSidebarContent}
                      onClose={() => setRightSidebarContent(null)}
                      selectedChannel={selectedChannel}
                      onShowChannelDetails={handleShowChannelDetails}
                    />
                  )}
                  
                  {!rightSidebarContent && (
                    <FloatingChannelDetails 
                      selectedChannel={selectedChannel}
                      onShowChannelDetails={handleShowChannelDetails}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </SidebarProvider>
        
        <SearchOverlay 
          isOpen={showSearch} 
          onClose={() => setShowSearch(false)} 
        />
      </div>
    </div>
  );
};

export default Workspace;
