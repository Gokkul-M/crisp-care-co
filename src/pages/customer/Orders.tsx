import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Search, Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import RateOrderDialog from '@/components/dialogs/RateOrderDialog';
import SupportDialog from '@/components/dialogs/SupportDialog';

// Mock data - in a real app, this would come from an API
const mockOrders = {
  active: [
    {
      id: 'ORD-001',
      status: 'In Progress',
      launderer: 'Speedy Wash',
      laundererImg: '/placeholder.svg',
      service: 'Wash & Fold',
      items: 24,
      amount: '₹450.00',
    },
    {
      id: 'ORD-002',
      status: 'Out for Delivery',
      launderer: 'Fresh Fabrics',
      laundererImg: '/placeholder.svg',
      service: 'Dry Cleaning',
      items: 8,
      amount: '₹1200.00',
    },
  ],
  completed: [
    {
      id: 'ORD-003',
      status: 'Completed',
      launderer: 'Glow & Gleam',
      laundererImg: '/placeholder.svg',
      service: 'Ironing',
      completedDate: '2 days ago',
      amount: '₹250.00',
      rating: 4.5,
    },
    {
      id: 'ORD-004',
      status: 'Completed',
      launderer: 'Speedy Wash',
      laundererImg: '/placeholder.svg',
      service: 'Wash & Fold',
      completedDate: '1 week ago',
      amount: '₹550.00',
      rating: null,
    },
  ],
};

enum OrderStatus {
  'Order Placed' = 0,
  'Picked Up' = 25,
  'In Progress' = 50,
  'Out for Delivery' = 75,
  'Completed' = 100,
}

const getOrderStatusValue = (status: keyof typeof OrderStatus) => OrderStatus[status];

const CustomerOrders = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [isRateDialogOpen, setRateDialogOpen] = useState(false);
  const [isSupportDialogOpen, setSupportDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');

  const openDialog = (dialogSetter: (isOpen: boolean) => void, orderId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedOrderId(orderId);
    dialogSetter(true);
  };

  const renderStatusTracker = (status: keyof typeof OrderStatus) => {
    const statusValue = getOrderStatusValue(status);
    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-primary">{status}</span>
          <span className="text-xs text-muted-foreground">{statusValue}%</span>
        </div>
        <Progress value={statusValue} className="h-2" />
      </div>
    );
  };

  const renderActiveOrders = () => (
    <div className="space-y-6">
      {mockOrders.active.map((order) => (
        <Link to={`/customer/order/${order.id}`} key={order.id} className="block">
          <div className="bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden border border-border/30 p-4 transition-transform transform-gpu hover:shadow-lg">
            <div className="flex items-center mb-4">
              <img src={order.laundererImg} alt={order.launderer} className="w-12 h-12 rounded-full mr-4 border-2 border-primary/50" />
              <div className="flex-grow">
                <p className="font-bold text-foreground text-lg">{order.launderer}</p>
                <Badge variant="secondary" className="mt-1">{order.status}</Badge>
              </div>
            </div>
            <div className="space-y-4 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium text-foreground">{order.service}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Items</span>
                <span className="font-medium text-foreground">{order.items} pieces</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-primary text-base">{order.amount}</span>
              </div>
            </div>
            {renderStatusTracker(order.status as keyof typeof OrderStatus)}
          </div>
        </Link>
      ))}
    </div>
  );

  const renderCompletedOrders = () => (
    <div className="space-y-6">
      {mockOrders.completed.map((order) => (
         <div key={order.id} className="bg-card/80 backdrop-blur-md rounded-2xl overflow-hidden border border-border/30 p-4 transition-transform transform-gpu hover:shadow-lg">
            <Link to={`/customer/order/${order.id}`} className="block">
              <div className="flex items-center mb-4">
                <img src={order.laundererImg} alt={order.launderer} className="w-12 h-12 rounded-full mr-4 border-2 border-primary/50"/>
                <div className="flex-grow">
                  <p className="font-bold text-foreground text-lg">{order.launderer}</p>
                  <Badge variant="outline">{order.status}</Badge>
                </div>
              </div>
              <div className="space-y-4 mb-5">
                 <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium text-foreground">{order.service}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium text-foreground">{order.completedDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-primary text-base">{order.amount}</span>
                </div>
              </div>
            </Link>
            <div className="flex gap-2">
              <Button variant="outline" className="w-full" onClick={openDialog(setRateDialogOpen, order.id)}>
                <Star className="h-4 w-4 mr-2 text-yellow-400" />
                {order.rating ? `Rated ${order.rating}` : 'Rate Order'}
              </Button>
              <Button variant="secondary" className="w-full" onClick={openDialog(setSupportDialogOpen, order.id)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Support
              </Button>
            </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className="container mx-auto px-4 py-6 pb-28">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
            <p className="text-sm text-muted-foreground mt-1">Track your laundry from pickup to delivery</p>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by order ID or launderer"
            className="w-full pl-12 pr-4 py-3 bg-card/50 border border-border/30 rounded-full focus:ring-2 focus:ring-primary/50 focus:outline-none transition-shadow"
          />
        </div>

        <div className="flex justify-center bg-card/60 border border-border/30 p-1.5 rounded-full mb-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors w-1/2 ${
              activeTab === 'active' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors w-1/2 ${
              activeTab === 'completed' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            Completed
          </button>
        </div>

        {activeTab === 'active' ? renderActiveOrders() : renderCompletedOrders()}
      </div>

      {selectedOrderId && (
        <>
          <RateOrderDialog
            open={isRateDialogOpen}
            onOpenChange={setRateDialogOpen}
            orderId={selectedOrderId}
          />
          <SupportDialog
            open={isSupportDialogOpen}
            onOpenChange={setSupportDialogOpen}
            orderId={selectedOrderId}
          />
        </>
      )}
    </>
  );
};

export default CustomerOrders;
