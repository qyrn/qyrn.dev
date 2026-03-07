import { Ripple, useRipple } from "@heroui/react";
import { motion } from "framer-motion";
import CopyButton from "./CopyButton";
import MailButton from "./MailButton";

type LinkItem = {
  label: string;
  href?: string;
  copy?: string;
  modal?: boolean;
  icon?: React.ReactNode;
};

type Props = {
  label: string;
  links: LinkItem[];
};

const springLink = {
  type: "spring" as const,
  stiffness: 500,
  damping: 20,
};

function LinkChip({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
  const { onPress, ripples, onClear } = useRipple();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-chip relative overflow-hidden"
      onPointerDown={onPress as unknown as React.PointerEventHandler<HTMLAnchorElement>}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={springLink}
    >
      {icon && (
        <span style={{ display: "flex", alignItems: "center", flexShrink: 0, opacity: 0.7 }}>
          {icon}
        </span>
      )}
      {label}
      <Ripple ripples={ripples} onClear={onClear} color="rgba(124,58,237,0.35)" />
    </motion.a>
  );
}

export default function LinkGroup({ label, links }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p
        className="text-[10px] font-medium uppercase"
        style={{
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "3px",
        }}
      >
        {label}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {links.map((link) => {
          if (link.modal) return <MailButton key={link.label} icon={link.icon} />;
          if (link.copy)
            return (
              <CopyButton key={link.label} label={link.label} value={link.copy} icon={link.icon} />
            );
          return <LinkChip key={link.label} href={link.href!} label={link.label} icon={link.icon} />;
        })}
      </div>
    </div>
  );
}
