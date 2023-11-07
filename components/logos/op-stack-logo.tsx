import React from "react";
import Image from "next/image";
import * as OPStackLogoSVG from "../public/logo/op-stack-lockout.svg";

interface OPStackLogoProps {
  width: number;
  height: number;
}

const OPStackLogo: React.FC<OPStackLogoProps> = ({
  width = 232,
  height = 64,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        src={OPStackLogoSVG}
        alt="Built on the OP Stack"
        width={width}
        height={height}
      />
    </div>
  );
};

export default OPStackLogo;
