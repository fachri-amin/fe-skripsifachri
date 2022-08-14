import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SelectMotorcycle = ({ data, onSelect, defaultValue }) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
      defaultValue={defaultValue}
      renderInput={(params) => <TextField {...params} label=" " size="small" />}
      onChange={(e, value) => onSelect(value)}
    />
  );
};
export default SelectMotorcycle;
