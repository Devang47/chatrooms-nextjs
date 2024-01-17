import CryptoJS from "crypto-js";
import { decrypt } from "@/utils/crypt";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import { CopyIcon } from "@/icons";

function Message({
  messageData,
  roomId,
}: {
  messageData: Message;
  roomId: string;
}) {
  let [sameDevice, setSameDevice] = useState(false);
  let [message, setMessage] = useState("");
  let [done, setDone] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(message);
    setDone(true);
    toast.success("Copied to clipboard!");
  };

  useEffect(() => {
    const currentDeviceDetails = CryptoJS.SHA256(navigator.userAgent).toString(
      CryptoJS.enc.Hex
    );

    if (currentDeviceDetails === messageData.device) {
      setSameDevice(true);
    }

    const cryptedKey = CryptoJS.SHA512(roomId).toString(CryptoJS.enc.Hex);

    setMessage(decrypt(cryptedKey, messageData.data));
  }, [roomId]);

  return (
    <div
      className={clsx(
        "message-item",
        sameDevice ? "right-aligned" : "left-aligned"
      )}
    >
      <p className="w-full font-medium">{message}</p>

      <button
        aria-label="copy text"
        onClick={copyText}
        title="copy text"
        className={clsx("copy-btn", done && "done")}
      >
        <div className="sr-only">copy text</div>
        <CopyIcon />
      </button>
    </div>
  );
}

export default Message;
