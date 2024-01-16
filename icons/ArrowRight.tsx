import React from "react";

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 6L1 6M8.3125 11L14 6L8.3125 1"
        stroke="#38404A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowRight;
