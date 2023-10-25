import React from "react";
import Image from "next/image";

interface ArkantumLogoProps {
  width: number;
  height: number;
}

const ArkantumLogo: React.FC<ArkantumLogoProps> = ({
  width = 64,
  height = 64,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        src="/logo/icon.png"
        alt="Arkantum Docs"
        width={width}
        height={height}
      />
      <h1 style={{ fontSize: "1.5rem", marginLeft: 10 }}>Arkantum Docs</h1>
    </div>
  );
};

export default ArkantumLogo;
