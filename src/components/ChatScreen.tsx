import {
  AppBar,
  Avatar,
  Box,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { MessageCard } from './MessageCard';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/querys';
import { useEffect, useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { SEND_MESSAGE } from '../graphql/mutations';
import { MESSAGE_SUB } from '../graphql/subscription';
import { IMessage } from './models';

export const ChatScreen = () => {
  const listRef = useRef(null);
  const { id, name } = useParams();
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const { loading } = useQuery(GET_MESSAGES, {
    variables: {
      receiverId: +id,
    },
    onCompleted(data) {
      setMessages(data.messageByUser);
    },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useSubscription(MESSAGE_SUB, {
    onSubscriptionData({ subscriptionData: { data } }) {
      setMessages((prevMessages) => [...prevMessages, data.messageAdded]);
    },
  });

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'white', boxShadow: 0.5 }}
      >
        <Toolbar>
          <Avatar
            src={`https://api.dicebear.com/8.x/initials/svg?seed=${name}`}
            sx={{ width: '42px', heigth: '32px', mr: 2 }}
          />
          <Typography variant="h6" color="black">
            {name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          backgroundColor: '#F5F5F5',
          height: '80vh',
          padding: '10px',
          overflowY: 'auto',
        }}
      >
        {loading ? (
          <Typography variant="h6">loading chats</Typography>
        ) : (
          messages.map((msg: IMessage, index) => {
            return (
              <div ref={listRef} key={index}>
                <MessageCard
                  text={msg.text}
                  date={msg.createdAt}
                  direction={msg.receiverId == +id ? 'end' : 'start'}
                />
              </div>
            );
          })
        )}
      </Box>
      <Stack direction="row">
        <TextField
          placeholder="Enter a message"
          variant="standard"
          fullWidth
          multiline
          rows={2}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <SendIcon
          fontSize="large"
          onClick={() => {
            sendMessage({
              variables: {
                receiverId: +id,
                text,
              },
            });
            setText('');
          }}
        />
      </Stack>
    </Box>
  );
};
