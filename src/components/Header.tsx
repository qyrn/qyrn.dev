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
              "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)",
            filter: "blur(10px)",
            animation: "pulse-glow 2.8s ease-in-out infinite alternate",
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
              "conic-gradient(from 0deg, transparent 0deg, #6366f1 80deg, #a78bfa 180deg, #c4b5fd 260deg, #7c3aed 320deg, transparent 360deg)",
            animation: "spin-ring 2.8s linear infinite",
            willChange: "transform",
          }}
        />
        <img
          src="/pfp.png"
          alt="qyrn"
          width={96}
          height={96}
          style={{
            position: "absolute",
            inset: 2,
            width: "calc(100% - 4px)",
            height: "calc(100% - 4px)",
            borderRadius: "50%",
            objectFit: "cover",
            background: "#0a0a0f",
            zIndex: 1,
          }}
        />
      </div>

      <h1
        className="font-display font-extrabold leading-none mb-4"
        style={{
          fontSize: "clamp(80px, 18vw, 128px)",
          letterSpacing: "-4px",
          perspective: "600px",
        }}
      >
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="qyrn-shimmer"
            style={{
              display: "inline-block",
              background:
                "linear-gradient(90deg, #7c3aed 0%, #a78bfa 20%, #c4b5fd 38%, #ede9fe 50%, #c4b5fd 62%, #a78bfa 80%, #7c3aed 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: `shimmer-text 4s linear infinite`,
              animationDelay: `${1 + i * 0.15}s`,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </h1>

      <p
        className="text-xs font-medium mb-2"
        style={{
          color: "rgba(255,255,255,0.32)",
          letterSpacing: "3.5px",
          textTransform: "uppercase",
        }}
      >
        SOC Analyst{" "}
        <span style={{ color: "rgba(124,58,237,0.7)" }}>→</span>{" "}
        Pentester
      </p>

      <p
        className="text-xs"
        style={{
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "1.5px",
        }}
      >
        Defender mindset. Attacker goals.
      </p>
    </header>
  );
}
