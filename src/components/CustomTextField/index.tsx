import { TextField } from "@mui/material";
import React from "react"
import { CustomTextFieldProps } from "../../@types/components/customTextFieldProps";

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  value,
  onChange,
  label,
  extraSX,
}) => {
  return (
    <TextField 
      sx={{
        marginTop: 3,
        '& .MuiOutlinedInput-notchedOutline': value != "" ? { borderWidth: 2, borderColor: "#89db2e"} : { borderWidth: 2, borderColor: "#52525b"},
        '& .MuiFormLabel-root': value != "" ? {color: "#89db2e"} : {color: "#52525b"},
        '& .MuiInputBase-root': {color: "#FFFFFF"},

        '&:hover .MuiFormLabel-root': {color: "#89db2e"},
        '.MuiFormLabel-root.Mui-focused': {color: "#89db2e"},
        '&:hover .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {borderColor: "#89db2e"},
        ...extraSX
      }}
      fullWidth
      label={label} 
      variant="outlined"
      value={value}
      onChange={onChange}
    />
  );
}

export default CustomTextField;