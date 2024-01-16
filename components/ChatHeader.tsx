import React, { useEffect, useRef, useState } from "react";
import { useRoomStore } from "@/utils/store";
import toast from "react-hot-toast";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { DustbinIcon } from "@/icons";
import Modal from "./Modal";

function ChatHeader({
  roomId,
  handleDeleteRoom,
}: {
  roomId: string;
  handleDeleteRoom: () => void;
}) {
  const roomData = useRoomStore((state) => state.roomData);
  const setRoomMessages = useRoomStore((state) => state.setRoomMessages);
  const [time, setTime] = useState<number>(1);
  const [isQrModalOpen, setisQrModalOpen] = useState<boolean>(false);
  const [timeRemainingBeforeRoomDeletion, setTimeRemaining] = useState("");

  let interval: NodeJS.Timer;

  const copyText = () => {
    navigator.clipboard.writeText(roomId);

    toast.success("Copied to clipboard!");
  };

  function startTimer(duration: number) {
    if (!roomData?.timestamp) return;
    if (interval) clearInterval(interval);

    let timer = duration,
      minutes,
      seconds;

    interval = setInterval(() => {
      if (!roomData?.timestamp) return clearInterval(interval);

      minutes = parseInt("" + timer / 60, 10);
      seconds = parseInt("" + (timer % 60), 10);

      if (minutes === 0 && seconds === 0) {
        return setTimeRemaining("00:00");
      }

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setTimeRemaining(minutes + ":" + seconds);

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  let canvasEl = useRef<HTMLCanvasElement>(null);
  const createQrCode = async () => {
    setisQrModalOpen(true);
  };

  useEffect(() => {
    if (!roomData?.timestamp) return setTimeRemaining("Deleted");
    setTime(15 * 60000 - (new Date().getTime() - roomData?.timestamp));
  }, [roomData?.timestamp]);

  useEffect(() => {
    if (time) startTimer(time / 1000);
  }, [time]);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <header>
        <a href="/" onClick={() => setRoomMessages([])}>
          <h1 className="sans cursor-pointer">ChatRooms</h1>
        </a>
        <div className="flex items-center gap-3 lg:gap-5">
          <div className="text-light text-[15px] hidden sm:block">
            {timeRemainingBeforeRoomDeletion}
          </div>

          <button
            aria-label="view qr code"
            className="room-id !px-2"
            onClick={createQrCode}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16 17v-1h-3v-3h3v2h2v2h-1v2h-2v2h-2v-3h2v-1h1Zm5 4h-4v-2h2v-2h2v4ZM3 3h8v8H3V3Zm2 2v4h4V5H5Zm8-2h8v8h-8V3Zm2 2v4h4V5h-4ZM3 13h8v8H3v-8Zm2 2v4h4v-4H5Zm13-2h3v2h-3v-2ZM6 6h2v2H6V6Zm0 10h2v2H6v-2ZM16 6h2v2h-2V6Z"
              />
            </svg>
          </button>

          <button
            aria-label="copy room id"
            className="room-id group"
            onClick={copyText}
          >
            {(roomId || "").split("").map((letter, index) => (
              <span key={letter + index} className="letter">
                {letter}
              </span>
            ))}
          </button>

          <button
            aria-label="delete room"
            title="delete room"
            onClick={handleDeleteRoom}
            className="delete-btn"
          >
            <DustbinIcon />
          </button>
        </div>
      </header>

      {isQrModalOpen && (
        <Modal onClose={() => setisQrModalOpen(false)}>
          <QRCodeSVG
            width={200}
            height={200}
            value={`https://rooms.saklani.dev/room/${roomId ?? ""}`}
          />
        </Modal>
      )}
    </>
  );
}

export default ChatHeader;
