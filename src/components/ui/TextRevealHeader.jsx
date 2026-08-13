import React from 'react';
import './TextRevealHeader.css';

export function TextRevealHeader({ line1, line2Prefix, accentWord, active = false }) {
  const line1Chars = line1 ? line1.split("") : [];
  const line2PrefixChars = line2Prefix ? line2Prefix.split("") : [];
  const accentChars = accentWord ? accentWord.split("") : [];

  let globalIndex = 0;

  return (
    <h1 className={`hero-title text-reveal-h1 ${active ? 'active-reveal' : 'inactive-reveal'}`}>
      {/* Line 1 */}
      <span className="title-line reveal-line">
        {line1Chars.map((char, i) => {
          const currentIndex = globalIndex++;
          return (
            <span
              style={{ "--index": currentIndex }}
              key={`l1-${i}`}
              className="char-span"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>

      {/* Line 2 */}
      <span className="title-line reveal-line">
        {line2PrefixChars.map((char, i) => {
          const currentIndex = globalIndex++;
          return (
            <span
              style={{ "--index": currentIndex }}
              key={`l2p-${i}`}
              className="char-span"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
        <span className="title-word-accent inline-accent">
          {accentChars.map((char, i) => {
            const currentIndex = globalIndex++;
            return (
              <span
                style={{ "--index": currentIndex }}
                key={`acc-${i}`}
                className="char-span accent-char"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      </span>
    </h1>
  );
}

export default TextRevealHeader;
