import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SegmentedControlProps {
  tabs: {
    label: string;
    value: string;
  }[];
  onTabChange: (value: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
    onTabChange(value);
  };

  return (
    <div className="flex w-full p-1 bg-muted rounded-lg">
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          variant={activeTab === tab.value ? "default" : "ghost"}
          className="flex-1 text-sm"
          onClick={() => handleTabClick(tab.value)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default SegmentedControl;
