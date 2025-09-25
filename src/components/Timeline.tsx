import { CheckCircle, Circle } from "lucide-react";

interface TimelineProps {
  history: {
    status: string;
    time: string;
  }[];
}

const Timeline: React.FC<TimelineProps> = ({ history }) => {
  return (
    <div>
      {history.map((entry, index) => (
        <div key={index} className="flex items-start mb-4">
          <div className="w-4 h-4 rounded-full bg-primary mt-1 flex items-center justify-center">
            {index === history.length - 1 ? (
              <Circle className="h-2 w-2 text-white" />
            ) : (
              <CheckCircle className="h-3 w-3 text-white" />
            )}
          </div>
          <div className="ml-4">
            <p className="font-medium text-sm">{entry.status}</p>
            <p className="text-xs text-muted-foreground">{entry.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
