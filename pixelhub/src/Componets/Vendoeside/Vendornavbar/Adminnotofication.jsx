import React from 'react';

function Adminnotofication() {
  return (
    <div
      className="absolute top-0 right-0 p-2 bg-white shadow-md rounded-tl-md"
      style={{ width: '250px' }}
    >
      <ul className="list-none p-0 m-0">
        <li className="p-2 border-b border-gray-300">Notification 1: Something happened.</li>
        <li className="p-2 border-b border-gray-300">Notification 2: Another event occurred.</li>
        <li className="p-2">Notification 3: A third notification here.</li>
      </ul>
    </div>
  );
}

export default Adminnotofication;
