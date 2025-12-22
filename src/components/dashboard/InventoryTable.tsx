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

const inventoryData = [
  { id: "SKU-001", name: "Electronic Components A", category: "Electronics", quantity: 1250, status: "In Stock", location: "Zone A-1" },
  { id: "SKU-002", name: "Raw Material Steel", category: "Materials", quantity: 45, status: "Low Stock", location: "Zone B-3" },
  { id: "SKU-003", name: "Packaging Boxes Large", category: "Packaging", quantity: 3200, status: "In Stock", location: "Zone C-2" },
  { id: "SKU-004", name: "Chemical Compound X", category: "Chemicals", quantity: 0, status: "Out of Stock", location: "Zone D-1" },
  { id: "SKU-005", name: "Motor Assembly Unit", category: "Machinery", quantity: 89, status: "Low Stock", location: "Zone A-4" },
];

const statusStyles: Record<string, string> = {
  "In Stock": "bg-success/10 text-success border-success/20",
  "Low Stock": "bg-warning/10 text-warning border-warning/20",
  "Out of Stock": "bg-destructive/10 text-destructive border-destructive/20",
};

export function InventoryTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">SKU</TableHead>
              <TableHead className="font-semibold">Product Name</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold text-right">Quantity</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryData.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell className="font-mono text-sm">{item.id}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">{item.category}</TableCell>
                <TableCell className="text-right font-semibold">{item.quantity.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusStyles[item.status]}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
