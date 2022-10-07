import React, { useEffect } from 'react';
import { PromptProps, Prompt } from 'react-router';

interface Props extends PromptProps {
  id?: React.Key;
}

function callback(event: BeforeUnloadEvent | null) {
  if (event) {
    event.returnValue = true;
  }
  return true;
}

export default function NavPrompt({ id, when, ...rest }: Props) {
  useEffect(
    () => {
      // console.log('mount', when);
      if (!when) return undefined;

      window.addEventListener('beforeunload', callback);

      return () => {
        // console.log('unmount', callback);
        window.removeEventListener('beforeunload', callback);
      };
    },
    [when]
  );

  return <Prompt when={when} {...rest} />;
}
