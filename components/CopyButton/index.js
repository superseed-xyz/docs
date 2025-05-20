import { useState } from "react";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <button onClick={handleCopy} style={{ marginLeft: 8, cursor: "pointer" }}>
      {copied ? "✅ Copied" : "📋 Copy"}
    </button>
  );
}
