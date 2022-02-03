import { Fragment } from 'react';
import styled from 'styled-components';

const isValidUrl = (url: string) => {
  let urlObject: URL;
  try {
    urlObject = new URL(url);
  } catch {
    return false;
  }

  return urlObject.protocol === 'http:' || urlObject.protocol === 'https:';
};

const emoticonToEmoji: { [emoticon: string]: string } = {
  ':)': '😀',
  ':D': '😁',
  '(:': '🙃',
  ';)': '😉',
  ':\')': '🥲',
  ':P': '😛',
  ':|': '😐',
  'B)': '😎',
  ':/': '🫤',
  ':(': '☹',
  ':O': '😯	',
  'D:': '😧',
  '>:(': '😠',
  ':@': '🤬',
  '<3': '❤',
  '(Y)': '👍'
};

const Link = styled.a`
  text-decoration: none;
  color: #3a73f0;

  &:hover {
    text-decoration: underline;
  }
`;

interface MessageTextProps {
  text: string;
}

const MessageText = ({ text }: MessageTextProps) => {
  const elements = text.split(/(\S+\s+)/).map((word, i) => (
    isValidUrl(word)
      ? <Link href={word} key={i}>{word}</Link>
      : <Fragment key={i}>
        {emoticonToEmoji[word.trim().toUpperCase()] || word}
      </Fragment>
  ));
  return <>{elements}</>;
};

export default MessageText;
