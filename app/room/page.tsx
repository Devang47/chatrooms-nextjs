"use client";

import React, { useEffect, useState } from "react";
import gsap, { Power3 } from "gsap";
import { useLoadingStore, useRoomStore } from "@/utils/store";
import { CRButton, CircleAnimation, FloatingImages } from "@/components";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { checkIfRoomExists } from "@/utils/Room";
import {
  ArrowRightIcon,
  CurvedArrowLineIcon,
  DashedUnderlineIcon,
} from "@/icons";
import clsx from "clsx";

function Page() {
  let [inputVal, setInputVal] = useState("");
  const [formLoading, setFormLoading] = useState<"true" | "false" | "complete">(
    "false"
  );
  const roomStore = useRoomStore((store) => store);
  let [roomExists, setRoomExists] = useState(true);

  const router = useRouter();

  const joinRoom = async (e: any) => {
    e.preventDefault();
    if (!inputVal || inputVal.length < 6) return;
    setFormLoading("true");

    const roomData = await checkIfRoomExists(inputVal);
    roomStore.setRoomData(roomData);

    if (!roomData) {
      setFormLoading("false");
      setRoomExists(false);

      toast.error("404 Not found!");
      return null;
    }

    setRoomExists(true);
    setFormLoading("complete");

    gsap.to(".moveable-block", {
      opacity: 0,
      duration: 0.1,
    });

    gsap.to(".arrow-button", {
      scale: 100,
      duration: 0.3,
      ease: "linear",
    });

    setTimeout(() => {
      router.push("/room/" + inputVal);
    }, 800);
  };

  const loadingStore = useLoadingStore((store) => store);

  useEffect(() => {
    roomStore.setRoomMessages([]);
    roomStore.setRoomData(null);
    loadingStore.toggleLoading(false);

    const tl = gsap.timeline({});

    tl.to(".bg", {
      delay: 0.2,
      width: "100%",
      duration: 0.8,
      ease: Power3.easeOut,
    })
      .to(".content", {
        delay: -0.5,
        opacity: 1,
        duration: 0.4,
      })
      .to(".moveable-block", {
        delay: -0.6,
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.4,
      });
  }, []);

  const handleGotoCreatePage = () => {
    gsap
      .to(".transition-join-page", {
        height: "100%",
        duration: 0.7,
        ease: Power3.easeOut,
      })
      .then(() => {
        setTimeout(() => {
          router.push("/");
        }, 100);
      });
  };

  return (
    <>
      <FloatingImages />

      <div className="transition-join-page" />

      <section className="join-room-page">
        <div className="container">
          <div className="content opacity-0">
            <div className="relative w-fit mx-auto">
              <h1 className="sans">Join Room</h1>
              <span className="heading-underline">
                <DashedUnderlineIcon />
              </span>
            </div>

            <form action="#" onSubmit={joinRoom}>
              <div className="roomid-input">
                <input
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className=""
                  placeholder="xxxxxx"
                  maxLength={6}
                  type="text"
                  name=""
                  id=""
                />
                <span className="curved-arrow-line">
                  <CurvedArrowLineIcon />
                </span>
              </div>

              <div className="relative w-fit mx-auto group">
                <CRButton
                  label="Join room"
                  btnType="submit"
                  error={!roomExists}
                  className="arrow-button"
                >
                  {formLoading === "true" ? (
                    <CircleAnimation className="w-[80px]" />
                  ) : !roomExists ? (
                    <span> Not Found </span>
                  ) : (
                    ""
                  )}
                  <span
                    className={clsx(
                      (formLoading !== "false" || !roomExists) &&
                        "btn-remove-text"
                    )}
                  >
                    Join <ArrowRightIcon />
                  </span>
                </CRButton>

                <div className="create-btn">
                  or&nbsp;
                  <button
                    aria-label="create a new room"
                    type="button"
                    title="Create room"
                    onClick={handleGotoCreatePage}
                    className=""
                  >
                    Create room
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="bg" />
        </div>
      </section>
    </>
  );
}

export default Page;

{
  /* <script lang="ts">
</script>
 */
}
