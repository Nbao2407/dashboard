import { useState } from "react";
import { Search, Filter, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  type: "select" | "date" | "dateRange" | "search";
  options?: FilterOption[];
  placeholder?: string;
}

export interface FilterValues {
  [key: string]: string | Date | { from?: Date; to?: Date } | undefined;
}

interface AdvancedFiltersProps {
  config: FilterConfig[];
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onReset: () => void;
}

export function AdvancedFilters({ config, values, onChange, onReset }: AdvancedFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const activeFiltersCount = Object.values(values).filter(v => {
    if (v === undefined || v === "" || v === "all") return false;
    if (typeof v === "object" && "from" in v && !v.from && !v.to) return false;
    return true;
  }).length;

  const handleChange = (key: string, value: string | Date | { from?: Date; to?: Date } | undefined) => {
    onChange({ ...values, [key]: value });
  };

  const renderFilter = (filter: FilterConfig) => {
    switch (filter.type) {
      case "select":
        return (
          <Select
            value={(values[filter.id] as string) || "all"}
            onValueChange={(value) => handleChange(filter.id, value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={filter.placeholder || filter.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "date":
        const dateValue = values[filter.id] as Date | undefined;
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-[180px] justify-start text-left font-normal",
                  !dateValue && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {dateValue ? format(dateValue, "dd/MM/yyyy", { locale: vi }) : filter.placeholder || "Chọn ngày"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={dateValue}
                onSelect={(date) => handleChange(filter.id, date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      case "dateRange":
        const rangeValue = (values[filter.id] as { from?: Date; to?: Date }) || {};
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full sm:w-[280px] justify-start text-left font-normal",
                  !rangeValue.from && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {rangeValue.from ? (
                  rangeValue.to ? (
                    <>
                      {format(rangeValue.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                      {format(rangeValue.to, "dd/MM/yyyy", { locale: vi })}
                    </>
                  ) : (
                    format(rangeValue.from, "dd/MM/yyyy", { locale: vi })
                  )
                ) : (
                  filter.placeholder || "Chọn khoảng thời gian"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="range"
                selected={{ from: rangeValue.from, to: rangeValue.to }}
                onSelect={(range) => handleChange(filter.id, range || {})}
                numberOfMonths={2}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      case "search":
        return (
          <div className="relative w-full sm:w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={filter.placeholder || "Tìm kiếm..."}
              className="pl-9"
              value={(values[filter.id] as string) || ""}
              onChange={(e) => handleChange(filter.id, e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Mobile filter toggle */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            className="gap-2 sm:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Bộ lọc
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Desktop filters - always visible */}
        <div className="hidden sm:flex flex-wrap gap-3 items-center">
          {config.map((filter) => (
            <div key={filter.id} className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                {filter.label}
              </label>
              {renderFilter(filter)}
            </div>
          ))}
          
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-muted-foreground hover:text-foreground self-end"
            >
              <X className="h-4 w-4 mr-1" />
              Xóa lọc
            </Button>
          )}
        </div>
      </div>

      {/* Mobile filters panel */}
      {showFilters && (
        <div className="sm:hidden p-4 border rounded-lg bg-card space-y-4">
          {config.map((filter) => (
            <div key={filter.id} className="space-y-2">
              <label className="text-sm font-medium">{filter.label}</label>
              {renderFilter(filter)}
            </div>
          ))}
          
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="flex-1"
            >
              Xóa lọc
            </Button>
            <Button
              size="sm"
              onClick={() => setShowFilters(false)}
              className="flex-1"
            >
              Áp dụng
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
