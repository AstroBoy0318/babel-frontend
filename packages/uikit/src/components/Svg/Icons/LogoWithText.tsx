import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#e9950c" : "#000";
  return (
    <div {...props} style={{display:"flex", alignItems: "center", gap: "10px"}}>
      <img src="/images/babel.svg" alt="logo with text" width={32}/>
      <span style={{color: textColor, fontSize: "18px"}}>
        <b>
          BABEL SWAP
        </b>
      </span>
    </div>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
