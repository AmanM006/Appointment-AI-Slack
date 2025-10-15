import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface AddDMModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDM: (userName: string) => void;
}

// Mock users for demonstration
const availableUsers = [
  'Alice Johnson',
  'Bob Smith',
  'Carol Davis',
  'David Wilson',
  'Emma Brown',
  'Frank Miller',
];

export const AddDMModal = ({ isOpen, onClose, onCreateDM }: AddDMModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const filteredUsers = availableUsers.filter(user =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      onCreateDM(selectedUser);
      setSearchTerm('');
      setSelectedUser('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start a direct message</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="user-search">Find or start a conversation</Label>
            <Input
              id="user-search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a person..."
              className="mt-1"
            />
          </div>
          
          {searchTerm && (
            <div className="max-h-48 overflow-y-auto border rounded-md">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <button
                    key={user}
                    type="button"
                    className={`w-full flex items-center space-x-2 p-2 text-left hover:bg-accent ${
                      selectedUser === user ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <User className="h-4 w-4" />
                    <span>{user}</span>
                  </button>
                ))
              ) : (
                <div className="p-2 text-muted-foreground text-sm">
                  No users found
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedUser}>
              Start Conversation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
