import React, { useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

interface Props {
  enter: boolean;
  children?: React.ReactNode;
}

export default function FullScreener({ children, enter }: Props) {
  const handle = useFullScreenHandle();
  useEffect(() => {
    if (enter) handle.enter();
    else handle.exit();
  }, [enter]);
  return <FullScreen handle={handle}>{children}</FullScreen>;
}
