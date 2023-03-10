import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FTextField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          // onChange={(e) => {
          //   field.onChange(e);
          // }}
          fullWidth
          error={!!error}
          // isDirty={!!isDirty}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}

export default FTextField;
