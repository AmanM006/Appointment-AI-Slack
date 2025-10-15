import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, X, Eye, EyeOff } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const [name, setName] = useState('John Doe');
  const [bio, setBio] = useState('Product Designer at Acme Corporation');
  const [location, setLocation] = useState('San Francisco, CA');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveProfile = () => {
    console.log('Saving profile:', { name, bio, location });
    // TODO: Implement profile save logic
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    console.log('Changing password...');
    // TODO: Implement password change logic
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleUploadPhoto = () => {
    console.log('Uploading profile photo...');
    // TODO: Implement photo upload logic
  };

  const handleUploadCover = () => {
    console.log('Uploading cover photo...');
    // TODO: Implement cover upload logic
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-card border-border overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-foreground">Edit Profile</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="opacity-70 hover:opacity-100">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex h-[calc(90vh-100px)]">
          <Tabs defaultValue="pic" className="w-full flex">
            <TabsList className="flex flex-col h-full w-48 bg-secondary/50 rounded-none border-r border-border p-2">
              <div className="w-full justify-start"><div className="flex items-center  space-x-4 mmb-40">
                      <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-card">
                          <AvatarImage src="/placeholder.svg" alt="Profile" />
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                            JD
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
              </div>
              <TabsTrigger value="profile" className="w-full justify-start">
                Profile Info
              </TabsTrigger>
              <TabsTrigger value="photo" className="w-full justify-start">
                Photos
              </TabsTrigger>
              <TabsTrigger value="password" className="w-full justify-start">
                Password
              </TabsTrigger>
            </TabsList>

            <div className="flex-1">
              <TabsContent value="profile" className="p-6 m-0">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
                  
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-foreground">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 bg-background border-input"
                      maxLength={50}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{name.length}/50</p>
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-sm font-medium text-foreground">Bio</Label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="mt-1 w-full min-h-[80px] px-3 py-2 bg-background border border-input rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      maxLength={160}
                      placeholder="Tell people a little about yourself"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{bio.length}/160</p>
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-sm font-medium text-foreground">Location</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-1 bg-background border-input"
                      maxLength={30}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{location.length}/30</p>
                  </div>

                  <div className="flex justify-end p-3 border-t border-border">
                    <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="photo" className="p-6 m-0">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Profile Photos</h3>
                  
                  {/* Cover Photo Section */}
                  <div>
                    <Label className="text-sm font-medium text-foreground">Cover Photo</Label>
                    <div className="relative mt-2">
                      <div className="h-32 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg"></div>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white border-none"
                        onClick={handleUploadCover}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Change Cover
                      </Button>
                    </div>
                  </div>
                  
                  {/* Profile Picture Section */}
                  <div>
                    <Label className="text-sm font-medium text-foreground">Profile Picture</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-card">
                          <AvatarImage src="/placeholder.svg" alt="Profile" />
                          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-background border-2 border-card"
                          onClick={handleUploadPhoto}
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <Button onClick={handleUploadPhoto} variant="outline">
                          Upload New Photo
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">
                          Recommended: Square image, at least 200x200px
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="password" className="p-6 m-0">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
                  
                  <div>
                    <Label htmlFor="currentPassword" className="text-sm font-medium text-foreground">
                      Current Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-background border-input pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword" className="text-sm font-medium text-foreground">
                      New Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-background border-input pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                      Confirm New Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-background border-input pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-border">
                    <Button 
                      onClick={handleChangePassword} 
                      className="bg-primary hover:bg-primary/90"
                      disabled={!currentPassword || !newPassword || !confirmPassword}
                    >
                      Change Password
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};