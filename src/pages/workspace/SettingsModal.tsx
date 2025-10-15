import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X, Palette, Monitor, Sun, Moon, Bell, Shield, Eye } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [activeTab, setActiveTab] = useState('appearance');
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('purple');
  const [fontSize, setFontSize] = useState([14]);
  const [messageGrouping, setMessageGrouping] = useState('enabled');

  const accentColors = [
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { name: 'Green', value: 'green', class: 'bg-green-500' },
    { name: 'Red', value: 'red', class: 'bg-red-500' },
    { name: 'Orange', value: 'orange', class: 'bg-orange-500' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-500' },
  ];

  const handleSaveSettings = () => {
    console.log('Saving settings:', { theme, accentColor, fontSize, messageGrouping });
    // TODO: Implement settings save logic
    onClose();
  };

  const handleApplyTheme = () => {
    console.log('Applying theme:', theme);
    // TODO: Implement theme application logic
  };

  const handleApplyAccentColor = () => {
    console.log('Applying accent color:', accentColor);
    // TODO: Implement accent color application logic
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 bg-card border-border overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-secondary/50 border-r border-border p-4">
            <DialogHeader className="mb-6">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-lg font-bold text-foreground">Settings</DialogTitle>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </DialogHeader>
            
            <div className="space-y-2">
              <Button 
                variant={activeTab === 'appearance' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('appearance')}
              >
                <Palette className="h-4 w-4 mr-3" />
                Appearance
              </Button>
              <Button 
                variant={activeTab === 'accessibility' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('accessibility')}
              >
                <Eye className="h-4 w-4 mr-3" />
                Accessibility
              </Button>
              <Button 
                variant={activeTab === 'notifications' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="h-4 w-4 mr-3" />
                Notifications
              </Button>
              <Button 
                variant={activeTab === 'privacy' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setActiveTab('privacy')}
              >
                <Shield className="h-4 w-4 mr-3" />
                Privacy & Safety
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'appearance' && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-foreground">Appearance</h2>

                {/* Theme Selection */}
                <div>
                  <Label className="text-base font-semibold text-foreground mb-4 block">Theme</Label>
                  <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <RadioGroupItem value="light" id="light" className="sr-only" />
                      <Label 
                        htmlFor="light" 
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          theme === 'light' ? 'border-primary' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Sun className="h-5 w-5" />
                          <span className="font-medium">Light</span>
                        </div>
                        <div className="h-16 bg-white rounded border"></div>
                      </Label>
                    </div>
                    
                    <div className="space-y-2">
                      <RadioGroupItem value="dark" id="dark" className="sr-only" />
                      <Label 
                        htmlFor="dark" 
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          theme === 'dark' ? 'border-primary' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Moon className="h-5 w-5" />
                          <span className="font-medium">Dark</span>
                        </div>
                        <div className="h-16 bg-gray-900 rounded border"></div>
                      </Label>
                    </div>
                    
                    <div className="space-y-2">
                      <RadioGroupItem value="system" id="system" className="sr-only" />
                      <Label 
                        htmlFor="system" 
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          theme === 'system' ? 'border-primary' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <Monitor className="h-5 w-5" />
                          <span className="font-medium">System</span>
                        </div>
                        <div className="h-16 bg-gradient-to-r from-white to-gray-900 rounded border"></div>
                      </Label>
                    </div>
                  </RadioGroup>
                  <Button onClick={handleApplyTheme} className="mt-4" variant="outline">
                    Apply Theme
                  </Button>
                </div>

                {/* Accent Color */}
                <div>
                  <Label className="text-base font-semibold text-foreground mb-4 block">Accent Color</Label>
                  <div className="grid grid-cols-6 gap-3 mb-4">
                    {accentColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setAccentColor(color.value)}
                        className={`h-12 w-12 rounded-full ${color.class} ${
                          accentColor === color.value ? 'ring-2 ring-offset-2 ring-offset-background ring-foreground' : ''
                        } hover:scale-110 transition-transform`}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <Button onClick={handleApplyAccentColor} variant="outline">
                    Apply Color
                  </Button>
                </div>

                {/* Font Size */}
                <div>
                  <Label className="text-base font-semibold text-foreground mb-4 block">
                    Font Size: {fontSize[0]}px
                  </Label>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    max={20}
                    min={12}
                    step={1}
                    className="w-full max-w-sm"
                  />
                  <div className="mt-4 p-4 bg-background rounded-lg border border-border">
                    <p style={{ fontSize: `${fontSize[0]}px` }} className="text-foreground">
                      Preview text with the selected font size
                    </p>
                  </div>
                </div>

                {/* Message Display */}
                <div>
                  <Label className="text-base font-semibold text-foreground mb-4 block">Message Display</Label>
                  <Select value={messageGrouping} onValueChange={setMessageGrouping}>
                    <SelectTrigger className="w-full max-w-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Compact</SelectItem>
                      <SelectItem value="disabled">Comfortable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {activeTab === 'accessibility' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground">Accessibility</h2>
                <p className="text-muted-foreground">Accessibility settings will be implemented here.</p>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground">Notifications</h2>
                <p className="text-muted-foreground">Notification settings will be implemented here.</p>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground">Privacy & Safety</h2>
                <p className="text-muted-foreground">Privacy and safety settings will be implemented here.</p>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end mt-8 pt-6 border-t border-border">
              <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
