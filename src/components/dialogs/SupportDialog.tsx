import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageSquare, Phone } from "lucide-react";

interface SupportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
}

const SupportDialog = ({ open, onOpenChange, orderId }: SupportDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get Help</DialogTitle>
          <DialogDescription>
            How can we help you with order {orderId}?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <Button variant="outline" className="w-full justify-start gap-4 p-6">
            <HelpCircle className="w-5 h-5" />
            <span>FAQs</span>
          </Button>
          <Button variant="outline" className="w-full justify-start gap-4 p-6">
            <MessageSquare className="w-5 h-5" />
            <span>Chat with Us</span>
          </Button>
          <Button variant="outline" className="w-full justify-start gap-4 p-6">
            <Phone className="w-5 h-5" />
            <span>Call Support</span>
          </Button>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SupportDialog;
