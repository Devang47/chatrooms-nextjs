import React from "react";

function CircleAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`spinner ${className}`}>
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  );
}

export default CircleAnimation;
