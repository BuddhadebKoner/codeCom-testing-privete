import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAuth } from "../context/AuthContext";
import { useGetEntryPass } from "../lib/react-query/queriesAndMutation";
import BigLoader from "../components/shared/BigLoader";
import { toast } from "react-toastify";

const EntryPass = () => {
  const { entryId, userId } = useParams();
  const { isAuthenticated, isLoading: currentUserFetching, user } = useAuth();
  const navigate = useNavigate();
  const { data: entryPass, isLoading, isError } = useGetEntryPass(entryId || "");

  useEffect(() => {
    if (currentUserFetching) return;

    if (
      !isAuthenticated ||
      user?.$id !== userId ||
      !navigator.onLine ||
      !entryId
    ) {
      toast.warn("Invalid activity detected. Redirecting...");
      navigate("/");
    }
  }, [isAuthenticated, currentUserFetching, entryId, userId, user, navigate]);

  useEffect(() => {
    if (isError) {
      console.error("Error fetching entry pass details for Entry ID:", entryId);
      toast.error("Failed to load the entry pass. Please contact support.");
    }
  }, [isError, entryId]);

  const isEventExpired = (eventTime, eventLength) => {
    const now = new Date();
    const endTime = eventTime
      ? new Date(eventTime.getTime() + eventLength * 60 * 60 * 1000)
      : null;
    return !eventTime || endTime < now;
  };

  if (isLoading || currentUserFetching) {
    return <BigLoader />;
  }

  if (isError) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-red-500 text-center">
          Failed to load entry pass. Please try again later.
        </p>
      </div>
    );
  }

  const { events, users } = entryPass || {};
  const eventTime = events?.eventTime ? new Date(events.eventTime) : null;
  const isExpired = isEventExpired(eventTime, events?.eventLength || 0);
  const eventEndTime = eventTime
    ? new Date(eventTime.getTime() + (events?.eventLength || 0) * 60 * 60 * 1000)
    : null;

  const downloadTicket = async () => {
    if (isExpired || user?.$id !== userId) {
      toast.warn("You cannot download this ticket.");
      return;
    }

    try {
      const ticketElement = document.getElementById("ticket-section");
      const canvas = await html2canvas(ticketElement);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CodeComm-${users?.name || "User"}.pdf`);
    } catch (error) {
      console.error("Error downloading the ticket:", error);
      toast.error("Failed to download the ticket. Please try again.");
    }
  };

  return (
    <div
      id="ticket-section"
      className={`flex flex-col md:flex-row w-full max-w-full lg:max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden ${isExpired ? "bg-gray-300 text-gray-500" : "bg-white"
        } no-select`}
    >
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
          <p className="text-red-500">
            QR code data is missing<br />Please contact the admin.
          </p>
        )}
      </div>

      <div className="flex-1 p-6 md:p-8 text-black">
        {isExpired && (
          <div className="mb-4 text-center">
            <span className="inline-block px-4 py-1 text-sm font-bold text-red-600 rounded-full">
              EXPIRED
            </span>
          </div>
        )}

        <h2 className="text-xl md:text-2xl font-bold">
          {events?.title || "Event Title"} :
        </h2>
        <p className="text-sm md:text-base mt-2">
          {events?.eventPlace}, {events?.city}
        </p>

        {eventTime && (
          <p className="text-sm md:text-base mt-2">
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

        <p className="text-sm md:text-base mt-4">
          <span className="font-bold">ISSUED TO: </span>
          {users?.name || "User Name"}
        </p>

        <p className="text-sm md:text-base mt-2">
          <span className="font-bold">ORDER NUMBER: </span>
          {entryPass?.entryId || "N/A"}
        </p>

        <p
          className={`text-sm md:text-base mt-4 font-bold ${isExpired ? "text-gray-500" : "text-green-600"
            }`}
        >
          STATUS: {isExpired ? "EXPIRED" : "FREE"}
        </p>

        <button
          onClick={downloadTicket}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default EntryPass;
