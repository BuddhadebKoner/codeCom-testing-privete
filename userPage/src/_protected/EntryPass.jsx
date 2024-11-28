import { useNavigate, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useGetEntryPass } from "../lib/react-query/queriesAndMutation";
import BigLoader from "../components/shared/BigLoader";

const EntryPass = () => {
  const { entryId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch entry pass data
  const { data: entryPass, isLoading, isError } = useGetEntryPass(entryId || "");

  // Handle redirects
  useEffect(() => {
    if (!isAuthenticated) {
      console.warn("Unauthorized access. Redirecting to login.");
      navigate("/");
    } else if (!navigator.onLine) {
      console.warn("You are offline. Redirecting to home.");
      navigate("/");
    } else if (!entryId) {
      console.warn("Invalid entry pass. Redirecting to home.");
      navigate("/");
    }
  }, [isAuthenticated, entryId, navigate]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      console.error("Error fetching entry pass details. Showing error message.");
    }
  }, [isError]);

  if (isLoading) {
    return <BigLoader />;
  }

  if (isError) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-red-500 text-center">Failed to load entry pass. Please try again later.</p>
      </div>
    );
  }

  const { events, users } = entryPass || {};
  const eventTime = events?.eventTime ? new Date(events.eventTime) : null;
  const eventEndTime = eventTime
    ? new Date(eventTime.getTime() + (events?.eventLength || 0) * 60 * 60 * 1000)
    : null;

  return (
    <div className="flex flex-col md:flex-row w-full max-w-full lg:max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Left Section: QR Code */}
      <div className="flex items-center justify-center bg-gray-100 p-6 md:w-1/3">
        {entryPass?.entryId ? (
          <QRCodeCanvas
            value={entryPass.entryId}
            size={160}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
          />
        ) : (
          <p className="text-red-500">QR code data is missing</p>
        )}
      </div>

      {/* Right Section: Event Details */}
      <div className="flex-1 p-6 md:p-8">
        {/* Event Title */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{events?.title || "Event Title"}</h2>

        {/* Event Place */}
        <p className="text-sm md:text-base text-gray-600 mt-2">
          {events?.eventPlace}, {events?.city}
        </p>

        {/* Event Time */}
        {eventTime && (
          <p className="text-sm md:text-base text-gray-600 mt-2">
            {eventTime.toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}{" "}
            to{" "}
            {eventEndTime?.toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        )}

        {/* Issued To */}
        <p className="text-sm md:text-base text-gray-700 mt-4">
          <span className="font-bold">ISSUED TO: </span>
          {users?.name || "User Name"}
        </p>

        {/* Order Number */}
        <p className="text-sm md:text-base text-gray-700 mt-2">
          <span className="font-bold">ORDER NUMBER: </span>
          {entryPass?.entryId || "N/A"}
        </p>

        {/* Status */}
        <p className="text-sm md:text-base text-green-600 mt-4 font-bold">STATUS: FREE</p>
      </div>
    </div>

  );
};

export default EntryPass;
