import { Autocomplete, TextField } from "@mui/material";


export interface DropdownOption {
  value: string;
  label: string;
}

export interface FilterDropdownProps {
  label: string;
  options: DropdownOption[];
  value: DropdownOption[];
  onChange: (event: any, newValue: DropdownOption[]) => void;
}

export default function FilterDropdown(props: FilterDropdownProps) {

  return (
    <Autocomplete
      id="tags-outlined"
      multiple
      filterSelectedOptions
      limitTags={2}
      options={props.options}
      value={props.value}
      onChange={props.onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
        />
      )}
    />
  );
}