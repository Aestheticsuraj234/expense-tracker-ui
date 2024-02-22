import create from 'zustand';

interface SelectedValuesStore {
  selectedValues: number[];
  toggleValue: (value: number) => void;
}

export const useSelectedValuesStore = create<SelectedValuesStore>((set) => ({
  selectedValues: [],
  toggleValue: (value) => set((state) => {
    const { selectedValues } = state; // Destructure selectedValues from state
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((val) => val !== value)
      : [...selectedValues, value];
    return { selectedValues: updatedValues }; // Return the updated selectedValues
  }),
}));
