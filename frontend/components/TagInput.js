import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Chat.module.css';
import { fetchTagSuggestions, addNewTag } from '../store/tagsSlice';
import SuggestionsDropdown from './SuggestionsDropdown';

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

function buildHighlightedHtml(text) {
  const tagRegex = /@([a-zA-Z0-9_]+)(?=$|\s)/g;
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
      styles.tagMention +
      '">' +
      escapeHtml(tagText) +
      '</span>';
    lastIndex = end;
  }

  html += escapeHtml(text.slice(lastIndex));
  return html.replace(/\n/g, '<br/>');
}

const TagInput = ({ onSend }) => {
  const dispatch = useDispatch();
  const suggestions = useSelector((state) => state.tags.suggestions);

  const [inputValue, setInputValue] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const textareaRef = useRef(null);

  const detectMention = (value, caretPos) => {
    const textBefore = value.slice(0, caretPos);
    const atIndex = textBefore.lastIndexOf('@');

    if (atIndex === -1) {
      setActiveQuery('');
      setShowSuggestions(false);
      return;
    }

    const substring = textBefore.slice(atIndex + 1);

    if (substring.includes(' ') || substring.includes('\n')) {
      setActiveQuery('');
      setShowSuggestions(false);
      return;
    }

    const query = substring;
    setActiveQuery(query);
    setShowSuggestions(true);
    dispatch(fetchTagSuggestions(query));
    setActiveSuggestionIndex(0);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const pos = e.target.selectionStart;
    detectMention(value, pos);
  };

  const handleClick = (e) => {
    const pos = e.target.selectionStart;
    detectMention(e.target.value, pos);
  };

  const handleKeyUp = (e) => {
    const pos = e.target.selectionStart;

    if (
      e.key === 'ArrowDown' ||
      e.key === 'ArrowUp' ||
      e.key === 'Enter' ||
      e.key === 'Escape'
    ) {
      return;
    }

    detectMention(e.target.value, pos);
  };

  const handleKeyDown = (e) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (e.key === 'Backspace') {
      const pos = textarea.selectionStart;
      if (pos === 0) return;

      const textBefore = inputValue.slice(0, pos);
      const tagRegex = /@([a-zA-Z0-9_]+)/g;
      let match;
      let lastMatch = null;

      while ((match = tagRegex.exec(textBefore)) !== null) {
        lastMatch = match;
      }

      if (lastMatch) {
        const tagStart = lastMatch.index;
        const tagEnd = tagStart + lastMatch[0].length;
        const isAtEndOfTag = pos === tagEnd || pos === tagEnd + 1;

        if (isAtEndOfTag) {
          e.preventDefault();
          const after = inputValue.slice(pos);
          const newValue = inputValue.slice(0, tagStart) + after;
          setInputValue(newValue);

          const newPos = tagStart;
          requestAnimationFrame(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = newPos;
              textareaRef.current.selectionEnd = newPos;
            }
          });

          detectMention(newValue, newPos);
          return;
        }
      }
    }

    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveSuggestionIndex((prev) =>
          prev + 1 >= suggestions.length ? 0 : prev + 1
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveSuggestionIndex((prev) =>
          prev - 1 < 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (e.key === 'Enter') {
        if (activeQuery && suggestions[activeSuggestionIndex]) {
          e.preventDefault();
          handleSelectTag(suggestions[activeSuggestionIndex]);
        }
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    }
  };

  const handleSelectTag = (tag) => {
    const textarea = textareaRef.current;
    const pos = textarea ? textarea.selectionStart : inputValue.length;

    const textBefore = inputValue.slice(0, pos);
    const textAfter = inputValue.slice(pos);
    const atIndex = textBefore.lastIndexOf('@');
    if (atIndex === -1) return;

    const beforeAt = textBefore.slice(0, atIndex);
    const tagText = '@' + tag.name;
    const insertText = beforeAt + tagText + ' ';
    const newValue = insertText + textAfter;
    const newPos = insertText.length;

    setInputValue(newValue);
    setShowSuggestions(false);
    setActiveQuery('');

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = newPos;
        textareaRef.current.selectionEnd = newPos;
      }
    });

    detectMention(newValue, newPos);
  };

  const handleSendClick = () => {
    const text = inputValue.trim();
    if (!text) return;

    const tagRegex = /@([a-zA-Z0-9_]+)/g;
    const tags = [];
    let match;
    while ((match = tagRegex.exec(text)) !== null) {
      if (!tags.includes(match[1])) tags.push(match[1]);
    }

    tags.forEach((name) => dispatch(addNewTag(name)));

    onSend({ text, tags });

    setInputValue('');
    setActiveQuery('');
    setShowSuggestions(false);
    setActiveSuggestionIndex(0);

    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.selectionStart = 0;
      textareaRef.current.selectionEnd = 0;
    }
  };

  const highlightedHtml = buildHighlightedHtml(inputValue);

  return (
    <div>
      <div className={styles.tagInputRow}>
        <div className={styles.tagInputWrapper}>
          <div
            className={styles.tagInputHighlighting}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
          <textarea
            ref={textareaRef}
            className={styles.tagInputTextarea}
            rows={2}
            value={inputValue}
            onChange={handleChange}
            onClick={handleClick}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... Use @ to mention (e.g. @john_doe)"
          />
          <SuggestionsDropdown
            suggestions={suggestions}
            visible={showSuggestions}
            activeIndex={activeSuggestionIndex}
            onSelect={handleSelectTag}
          />
        </div>
        <button
          className={styles.sendButton}
          onClick={handleSendClick}
          disabled={!inputValue.trim()}
          type="button"
        >
          <span className={styles.sendIcon}>➤</span>
          Send
        </button>
      </div>
      <div className={styles.footerHint}>
        Press <span>@</span> to start tagging · Backspace after a tag removes the
        whole mention.
      </div>
    </div>
  );
};

export default TagInput;
