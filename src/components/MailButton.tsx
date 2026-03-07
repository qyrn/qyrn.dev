import { useState, useEffect, useRef } from "react";
import { Ripple, useRipple } from "@heroui/react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqywadb";
const MAX_MESSAGE = 500;

const springPress = { type: "spring" as const, stiffness: 600, damping: 25 };
const springPopup = { type: "spring" as const, stiffness: 340, damping: 28 };

type Props = {
  icon?: React.ReactNode;
};

export default function MailButton({ icon }: Props) {
  const [open, setOpen] = useState(false);
  const { onPress: onRipplePress, ripples, onClear } = useRipple();
  const shouldReduceMotion = useReducedMotion();

  const [email, setEmail] = useState(() => {
    try { return localStorage.getItem("qyrn-contact-email") ?? ""; } catch { return ""; }
  });
  const [subject, setSubject] = useState(() => {
    try { return localStorage.getItem("qyrn-contact-subject") ?? ""; } catch { return ""; }
  });
  const [message, setMessage] = useState(() => {
    try { return localStorage.getItem("qyrn-contact-message") ?? ""; } catch { return ""; }
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try { localStorage.setItem("qyrn-contact-email", email); } catch {}
  }, [email]);

  useEffect(() => {
    try { localStorage.setItem("qyrn-contact-subject", subject); } catch {}
  }, [subject]);

  useEffect(() => {
    try { localStorage.setItem("qyrn-contact-message", message); } catch {}
  }, [message]);

  useEffect(() => {
    return () => { if (successTimer.current) clearTimeout(successTimer.current); };
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (status !== "ok") return;
    setTimeout(() => setStatus("idle"), 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, subject, message }),
      });
      if (res.ok) {
        setStatus("ok");
        setEmail("");
        setSubject("");
        setMessage("");
        try {
          localStorage.removeItem("qyrn-contact-email");
          localStorage.removeItem("qyrn-contact-subject");
          localStorage.removeItem("qyrn-contact-message");
        } catch {}
        successTimer.current = setTimeout(() => {
          setOpen(false);
          setTimeout(() => setStatus("idle"), 400);
        }, 2200);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const popupVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { opacity: 0, scale: 0.88, y: 16 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.88, y: 16 },
      };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onPointerDown={onRipplePress as unknown as React.PointerEventHandler<HTMLButtonElement>}
        className={`action-chip relative overflow-hidden${open ? " copied" : ""}`}
        aria-label="Mail — open contact form"
        aria-expanded={open}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97, y: 2 }}
        transition={springPress}
      >
        {icon && (
          <span style={{ display: "flex", alignItems: "center", flexShrink: 0, opacity: 0.7 }}>
            {icon}
          </span>
        )}
        Mail
        <Ripple ripples={ripples} onClear={onClear} color="rgba(167,139,250,0.4)" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="contact-popup"
            role="dialog"
            aria-modal="true"
            aria-label="Contact"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={springPopup}
            className="fixed bottom-6 right-6 z-50"
            style={{
              width: 360,
              transformOrigin: "bottom right",
              borderRadius: 16,
              background:
                "linear-gradient(#0d0d16, #0d0d16) padding-box, linear-gradient(135deg, rgba(124,58,237,0.55) 0%, rgba(99,102,241,0.3) 40%, rgba(255,255,255,0.04) 70%, rgba(124,58,237,0.2) 100%) border-box",
              border: "1px solid transparent",
              boxShadow:
                "0 0 0 1px rgba(124,58,237,0.15), 0 32px 64px rgba(0,0,0,0.65), 0 0 80px rgba(124,58,237,0.07)",
            }}
          >
            <div
              style={{
                height: 2,
                borderRadius: "16px 16px 0 0",
                background:
                  "linear-gradient(90deg, transparent 0%, #7c3aed 25%, #a78bfa 50%, #6366f1 75%, transparent 100%)",
                opacity: 0.7,
              }}
            />

            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#a78bfa",
                    display: "inline-block",
                    animation: "pulse-dot 2.4s ease-in-out infinite",
                    boxShadow: "0 0 6px #a78bfa",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Outfit, sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.72)",
                    letterSpacing: "0.4px",
                  }}
                >
                  Contact
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  lineHeight: 1,
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)";
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 20px" }}
            />

            <AnimatePresence mode="wait">
              {status === "ok" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center py-10 px-6 gap-3"
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "rgba(124,58,237,0.12)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5L6.5 12L13 5" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p
                    style={{
                      fontFamily: "Outfit, sans-serif",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.45)",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Message envoyé.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={false}
                  className="px-5 pb-5 pt-4 flex flex-col gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="mail-input"
                    style={{ marginBottom: 0 }}
                  />
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Subject"
                    className="mail-input"
                    style={{ marginBottom: 0 }}
                  />

                  <div className="relative">
                    <textarea
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value.slice(0, MAX_MESSAGE))
                      }
                      required
                      rows={4}
                      placeholder="Your message..."
                      className="mail-input resize-none w-full"
                      style={{ paddingBottom: 28 }}
                    />
                    <span
                      className="absolute bottom-2.5 right-3 pointer-events-none"
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 10,
                        color:
                          message.length >= MAX_MESSAGE * 0.9
                            ? "rgba(167,139,250,0.7)"
                            : "rgba(255,255,255,0.18)",
                        letterSpacing: "0.3px",
                        transition: "color 0.2s",
                      }}
                    >
                      {message.length} / {MAX_MESSAGE}
                    </span>
                  </div>

                  {status === "error" && (
                    <p
                      style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: 12,
                        color: "rgba(248,113,113,0.75)",
                        letterSpacing: "0.3px",
                      }}
                    >
                      Échec de l'envoi. Réessaie.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      width: "100%",
                      padding: "11px 20px",
                      borderRadius: 10,
                      fontFamily: "Outfit, sans-serif",
                      fontWeight: 500,
                      fontSize: 13,
                      letterSpacing: "0.4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      opacity: status === "loading" ? 0.55 : 1,
                      transition: "opacity 0.2s, background 0.2s, box-shadow 0.2s",
                      background:
                        "linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(99,102,241,0.14) 100%)",
                      border: "1px solid rgba(124,58,237,0.38)",
                      color: "#c4b5fd",
                      marginTop: 2,
                    }}
                    onMouseEnter={(e) => {
                      if (status !== "loading") {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "linear-gradient(135deg, rgba(124,58,237,0.30) 0%, rgba(99,102,241,0.22) 100%)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          "0 0 24px rgba(124,58,237,0.18)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(99,102,241,0.14) 100%)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                    }}
                  >
                    {status === "loading" ? (
                      "Envoi..."
                    ) : (
                      <>
                        Envoyer
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 6.5H11M11 6.5L7 2.5M11 6.5L7 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
