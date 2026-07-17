import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
}

export default function TypingAnimation({ 
  strings, 
  typingSpeed = 50, 
  deletingSpeed = 30, 
  delayBetween = 2000 
}: TypingAnimationProps) {
  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentString = strings[stringIndex];

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % strings.length);
        timeout = setTimeout(() => {}, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setText(currentString.substring(0, text.length - 1));
        }, deletingSpeed);
      }
    } else {
      if (text === currentString) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetween);
      } else {
        timeout = setTimeout(() => {
          setText(currentString.substring(0, text.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, stringIndex, strings, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <span className="font-mono text-cyber-green">
      {text}
      <span className="animate-pulse">_</span>
    </span>
  );
}