import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../styles/Chat.module.css';
import ChatLayout from '../components/ChatLayout';
import MessageList from '../components/MessageList';
import TagInput from '../components/TagInput';
import { fetchMessages, addMessage } from '../store/messagesSlice';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSend = ({ text, tags }) => {
    dispatch(addMessage({ text, tags }));
  };

  return (
    <ChatLayout>
      <div className={styles.messagesWrapper}>
        <MessageList />
      </div>
      <div className={styles.inputSection}>
        <div className={styles.inputRow}>
          <TagInput onSend={handleSend} />
        </div>
      </div>
    </ChatLayout>
  );
};

export default Home;
