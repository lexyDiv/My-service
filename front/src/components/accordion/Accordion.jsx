import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { red } from "@mui/material/colors";

const Accordion1 = function ({ id, text, title }) {
  return (
    <Accordion
      sx={{
        backgroundColor: "#212121",
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon sx={{ color: "white" }} />}
        aria-controls="panel2-content"
        id={id}
      >
        <Typography
          sx={{
            color: "white",
            textDecoration: 'underline'
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          sx={{
            color: "white",
            fontStyle: "italic", 
            fontWeight: "bold" 
        }}
        >
          {text}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Accordion1;
