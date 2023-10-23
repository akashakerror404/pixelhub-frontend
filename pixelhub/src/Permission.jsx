import React, { useEffect } from 'react';

function Permission() {
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          listenForNewMessages();
        } else if (permission === 'denied') {
          console.log('Notification permission denied.');
        }
      });
    }
  }, []);


  return <div>{/* Your Permission component JSX */}</div>;
}

export default Permission;
