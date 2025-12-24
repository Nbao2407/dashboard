import { useState } from "react";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export interface ExportColumn {
  key: string;
  label: string;
  format?: (value: unknown) => string;
}

interface DataExportProps<T> {
  data: T[];
  columns: ExportColumn[];
  filename: string;
}

export function DataExport<T extends Record<string, unknown>>({
  data,
  columns,
  filename,
}: DataExportProps<T>) {
  const [isExporting, setIsExporting] = useState(false);

  const formatValue = (value: unknown, column: ExportColumn): string => {
    if (value === null || value === undefined) return "";
    if (column.format) return column.format(value);
    if (value instanceof Date) return value.toLocaleDateString("vi-VN");
    return String(value);
  };

  const exportToCSV = () => {
    setIsExporting(true);
    try {
      // BOM for UTF-8
      const BOM = "\uFEFF";
      
      // Header row
      const headers = columns.map(col => `"${col.label}"`).join(",");
      
      // Data rows
      const rows = data.map(item =>
        columns.map(col => {
          const value = formatValue(item[col.key], col);
          // Escape double quotes and wrap in quotes
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(",")
      );
      
      const csv = BOM + [headers, ...rows].join("\n");
      
      // Download
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
      
      toast.success("Xuất file CSV thành công!");
    } catch (error) {
      toast.error("Lỗi khi xuất file CSV");
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToExcel = () => {
    setIsExporting(true);
    try {
      // Create HTML table for Excel
      let html = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
          <meta charset="UTF-8">
          <!--[if gte mso 9]>
          <xml>
            <x:ExcelWorkbook>
              <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                  <x:Name>Sheet1</x:Name>
                  <x:WorksheetOptions>
                    <x:DisplayGridlines/>
                  </x:WorksheetOptions>
                </x:ExcelWorksheet>
              </x:ExcelWorksheets>
            </x:ExcelWorkbook>
          </xml>
          <![endif]-->
          <style>
            table { border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                ${columns.map(col => `<th>${col.label}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${data.map(item => `
                <tr>
                  ${columns.map(col => `<td>${formatValue(item[col.key], col)}</td>`).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </body>
        </html>
      `;

      const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}_${new Date().toISOString().split("T")[0]}.xls`;
      link.click();
      URL.revokeObjectURL(link.href);

      toast.success("Xuất file Excel thành công!");
    } catch (error) {
      toast.error("Lỗi khi xuất file Excel");
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2" disabled={isExporting || data.length === 0}>
          <Download className="h-4 w-4" />
          Xuất dữ liệu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToCSV} className="gap-2 cursor-pointer">
          <FileText className="h-4 w-4" />
          Xuất CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToExcel} className="gap-2 cursor-pointer">
          <FileSpreadsheet className="h-4 w-4" />
          Xuất Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
