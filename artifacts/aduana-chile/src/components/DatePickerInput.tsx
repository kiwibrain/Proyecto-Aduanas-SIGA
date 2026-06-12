import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

function parseDDMMYYYY(str: string): Date | undefined {
  if (!str || str.length !== 10) return undefined;
  const parts = str.split("/");
  if (parts.length !== 3) return undefined;
  const [dd, mm, yyyy] = parts;
  if (!dd || !mm || !yyyy || yyyy.length !== 4) return undefined;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  if (isNaN(d.getTime())) return undefined;
  if (d.getDate() !== Number(dd) || d.getMonth() !== Number(mm) - 1) return undefined;
  return d;
}

function toDDMMYYYY(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${date.getFullYear()}`;
}

function toISO(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${mm}-${dd}`;
}

export interface DatePickerInputProps {
  id?: string;
  value: string;
  onChange: (ddmmyyyy: string) => void;
  onChangeISO?: (iso: string) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  fromYear?: number;
  toYear?: number;
}

export function DatePickerInput({
  id,
  value,
  onChange,
  onChangeISO,
  required,
  placeholder = "DD/MM/AAAA",
  className,
  fromYear = 1900,
  toYear,
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);
  const selectedDate = parseDDMMYYYY(value);
  const maxYear = toYear ?? new Date().getFullYear() + 10;

  const handleDaySelect = (date: Date | undefined) => {
    if (!date) return;
    onChange(toDDMMYYYY(date));
    onChangeISO?.(toISO(date));
    setOpen(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    const prev = value;
    // Only allow digits and slashes
    v = v.replace(/[^\d/]/g, "");
    // Auto-insert slash after dd (position 2)
    if (
      v.length === 2 &&
      prev.length === 1 &&
      !v.includes("/")
    ) {
      v = v + "/";
    }
    // Auto-insert slash after mm (position 5)
    if (
      v.length === 5 &&
      prev.length === 4 &&
      v.indexOf("/", 3) === -1
    ) {
      v = v + "/";
    }
    if (v.length > 10) v = v.slice(0, 10);
    onChange(v);
    const parsed = parseDDMMYYYY(v);
    if (parsed) onChangeISO?.(toISO(parsed));
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleTextChange}
        placeholder={placeholder}
        maxLength={10}
        required={required}
        className="pr-10"
        autoComplete="off"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 h-full w-10 hover:bg-blue-50 text-gray-400 hover:text-[#0032A0] transition-colors"
            aria-label="Abrir calendario"
            title="Seleccionar fecha en calendario"
          >
            <CalendarDays className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 shadow-lg border-gray-200" align="end" sideOffset={6}>
          <div className="bg-[#0032A0] text-white text-xs font-semibold px-3 py-2 rounded-t-md flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5" />
            Seleccione una fecha
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDaySelect}
            captionLayout="dropdown"
            fromYear={fromYear}
            toYear={maxYear}
            defaultMonth={selectedDate ?? new Date()}
            classNames={{
              day: "group/day relative aspect-square h-full w-full select-none p-0 text-center",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
