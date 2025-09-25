import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const NotificationSettings = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications">Push Notifications</Label>
          <Switch id="push-notifications" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch id="email-notifications" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="sms-notifications">SMS Notifications</Label>
          <Switch id="sms-notifications" defaultChecked />
        </div>
      </div>
    </Card>
  );
};

export default NotificationSettings;
