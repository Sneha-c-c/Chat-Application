import React from 'react';
import styles from '../styles/Chat.module.css';

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function (c) {
    switch (c) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

function formatMessageText(text) {
  const tagRegex = /@([a-zA-Z0-9_]+)/g;
  let html = '';
  let lastIndex = 0;
  let match;
  while ((match = tagRegex.exec(text)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    const before = text.slice(lastIndex, start);
    html += escapeHtml(before);
    const tagText = match[0];
    html +=
      '<span class="' +
      styles.tagInText +
      '">' +
      escapeHtml(tagText) +
      '</span>';
    lastIndex = end;
  }
  html += escapeHtml(text.slice(lastIndex));
  return html.replace(/\n/g, '<br/>');
}

const MessageItem = ({ message, isOutgoing }) => {
  const bubbleClass = isOutgoing
    ? `${styles.messageBubble} ${styles.messageOutgoing}`
    : `${styles.messageBubble} ${styles.messageIncoming}`;

  return (
    <div className={bubbleClass}>
      <div
        dangerouslySetInnerHTML={{ __html: formatMessageText(message.text) }}
      />
      {message.tags && message.tags.length > 0 && (
        <div className={styles.messageTags}>
          Tags: {message.tags.join(', ')}
        </div>
      )}
      <div className={styles.messageMeta}>
        #{message.id} · {isOutgoing ? 'You' : 'System'}
      </div>
    </div>
  );
};

export default MessageItem;
