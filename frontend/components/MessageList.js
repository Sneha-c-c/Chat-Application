import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Chat.module.css';
import MessageItem from './MessageItem';

const MessageList = () => {
  const messages = useSelector((state) => state.messages.items);

  return (
    <div className={styles.messageList}>
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg}
          isOutgoing={msg.id >= 3}
        />
      ))}
    </div>
  );
};

export default MessageList;
