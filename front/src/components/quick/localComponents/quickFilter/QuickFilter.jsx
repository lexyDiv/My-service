import React from "react";
import "./QuickFilter.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const QuickFilter = function ({ filterOptions, filterPunkt, setFilterPunkt, label }) {


    const handleChange = (event) => {
        //setAge(event.target.value);
        setFilterPunkt(event.target.value);
      };

  return (
    <div id="quick-filter">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{label}</InputLabel>
      <Select
        sx={{
            color: 'white'
        }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={filterPunkt}
        label={label}
        onChange={handleChange}
      >
        {filterOptions.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>)}
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
    </FormControl>
    </div>
  );
};

export default QuickFilter;
