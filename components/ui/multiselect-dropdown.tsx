import * as React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";



type CategoryProps = {
    id: number;
    name: string;
    description: string;
}[];

interface MultiselectDropdownProps {
  options: CategoryProps;
  selectedValues: string[];
  onSelect: (selectedList: string[]) => void;
  onRemove: (selectedList: string[]) => void;
  placeholder?: string;
}

const MultiselectDropdown: React.FC<MultiselectDropdownProps> = ({
  options,
  selectedValues,
  onSelect,
  onRemove,
  placeholder,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleCheckboxChange = (value:any) => {
    const updatedValues = Array.isArray(value)
      ? value
      : [value]; // Ensure value is an array
  
    if (selectedValues.includes(updatedValues[0])) {
      onRemove(updatedValues);
    } else {
      onSelect([...selectedValues, ...updatedValues]);
    }
  };
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button onClick={() => setOpen(!open)}>{placeholder || "Select"}</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={4}>
        {options.map((option) => (
          <DropdownMenuCheckboxItem key={option.id}>
            <Checkbox
              checked={selectedValues.includes(option.id)}
              onChange={() => handleCheckboxChange(option.id)}
            />
            {option.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiselectDropdown;
