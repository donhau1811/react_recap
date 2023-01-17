import { useFormContext, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

export default function FDatePicker({ name, label }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label={label}
            control={control}
            inputFormat="DD-MM-YYYY"
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!error}
                helperText={error?.message}
                size="small"
              />
            )}
            {...field}
          />
        </LocalizationProvider>
      )}
    />
  );
}
