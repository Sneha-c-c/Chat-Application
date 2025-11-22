import React from 'react';
import styles from '../styles/Chat.module.css';

const SuggestionsDropdown = ({
  suggestions,
  visible,
  activeIndex,
  onSelect
}) => {
  if (!visible || suggestions.length === 0) {
    return null;
  }

  return (
    <div className={styles.suggestionsDropdown}>
      <div className={styles.suggestionsHeader}>Mention someone</div>
      <div className={styles.suggestionsList}>
        {suggestions.map((tag, index) => (
          <div
            key={tag.id}
            className={
              index === activeIndex
                ? `${styles.suggestionItem} ${styles.suggestionItemActive}`
                : styles.suggestionItem
            }
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(tag);
            }}
          >
            <span className={styles.suggestionTagName}>@{tag.name}</span>
            <span className={styles.suggestionTagMeta}>tag</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsDropdown;
