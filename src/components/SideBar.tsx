import { Box, Typography, Divider, Stack } from '@mui/material';
import { UserCard } from './UserCard';
import LogoutIcon from '@mui/icons-material/Logout';
import { FC } from 'react';
import { ISideBarProps } from '../pages/models';
import { useQuery } from '@apollo/client';
import { GETALL_USERS } from '../graphql/querys';
import { TypeItem } from './models';

export const SideBar: FC<ISideBarProps> = ({ setLoggedIn }) => {
  const { loading, data } = useQuery(GETALL_USERS);
  if (loading) return <Typography variant="h6">Loading chats</Typography>;

  return (
    <Box
      sx={{
        padding: '10px',
        height: '100vh',
        width: '250px',
        backgroundColor: '#F7F7F7',
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6"> Chat</Typography>
        <LogoutIcon
          onClick={() => {
            localStorage.removeItem('jwt');
            setLoggedIn(false);
          }}
        />
      </Stack>
      <Divider />
      {data?.users.map((item: TypeItem, index: number) => {
        return <UserCard {...{ item }} key={index} />;
      })}
    </Box>
  );
};
