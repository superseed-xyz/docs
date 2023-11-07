import React from "react";
import Image from "next/image";

interface ArkantumLogoProps {
  width: number;
  height: number;
}

const ArkantumLogo: React.FC<ArkantumLogoProps> = ({
  width = 232,
  height = 64,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        src="/logo/V1-docs.png"
        alt="Arkantum Docs"
        width={width}
        height={height}
      />
    </div>
  );
};

export default ArkantumLogo;
