export type FilterComboboxProps = {
  disabled?: boolean;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};
