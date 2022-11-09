import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <img {...props} src="/images/babel.svg" alt="logo with text" width={32}/>
  );
};

export default Icon;
