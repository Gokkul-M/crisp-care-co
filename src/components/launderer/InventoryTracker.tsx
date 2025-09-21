
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { useState } from "react";
  
const initialInventory = [
    {
        id: 1,
        item: "Detergent",
        lastUpdated: "2024-07-20",
        stock: 50, // in liters
    },
    {
        id: 2,
        item: "Fabric Softener",
        lastUpdated: "2024-07-19",
        stock: 30, // in liters
    },
    {
        id: 3,
        item: "Stain Remover",
        lastUpdated: "2024-07-21",
        stock: 15, // in bottles
    },
];

const InventoryTracker = () => {
  const [inventory, setInventory] = useState(initialInventory);
  const [newItem, setNewItem] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleAddUsage = () => {
    // In a real app, you would have a more robust way to update the inventory
    console.log(`Used ${quantity} of ${newItem}`);
    // For now, this is a mock-up
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Inventory Usage</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                    <Label htmlFor="item">Item</Label>
                    <Input id="item" placeholder="e.g., Detergent" onChange={(e) => setNewItem(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity Used</Label>
                    <Input id="quantity" type="number" placeholder="e.g., 5" onChange={(e) => setQuantity(Number(e.target.value))} />
                </div>
                <Button onClick={handleAddUsage} className="self-end">Add Usage</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Last Updated</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {inventory.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.item}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>{item.lastUpdated}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
};

export default InventoryTracker;
