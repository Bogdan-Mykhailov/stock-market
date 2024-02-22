import  { useEffect, useState } from 'react';
import {socket} from "../../socket.ts";


export const ActiveSessions = () => {
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    socket.on('sessionCountUpdate', (count) => {
      setSessionCount(count);
    });

    socket.emit('getSessionCount');

    return () => {
      socket.off('sessionCountUpdate');
    };
  }, []);
  const title = `Users online: ${sessionCount}`;

  return <span>{title}</span>;
};
