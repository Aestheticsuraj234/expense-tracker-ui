import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./button";
import { ChevronsDown } from "lucide-react";
import { useSelectedValuesStore } from "@/hooks/use-multiSelect";

type CategoryProps = {
  id: number;
  name: string;
  description: string;
}[];

interface MultiselectDropdownProps {
  options: CategoryProps;
  name: string;
  placeholder?: string;
}

const MultiselectDropdown: React.FC<MultiselectDropdownProps> = ({
  options,
  name,
  placeholder,
}) => {
  const [open, setOpen] = React.useState(false);
  const selectedValuesStore = useSelectedValuesStore(); // Use the store hook
  // Destructure the selectedValues and toggleValue from the store
  const { selectedValues, toggleValue } = selectedValuesStore;
  console.log("Selected Values:", selectedValues); // Debugging

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-[200px] justify-between"
          >
            {placeholder || "Select a category"}
            <ChevronsDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={4}
          side="top"
          className="mb-2 mt-48 dark:bg-zinc-700 ml-10"
        >
          <ScrollArea className="h-72 w-69 rounded-md ">
            <Command>
              <CommandGroup>
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="flex justify-start items-center gap-x-4 px-2 py-2 text-muted-foreground"
                  >
                    <input
                      type="checkbox"
                      id={option.id.toString()}
                      checked={selectedValues.includes(option.id)}
                      onChange={() => {
                        toggleValue(option.id); // Use toggleValue directly
                      }}
                      className="mr-4"
                    />
                    <CommandItem>{option.name}</CommandItem>
                  </div>
                ))}
              </CommandGroup>
            </Command>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default MultiselectDropdown;
