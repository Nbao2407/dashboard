import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, SlidersHorizontal, Calendar, Edit, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const orderData = [
  { 
    id: "1", 
    image: "🎒", 
    name: "Backpack", 
    stock: "25 In Stock", 
    orderID: "#ORD100", 
    price: "$200", 
    status: "Completed" 
  },
  { 
    id: "2", 
    image: "👕", 
    name: "T-Shirt", 
    stock: "31 In Stock", 
    orderID: "#ORD200", 
    price: "$89", 
    status: "In Progress" 
  },
  { 
    id: "3", 
    image: "🕶️", 
    name: "Sunglass", 
    stock: "25 In Stock", 
    orderID: "#ORD100", 
    price: "$200", 
    status: "Canceled" 
  },
  { 
    id: "4", 
    image: "👜", 
    name: "Hand Bag", 
    stock: "18 In Stock", 
    orderID: "#ORD300", 
    price: "$300", 
    status: "Pending" 
  },
];

const statusStyles: Record<string, string> = {
  "Completed": "bg-success/10 text-success border-0",
  "In Progress": "bg-warning/10 text-warning border-0",
  "Canceled": "bg-destructive/10 text-destructive border-0",
  "Pending": "bg-info/10 text-info border-0",
};

export function InventoryTable() {
  return (
    <Card className="lg:col-span-2 rounded-2xl border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">Sales & Order</CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Calendar className="h-4 w-4" />
          </Button>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-28 h-8 text-xs rounded-lg bg-muted border-0">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-muted-foreground">Product's Details</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Order ID</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Price</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Delivery Status</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xl">
                      {item.image}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.stock}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{item.orderID}</TableCell>
                <TableCell className="font-semibold">{item.price}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusStyles[item.status]}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
