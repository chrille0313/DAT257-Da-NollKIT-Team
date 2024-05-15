import * as React from "react";
import Slider from "@mui/material/Slider";
import tinygradient from "tinygradient";
import { styled, makeStyles, withStyles } from '@mui/material/styles';

/* const useStyles = makeStyles({
  root: {
    width: 200
  }
});

const gradient = tinygradient("#0ef7f1", "#7206ff");
const CustomSlider = withStyles({
  root: {
    height: 7
  },
  rail: {
    background: "#aac5f4",
    opacity: 0.7,
    height: 7,
    borderRadius: 7,
    overflow: "hidden"
  },
  track: {
    backgroundImage: ({ value }) =>
      `linear-gradient(.25turn, #0ef7f1 0%, ${gradient.rgbAt(
        value / 100
      )} 100%)`,
    height: 7,
    borderRadius: 7,
    overflow: "hidden"
  },
  thumb: {
    height: 22,
    width: 22,
    marginTop: -8,
    backgroundColor: ({ value }) => gradient.rgbAt(value / 100),
    "&:focus, &:hover": {
      boxShadow: "inherit"
    },
    border: "solid 2px #bdd4ff"
  }
})(Slider);

export default function ContinuousSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <CustomSlider
        value={value}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
      />
    </div>
  );
} */