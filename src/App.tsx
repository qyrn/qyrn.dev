import { motion } from "framer-motion";
import {
  SiGithub,
  SiTryhackme,
  SiHackthebox,
  SiX,
  SiYoutube,
  SiTiktok,
  SiTwitch,
  SiDiscord,
} from "react-icons/si";
import { LuFlag, LuMail } from "react-icons/lu";

const favicon = (domain: string) => (
  <img
    src={`https://${domain}/favicon.ico`}
    width={14}
    height={14}
    alt=""
    style={{ filter: "brightness(0) invert(1)", display: "block", flexShrink: 0 }}
    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
  />
);
import Header from "./components/Header";
import LinkGroup from "./components/LinkGroup";

const PROJECTS = [
  { label: "Vault", href: "https://vault.qyrn.dev", icon: favicon("vault.qyrn.dev") },
  { label: "Échelon", href: "https://echelon.qyrn.dev", icon: favicon("echelon.qyrn.dev") },
  { label: "Blog", href: "https://blog.qyrn.dev", icon: favicon("blog.qyrn.dev") },
];

const PROFILES = [
  { label: "GitHub", href: "https://github.com/qyrn", icon: <SiGithub size={13} /> },
  { label: "TryHackMe", href: "https://tryhackme.com/p/qyrn", icon: <SiTryhackme size={13} /> },
  {
    label: "HackTheBox",
    href: "https://profile.hackthebox.com/profile/019c5e2f-2184-7309-a6af-ff74d06aa636",
    icon: <SiHackthebox size={13} />,
  },
  {
    label: "Root-me",
    href: "https://www.root-me.org/qyrn?lang=fr#995154a4e3206b8bfaf6b7052b3d9b4b",
    icon: <LuFlag size={13} />,
  },
];

const SOCIALS = [
  { label: "X", href: "https://x.com/qyrnsec", icon: <SiX size={12} /> },
  { label: "YouTube", href: "https://www.youtube.com/@qyrnsec", icon: <SiYoutube size={13} /> },
  { label: "TikTok", href: "https://www.tiktok.com/@qyrnsec", icon: <SiTiktok size={13} /> },
  { label: "Twitch", href: "https://www.twitch.tv/qyrnsec", icon: <SiTwitch size={13} /> },
  { label: "Discord", copy: "qyrnsec", icon: <SiDiscord size={13} /> },
  { label: "Mail", modal: true, icon: <LuMail size={13} /> },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function App() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
      style={{ background: "#0a0a0f" }}
    >
      <div
        aria-hidden="true"
        className="orb pointer-events-none fixed"
        style={{
          top: "-15%",
          left: "-10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="orb-2 pointer-events-none fixed"
        style={{
          bottom: "-20%",
          right: "-10%",
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-[520px] text-center"
      >
        <motion.div variants={itemVariants}>
          <Header />
        </motion.div>

        <motion.nav aria-label="Links" className="flex flex-col gap-9">
          <motion.div variants={itemVariants}>
            <LinkGroup label="Projects" links={PROJECTS} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <LinkGroup label="Profiles" links={PROFILES} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <LinkGroup label="Socials" links={SOCIALS} />
          </motion.div>
        </motion.nav>
      </motion.main>
    </div>
  );
}
