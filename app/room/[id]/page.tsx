"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ChatHeader from "@/components/ChatHeader";
import { useLoadingStore, useRoomStore } from "@/utils/store";
import {
  addMessage,
  checkIfRoomExists,
  deleteRoom,
  getRoomMessages,
} from "@/utils/Room";
import { useParams, useRouter } from "next/navigation";
import { uploadFile } from "@/utils/storage";
import toast from "react-hot-toast";
import { GithubIcon, SendIcon, UploadIcon } from "@/icons";
import { Message } from "@/components";

function Page() {
  let roomId = (useParams().id as string).toUpperCase();
  let [chatInput, setChatInput] = useState("");

  const scrollToElement = useRef<HTMLDivElement>(null);
  const uploadFileInput = useRef<HTMLInputElement>(null);
  const chatInputBox = useRef<HTMLTextAreaElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const roomStore = useRoomStore((store) => store);
  const loadingStore = useLoadingStore((store) => store);

  useEffect(() => {
    (async () => {
      const roomData = await checkIfRoomExists(roomId);
      roomStore.setRoomData(roomData);

      if (!roomData) {
        roomStore.setRoomMessages([]);
        toast.error("Room doesn't exists");
        router.push("/");
      } else {
        await getRoomMessages(roomId, scrollToBottom);
        loadingStore.toggleLoading(false);
      }
    })();

    window.addEventListener("keypress", focusOnInput);
    chatInputBox.current?.addEventListener("keypress", handleChatInputKeypress);

    () => {
      window.removeEventListener("keypress", focusOnInput);
      chatInputBox.current?.removeEventListener(
        "keypress",
        handleChatInputKeypress
      );
    };
  }, []);

  const handleChatInputKeypress = (e: KeyboardEvent) => {
    if (innerWidth < 640) return;

    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setChatInput((value) => value + "\r\n");
    } else if (e.key === "Enter") {
      e.preventDefault();
      sendButtonRef.current?.click();
    }
  };

  const focusOnInput = (e: KeyboardEvent) => {
    if (innerWidth < 640) return;

    if (e.key === "/") {
      chatInputBox.current?.focus();
    }
  };

  const handleAddMsg = async (chatInput: string) => {
    chatInput = chatInput.trim();
    if (!chatInput) return;

    let msg = chatInput;
    setChatInput("");

    await addMessage({ roomId, message: msg });

    scrollToBottom();
    if (innerWidth > 640) {
      chatInputBox.current?.focus();
    }
  };

  const handleInputChange = async (e: any) => {
    if (e?.target?.files.length > 0) {
      loadingStore.toggleLoading(true);
      loadingStore.toggleLoadingUpload(true);
      try {
        let url = await uploadFile(roomId, e.target.files[0]);

        if (chatInput.trim()) return setChatInput((value) => value + " " + url);
        setChatInput((value) => value + url);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteRoom = async () => {
    loadingStore.toggleLoading(true);
    await deleteRoom(roomId);
    roomStore.setRoomMessages([]);
    router.push("/");
  };

  const scrollToBottom = () => {
    if (scrollToElement) {
      scrollToElement.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <section className="chat-ui">
        <div className="container">
          <ChatHeader roomId={roomId} handleDeleteRoom={handleDeleteRoom} />

          <div className="chat-messages-wrapper">
            <div className="messages-wrapper">
              {!roomStore.roomMessages.length ? (
                <div className="placeholder">
                  <SendIcon color="#555E69" />

                  <h2 className="">Type and send a message to get started!</h2>

                  <div className="commands-table hidden sm:block">
                    <table className="">
                      <tbody>
                        <tr>
                          <td>
                            <code> enter </code>
                          </td>
                          <td>Send Message</td>
                        </tr>
                        <tr>
                          <td>
                            <code> shift + enter </code>
                          </td>
                          <td>New line</td>
                        </tr>
                        <tr>
                          <td>
                            <code> / </code>
                          </td>
                          <td>Focus on input</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                roomStore.roomMessages.map((el) => {
                  return (
                    <Message
                      key={el.timestamp}
                      roomId={roomId}
                      messageData={el}
                    />
                  );
                })
              )}

              <div className="scroll-bottom" ref={scrollToElement} />
            </div>

            <div className="chat-input">
              <textarea
                title="Chat input"
                placeholder="Enter something..."
                name="chat-input"
                id="input"
                cols={30}
                rows={10}
                ref={chatInputBox}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <div className="buttons">
                <button
                  onClick={() => handleAddMsg(chatInput)}
                  ref={sendButtonRef}
                  aria-label="send message button"
                  title="Send message"
                >
                  <div className="sr-only">Send message</div>
                  <SendIcon />
                </button>
                <button
                  className="upload cursor-pointer"
                  title="Upload media"
                  aria-label="Upload media button"
                  onClick={() => uploadFileInput.current?.click()}
                >
                  <label htmlFor="fileinput" className="sr-only">
                    Upload media
                  </label>
                  <div title="Upload media" className="upload-icon">
                    <UploadIcon />
                  </div>
                  <input
                    multiple={false}
                    ref={uploadFileInput}
                    type="file"
                    className="hidden"
                    name="fileinput"
                    id="fileinput"
                    onChange={handleInputChange}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hidden md:block absolute top-4 md:right-4 lg:right-6 text-white text-sm w-7">
        <a
          href="https://github.com/Devang47/rooms.saklani.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="underline w-full"
        >
          <GithubIcon />
        </a>
      </div>
    </>
  );
}

export default Page;
