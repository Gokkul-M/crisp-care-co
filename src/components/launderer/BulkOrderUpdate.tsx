import React from 'react';
import { Button } from '@/components/ui/button';

interface BulkOrderUpdateProps {
  orders: any[]; // Replace with a more specific type
  onUpdateOrders: (orderIds: string[], newStatus: string) => void;
}

const BulkOrderUpdate: React.FC<BulkOrderUpdateProps> = ({ orders, onUpdateOrders }) => {
  const handleUpdate = () => {
    const orderIds = orders.map(o => o.id);
    onUpdateOrders(orderIds, 'in-process');
  };

  return (
    <Button onClick={handleUpdate}>Bulk Update</Button>
  );
};

export default BulkOrderUpdate;