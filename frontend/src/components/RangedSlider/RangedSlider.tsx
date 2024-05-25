import { Box, Slider, Typography } from '@mui/material';
import { useState } from 'react';

export interface RangeSliderProps {
  value: number | number[];
  minValue?: number;
  maxValue?: number;
  valueLabelFormat?: (value: number) => string;
  onUpdate: (event: Event, newValue: number[]) => void;
}

export default function RangeSlider({
  minValue = 0,
  maxValue = 200,
  ...props
}: RangeSliderProps) {
  const [range, setRange] = useState<number[]>([0, 60]);

  function handleChange(event: Event, newValue: number | number[]) {
    setRange(newValue as number[]);
    props.onUpdate(event, newValue as number[]);
  }

  return (
    <Box>
      <Slider
        valueLabelFormat={(value) => `${value} min`}
        value={range}
        onChange={handleChange}
        step={5}
        min={minValue}
        max={maxValue}
        valueLabelDisplay="auto"
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="body2"
          //onClick={() => setVal(MIN)}
          sx={{ cursor: 'pointer' }}
        >
          {0} min
        </Typography>
        <Typography
          variant="body2"
          //onClick={() => setVal(MAX)}
          sx={{ cursor: 'pointer' }}
        >
          {200} min
        </Typography>
      </Box>
    </Box>
  );
}
