import { useNavigate, useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGetEntryPass } from '../lib/react-query/queriesAndMutation';
import BigLoader from '../components/shared/BigLoader';

const EntryPass = () => {
  const { entryId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch entry pass data
  const { data: entryPass, isLoading: userLoading, isError } = useGetEntryPass(entryId || "");

  useEffect(() => {
    if (!isAuthenticated) {
      console.warn("Unauthorized access. Redirecting to login.");
      navigate("/");
      return;
    }

    if (!navigator.onLine) {
      console.warn("You are offline. Redirecting to home.");
      navigate("/");
      return;
    }

    if (!entryId) {
      console.warn("Invalid entry pass. Redirecting to home.");
      navigate("/");
      return;
    }
  }, [isAuthenticated, entryId, navigate]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching entry pass details. Showing error message.");
    }
  }, [isError]);

  if (userLoading) {
    return <BigLoader />;
  }

  useEffect(() => {
    console.log("Entry pass:", entryPass);
  }, [entryPass]);

  if (isError) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-red-500 text-center">Failed to load entry pass. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-fit px-4 py-4 bg-white shadow-md rounded-md">
      {entryPass ? (
        <QRCodeCanvas
          value={entryPass?.id || entryId}
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
