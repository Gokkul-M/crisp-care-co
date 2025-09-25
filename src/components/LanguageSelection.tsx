import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LanguageSelection = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Language</h3>
      <Select defaultValue="en">
        <SelectTrigger>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="es">Spanish</SelectItem>
          <SelectItem value="fr">French</SelectItem>
        </SelectContent>
      </Select>
    </Card>
  );
};

export default LanguageSelection;
