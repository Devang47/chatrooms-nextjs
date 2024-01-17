import React from "react";
import clsx from "clsx";

type PropType = {
  children: React.ReactNode;
  onClick?: () => void;
  className: string;
  disabled?: boolean;
  btnType?: "button" | "submit" | "reset";
  error?: Boolean;
  label: string;
};

function CRButton(props: PropType) {
  return (
    <button
      aria-label={props.label}
      onClick={props.onClick}
      type={props.btnType}
      className={clsx(
        "arrow-button group shadow-custom",
        props.className,
        props.error && "error"
      )}
    >
      {props.children}
    </button>
  );
}

export default CRButton;
