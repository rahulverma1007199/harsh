import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function RangeSlider({ id, label, name, handleChangeProp }) {
  const [value, setValue] = React.useState([20, 37]);
  const handleChange = (e, val) => {
    setValue(val);
  };
  return (
    <Box className="flex flex-col  " sx={{ width: 300 }}>
      <label htmlFor={id}>{label}</label>
      <Slider
        id={id}
        key={id}
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        name={name}
      />
    </Box>
  );
}
