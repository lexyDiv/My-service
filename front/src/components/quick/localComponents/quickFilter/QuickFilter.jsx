import React from "react";
import "./QuickFilter.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material";

const QuickFilter = function ({
  filterOptions,
  filterPunkt,
  setFilterPunkt,
  label,
  setHouses,
}) {
  const theme = createTheme({
    palette: {
      background: {
        paper: "#212121",
      },
      text: {
        primary: "rgb(255,255,255)",
        secondary: "rgb(255,255,255)",
      },
      action: {
        active: "#001E3C",
      },
    },
  });

  const handleChange = (event) => {
    //setAge(event.target.value);
    setFilterPunkt(event.target.value);
    setHouses([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <div id="quick-filter">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">{label}</InputLabel>
          <Select
            sx={{
              color: "white",
              "& fieldset.MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(255,255,255)",
              },
            }}
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filterPunkt}
            label={label}
            onChange={handleChange}
          >
            {filterOptions.map((el) => (
              <MenuItem key={el.name} value={el.id}>
                {el.name}
              </MenuItem>
            ))}
            {/* <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </div>
    </ThemeProvider>
  );
};

export default QuickFilter;
