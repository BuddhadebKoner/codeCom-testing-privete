import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import React from 'react';

const EntryPass = () => {
  const { userId, eventId, entryId } = useParams();
  const qrLink = `${userId}/${eventId}/${entryId}`;

  return (
    <div className='w-fit px-2 py-2 bg-white'>
      {qrLink ? (
        <QRCodeCanvas
          value={qrLink}
          size={180}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />
      ) : (
        <p className="text-red-500">QR code data is missing</p>
      )}
    </div>
  );
};

export default EntryPass;
