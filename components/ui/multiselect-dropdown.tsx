import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "./button";
import { ChevronDownIcon } from "lucide-react";

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
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    categoryId: number
  ) => {
    e.stopPropagation();
    const existingIndex = fields.findIndex(
      // @ts-ignore
      (field) => field.value === categoryId
    );

    if (existingIndex !== -1) {
      remove(existingIndex);
    } else {
      append({ value: categoryId });
    }
  };

  return (
    <DropdownMenu>
     <DropdownMenuTrigger
  className="flex justify-between items-center gap-4 w-full"
  onClick={(e) => e.stopPropagation()}
>

        <Button
          variant="outline"
          className="w-[240px] pl-3 text-left font-normal flex justify-between items-center dark:bg-zinc-700"
        >
          {placeholder || "Select"}
          <ChevronDownIcon className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={4} side="right" className="mb-2 dark:bg-zinc-700">
        {options.map((option) => (
          <DropdownMenuCheckboxItem key={option.id} className="space-x-5">
            <input
              type="checkbox"
              id={option.id.toString()}
              // @ts-ignore
              checked={fields.some((field) => field.value === option.id)}
              onChange={(e) => handleCheckboxChange(e, option.id)}
              className="mr-4"
            />
            <p className="ml-4">{option.name}</p>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MultiselectDropdown;
