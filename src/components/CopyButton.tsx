import { useState } from "react";
import { Ripple, useRipple } from "@heroui/react";
import { motion } from "framer-motion";

type Props = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

const springPress = {
  type: "spring" as const,
  stiffness: 600,
  damping: 25,
};

export default function CopyButton({ label, value, icon }: Props) {
  const [copied, setCopied] = useState(false);
  const { onPress: onRipplePress, ripples } = useRipple();

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      onPointerDown={onRipplePress}
      className={`action-chip relative overflow-hidden${copied ? " copied" : ""}`}
      aria-label={`Copy ${label} username`}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97, y: 2 }}
      transition={springPress}
    >
      {icon && !copied && (
        <span style={{ display: "flex", alignItems: "center", flexShrink: 0, opacity: 0.7 }}>
          {icon}
        </span>
      )}
      {copied ? "Copied!" : label}
      <Ripple ripples={ripples} color="rgba(167,139,250,0.4)" />
    </motion.button>
  );
}
