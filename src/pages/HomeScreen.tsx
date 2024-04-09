import { Box } from '@mui/material';
import { SideBar } from '../components/SideBar';
import { Route, Routes } from 'react-router-dom';
import { Welcome } from '../components/Welcome';
import { ChatScreen } from '../components/ChatScreen';
import { IHomeProps } from './models';
import { FC } from 'react';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/:id/:name" element={<ChatScreen />} />
    </Routes>
  );
};

export const HomeScreen: FC<IHomeProps> = ({ setLoggedIn }) => {
  return (
    <Box display="flex">
      <SideBar {...{ setLoggedIn }} />
      <AllRoutes />
    </Box>
  );
};
