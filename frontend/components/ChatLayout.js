import React from 'react';
import styles from '../styles/Chat.module.css';

const ChatLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.chatCard}>
        <div className={styles.header}>
          <div>
            <div className={styles.headerTitle}>
              DataStride Chat
              <span className={styles.headerBadge}>Assessment</span>
            </div>
            <div className={styles.headerSubtitle}>
              WhatsApp Style integration by sneha
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ChatLayout;
