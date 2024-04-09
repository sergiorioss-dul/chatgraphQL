import { Box, Typography } from '@mui/material';
import { IMessageCard } from './models';
import { FC } from 'react';

export const MessageCard: FC<IMessageCard> = ({ text, date, direction }) => {
  return (
    <Box justifyContent={direction} display="flex">
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ backgroundColor: 'white', padding: '5px' }}
        >
          {text}
        </Typography>
        <Typography
          variant="caption"
          sx={{ backgroundColor: 'white', padding: '5px' }}
        >
          {new Date(date).toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};
