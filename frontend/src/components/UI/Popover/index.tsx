import React from "react";

const Popover = ({ className, children, openPopover }) => {
  return (
    <>
      {openPopover && (
        <>
          <div className={`faucet_popover_wrapper ${className}`}>{children}</div>
        </>
      )}
    </>
  );
};

export default Popover;