import React from "react";

const CardLayout = ({ children, style, className }) => {
  return <div className={`faucet_all_card ${className}`} style={style}>{children}</div>;
};

export default CardLayout;
