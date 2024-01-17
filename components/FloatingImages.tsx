"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function FloatingImages() {
  const blocks = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    window.addEventListener("mousemove", animateCircle);

    return () => {
      window.removeEventListener("mousemove", animateCircle);
    };
  }, []);

  function animateCircle(event: any) {
    let mouseX = event.clientX / (innerWidth ?? 100) - 0.5;
    let mouseY = event.clientY / (innerHeight ?? 100) - 0.5;

    if (!gsap) return;

    gsap.to([blocks.current[1], blocks.current[3]], {
      x: 40 * mouseX,
      y: 40 * mouseY,
      duration: 0.5,
    });
    gsap.to(blocks.current[0], {
      x: 20 * mouseX,
      y: 20 * mouseY,
      duration: 0.5,
    });
    gsap.to(blocks.current[2], {
      x: 10 * mouseX,
      y: 10 * mouseY,
      duration: 0.5,
    });
  }

  return (
    <>
      <div
        className="hidden sm:block moveable-block block-0 top-[-3rem] sm:top-[6rem] left-[-170px] lg:top-20 md:left-[-130px] lg:left-[-100px] !w-[15rem] md:w-[17rem] lg:!w-[20rem] !h-[10rem] translate-x-[-80px]"
        ref={(el) => (blocks.current[0] = el)}
      >
        <Image
          height={200}
          src="https://res.cloudinary.com/dyn3sdtfm/image/upload/c_scale,w_600/v1663411910/s-o-c-i-a-l-c-u-t-OjnmCKmzr3A-unsplash_wwntkj.webp"
          width={272}
          alt=""
        />
      </div>

      <div
        className="hidden sm:block moveable-block block-1 top-[60vh] left-[-8rem] lg:left-[7rem] !w-[18rem] !h-[10rem] translate-x-[-100px]"
        ref={(el) => (blocks.current[1] = el)}
      >
        <Image
          src="https://res.cloudinary.com/dyn3sdtfm/image/upload/c_scale,w_600/v1663412785/robert-keane-HFcxrs5u4uE-unsplash_qxzngi.webp"
          width={288}
          height={200}
          alt=""
        />
      </div>

      <div
        className="hidden sm:block moveable-block block-2 top-[75vh] right-[-15rem] sm:right-[-12rem] lg:top-[80vh] lg:right-[15vw] w-[10rem] lg:!w-[18rem] !h-[10rem] lg:!h-[9rem] translate-x-[80px]"
        ref={(el) => (blocks.current[2] = el)}
      >
        <Image
          src="https://res.cloudinary.com/dyn3sdtfm/image/upload/c_scale,w_600/v1663412879/kobu-agency-k41cAJvJ7h0-unsplash_atqohj.webp"
          width={288}
          height={200}
          alt=""
        />
      </div>

      <div
        className="hidden sm:block moveable-block block-3 top-28 right-[-12rem] lg:right-[-4rem] !w-[18rem] !h-[15rem] translate-x-[100px]"
        ref={(el) => (blocks.current[3] = el)}
      >
        <Image
          src="https://res.cloudinary.com/dyn3sdtfm/image/upload/c_scale,w_600/v1663411907/engin-akyurt-G26eJNYZA24-unsplash_kffjfa.webp"
          width={288}
          height={200}
          alt=""
        />
      </div>
    </>
  );
}

export default FloatingImages;
