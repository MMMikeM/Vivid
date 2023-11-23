import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../../@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../@/components/ui/popover";

const teamOptions = [
  { value: "engineering", label: "Engineering" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "support", label: "Support" },
];

export function AutoComplete() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="p-1 justify-between flex flex-row align-center w-full"
        >
          {value
            ? teamOptions.find((team) => team.value === value)?.label
            : "Select Team..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 z-">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty></CommandEmpty>
          <CommandGroup>
            {teamOptions.map((team) => (
              <CommandItem
                key={team.value}
                value={team.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === team.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {team.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
