import { motion } from "framer-motion";

const LETTERS = "qyrn".split("");

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.6,
    rotateX: -45,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: 0.15 + i * 0.09,
      type: "spring" as const,
      stiffness: 140,
      damping: 11,
    },
  }),
};

export default function Header() {
  return (
    <header className="flex flex-col items-center mb-14">
      <div className="relative mb-7" style={{ width: 100, height: 100 }}>
        <div
          aria-hidden="true"
          className="pfp-glow"
          style={{
            position: "absolute",
            inset: -14,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
        <div
          aria-hidden="true"
          className="pfp-ring"
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, transparent 0deg, #7c3aed 70deg, #a78bfa 160deg, #ede9fe 220deg, #7c3aed 300deg, transparent 360deg)",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 2,
            width: "calc(100% - 4px)",
            height: "calc(100% - 4px)",
            borderRadius: "50%",
            overflow: "hidden",
            background: "#0a0a0f",
            zIndex: 1,
          }}
        >
          <img
            src="/pfp.webp"
            alt="qyrn"
            width={96}
            height={96}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <img
            src="/pfp.webp"
            alt=""
            aria-hidden="true"
            className="pfp-ghost pfp-ghost-r"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <img
            src="/pfp.webp"
            alt=""
            aria-hidden="true"
            className="pfp-ghost pfp-ghost-b"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>

      <h1
        className="font-display font-extrabold leading-none mb-4"
        style={{
          fontSize: "clamp(56px, 20vw, 128px)",
          letterSpacing: "-4px",
          perspective: "600px",
          whiteSpace: "nowrap",
        }}
      >
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            style={{ display: "inline-block" }}
          >
            <span
              className="qyrn-shimmer"
              style={{
                display: "inline-block",
                backgroundImage:
                  "linear-gradient(90deg, #7c3aed 0%, #a78bfa 20%, #c4b5fd 38%, #ede9fe 50%, #c4b5fd 62%, #a78bfa 80%, #7c3aed 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animationDelay: `${1 + i * 0.15}s`,
              }}
            >
              {letter}
            </span>
          </motion.span>
        ))}
      </h1>

      <p
        className="font-mono text-xs mb-1.5"
        style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.3px" }}
      >
        <span
          className="type-reveal"
          style={
            {
              "--type-w": "9ch",
              animation: "type-w 0.4s steps(8, end) 1.1s 1 forwards",
            } as React.CSSProperties
          }
        >
          <span style={{ color: "rgba(167,139,250,0.5)" }}>$</span> whoami
        </span>
      </p>

      <p
        className="font-mono text-xs"
        style={{ color: "rgba(255,255,255,0.42)", letterSpacing: "0.3px" }}
      >
        <span
          className="type-reveal"
          style={
            {
              "--type-w": "27ch",
              animation: "type-w 0.9s steps(25, end) 1.7s 1 forwards",
            } as React.CSSProperties
          }
        >
          <span style={{ color: "rgba(167,139,250,0.65)" }}>&gt;</span> SOC Analyst{" "}
          <span style={{ color: "rgba(167,139,250,0.65)" }}>→</span> Pentester
          <span
            aria-hidden="true"
            className="cursor-blink"
            style={{
              display: "inline-block",
              width: 6,
              height: 12,
              marginLeft: 4,
              verticalAlign: "-2px",
              background: "rgba(167,139,250,0.5)",
            }}
          />
        </span>
      </p>
    </header>
  );
}
