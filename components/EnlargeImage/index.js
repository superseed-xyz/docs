"use client";

import { useState } from "react";

export default function EnlargeImage({ src, alt }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        style={{ cursor: 'zoom-in', maxWidth: '100%' }}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'zoom-out'
          }}
        >
          <img src={src} alt={alt} style={{ maxHeight: '90%', maxWidth: '90%' }} />
        </div>
      )}
    </>
  );
}
