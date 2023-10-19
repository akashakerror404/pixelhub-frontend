import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

function WhatsApp() {
  const phone = '7025784463'; 

  const openWhatsAppChat = () => {
    const url = `https://wa.me/${phone}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-10 right-10">
      <button
        onClick={openWhatsAppChat}
        className="bg-green-500 text-white p-4 rounded-full"
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
  );
}

export default WhatsApp;
