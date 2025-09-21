import { createContext, useContext, useState, ReactNode } from 'react';

export interface Order {
  id: string;
  customer: string;
  service: string;
  items: number;
  amount: string;
  pickup: string;
  time: string;
  status: 'pending' | 'in-process' | 'ready' | 'completed';
  eta?: string;
  statusColor?: string;
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

const initialOrders: Order[] = [
  {
    id: "CC001",
    customer: "Sarah Johnson",
    service: "Wash & Iron",
    items: 5,
    amount: "$30",
    pickup: "123 Main St",
    time: "10 min ago",
    status: "in-process",
    eta: "45 min",
    statusColor: "bg-blue-500",
  },
  {
    id: "CC002",
    customer: "Mike Brown",
    service: "Dry Cleaning",
    items: 3,
    amount: "$45",
    pickup: "456 Oak Ave",
    time: "30 min ago",
    status: "completed",
    eta: "Now",
    statusColor: "bg-green-500",
  },
];

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const addOrder = (order: Order) => {
    setOrders(prevOrders => [order, ...prevOrders]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};