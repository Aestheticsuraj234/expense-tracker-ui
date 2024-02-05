// CheckboxList.tsx
"use client";
// CheckboxList.tsx
import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

interface CheckboxListProps {
  onSubmit: (selectedIds: number[]) => void;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ onSubmit }) => {
  const { register, handleSubmit, watch } = useForm<FieldValues>();
  const categoryData = [
    {
      id: 1,
      name: "Healthcare",
      description: "Medical expenses, insurance premiums, etc.",
    },
    {
      id: 2,
      name: "Education",
      description: "Tuition, books, supplies, etc.",
    },
    {
      id: 3,
      name: "Debt Payments",
      description: "Credit cards, loans, etc.",
    },
    {
      id: 4,
      name: "Savings",
      description: "Emergency fund, retirement savings, etc.",
    },
    {
      id: 5,
      name: "Clothing and Personal Items",
      description: "Apparel, toiletries, etc.",
    },
    {
      id: 6,
      name: "Home Maintenance",
      description: "Repairs, cleaning supplies, etc.",
    },
    {
      id: 7,
      name: "Communication",
      description: "Phone bills, internet, etc.",
    },
    {
      id: 8,
      name: "Transportation",
      description: "Fuel, maintenance, public transit, etc.",
    },
    {
      id: 9,
      name: "Recreation",
      description: "Hobbies, subscription, etc.",
    },
    {
      id: 10,
      name: "Gifts/Donations",
      description: "Presents, charitable contributions, etc.",
    },
    {
      id: 11,
      name: "Other",
      description: "",
    },
  ];
  const handleCheckboxListSubmit: SubmitHandler<FieldValues> = (data) => {
    const selectedCategories = Object.keys(data).filter((key) => data[key]);
    const selectedIds = selectedCategories.map(Number);
    onSubmit(selectedIds);
  };

  return (
    <div> {/* Replace <form> with <div> or another container */}
    {categoryData.map((category) => (
      <div key={category.id} className="mb-2">
        <label className="flex items-center text-muted-foreground text-base">
          <input
            type="checkbox"
            className="mr-2 text-black"
            {...register(`${category.id}`)}
          />
          {category.name}
        </label>
      </div>
    ))}
    <button type="submit" style={{ display: 'none' }} />
  </div>
  );
};

export default CheckboxList;
