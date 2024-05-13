import { Autocomplete, TextField } from "@mui/material";


export interface DropdownOption {
  value: string;
  label: string;
}

export interface FilterDropdownProps {
  label: string;
  value: DropdownOption[];
  handleChange: (event: any, newValue: DropdownOption[]) => void;
  options: DropdownOption[];
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
      onChange={props.handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
        />
      )}
    />
  );
}