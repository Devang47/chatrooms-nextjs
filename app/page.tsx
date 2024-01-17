"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import gsap, { Power3 } from "gsap";

import { FloatingImages, CircleAnimation, CRButton } from "@/components";
import {
  DashedUnderlineIcon,
  GithubIcon,
  ArrowRightIcon,
  CurvedArrowLineIcon,
} from "@/icons";
import { createRoom } from "@/utils/Room";
import { useLoadingStore, useRoomStore } from "@/utils/store";

export default function Home() {
  const router = useRouter();
  const loadingStore = useLoadingStore((store) => store);
  const roomStore = useRoomStore((store) => store);

  let roomId = "";
  let [formLoading, setFormLoading] = useState<"true" | "false" | "complete">(
    "false"
  );

  const transitionJoinPageStart = (callback: () => void) => {
    gsap
      .to(".transition-join-page", {
        height: "100%",
        duration: 0.7,
        ease: Power3.easeOut,
      })
      .then(callback);
  };

  const handleCreateRoom = async () => {
    setFormLoading("true");
    roomId = await createRoom();
    setFormLoading("complete");

    transitionJoinPageStart(() => {
      setTimeout(() => {
        loadingStore.toggleLoading(true);

        router.push(`/room?id=${roomId}`);
      }, 100);
    });
  };

  const handleGotoJoinPage = () => {
    transitionJoinPageStart(() => {
      setTimeout(() => {
        router.push("/room");
      }, 100);
    });
  };

  useEffect(() => {
    roomStore.setRoomMessages([]);
    roomStore.setRoomData(null);

    loadingStore.toggleLoading(false);

    const tl = gsap.timeline({});

    tl.to(".bg", {
      delay: 0.2,
      width: "100%",
      duration: 1,
      ease: Power3.easeOut,
    })
      .to(".content", {
        delay: -0.6,
        opacity: 1,
        duration: 0.4,
      })
      .to(".moveable-block", {
        delay: -0.7,
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.4,
      });
  }, []);

  return (
    <>
      <FloatingImages></FloatingImages>
      <div className="transition-join-page" />

      <section className="homepage">
        <div className="container relative">
          <div className="content opacity-0">
            <div className="relative w-fit mx-auto">
              <h1 className="sans">ChatRooms</h1>
              <span className="heading-underline">
                <DashedUnderlineIcon />{" "}
              </span>
            </div>
            <p>
              On this website, you can create a private chat room and share data
              across multiple devices. When you click the button below it will
              generate a 6-digit room code which can be then used to join the
              room from different devices. The chat room will automatically
              delete after 15min.
            </p>

            <div className="relative w-fit mx-auto group">
              <CRButton
                label="create a room"
                className="create-btn"
                onClick={handleCreateRoom}
              >
                {formLoading === "true" && (
                  <CircleAnimation className="w-[80px]" />
                )}

                <span
                  className={formLoading !== "false" ? "btn-remove-text" : ""}
                >
                  Create a room
                  <ArrowRightIcon />
                </span>
              </CRButton>

              <span className="curved-arrow-line">
                <CurvedArrowLineIcon />
              </span>
            </div>

            <div className="join-btn">
              or&nbsp;
              <button
                aria-label="Join room"
                title="Join existing room"
                onClick={handleGotoJoinPage}
                className=""
              >
                Join room
              </button>
            </div>
            <div className="absolute top-4 right-6 text-white text-sm w-7">
              <a
                href="https://github.com/Devang47/rooms.saklani.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="underline w-full"
              >
                <GithubIcon />
              </a>
            </div>
          </div>

          <div className="bg" />
        </div>
      </section>
    </>
  );
}
