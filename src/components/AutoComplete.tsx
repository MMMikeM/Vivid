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
import { useState } from "react";
import { Team, teamOptions } from "../store/tree";

const teamOptionsList: { value: string; label: Team }[] = teamOptions.map(
  (team) => ({ value: team.toLowerCase(), label: team })
);
export function AutoComplete(props: {
  value: string;
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="p-1 justify-between flex flex-row align-center w-full"
        >
          {props.value
            ? teamOptionsList.find(
                (team) => team.value === props.value.toLowerCase()
              )?.label
            : "Select Team..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 z-">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty></CommandEmpty>
          <CommandGroup>
            {teamOptionsList.map(({ value, label }) => (
              <CommandItem
                key={value}
                value={value}
                onSelect={(currentValue) => {
                  props.onSelect(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    props.value === value ? "opacity-100" : "opacity-0"
                  )}
                />
                {label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
