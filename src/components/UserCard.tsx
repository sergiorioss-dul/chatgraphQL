import { FC } from 'react';
import { UserCardProps } from './models';
import { Avatar, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const UserCard: FC<UserCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const { firstName, lastName, id } = item;
  return (
    <Stack
      className="usercard"
      direction="row"
      spacing={2}
      sx={{ py: 1 }}
      onClick={() => navigate(`/${id}/${firstName} ${lastName}`)}
    >
      <Avatar
        src={`https://api.dicebear.com/8.x/initials/svg?seed=${firstName} ${lastName}`}
        sx={{ width: '42px', heigth: '32px' }}
      />
      <Typography variant="subtitle2" sx={{ py: 1 }}>
        {firstName} {lastName}
      </Typography>
    </Stack>
  );
};
