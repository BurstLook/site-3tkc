import { useState, useEffect, useRef } from "react";
import logo3tkc from "./assets/logo-3tkc.png";
import bgEtiquetas from "./assets/bg-etiquetas.png";

/* ── Scroll Reveal ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || "0";
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0) scale(1)";
            }, Number(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ── Chatbot replies ── */
function getBotReply(text) {
  const t = text.toLowerCase().trim();

  if (t.match(/end|fica|localiz|onde|bairro|rua|av/))
    return "Estamos na Rua Abelardo, nº 45 — Graças, Recife/PE. CEP 52.050-310. 📍";
  if (t.match(/hor|funciona|abre|fecha|turno/))
    return "Atendemos em horário comercial. Para contato imediato, use nosso WhatsApp! 🕐";
  if (t.match(/etiquet|label|impressora|rolo|carne|aliment|refriger/))
    return "Nosso sistema de etiquetas inclui etiquetas à prova d'água, impressoras Elgin e suporte completo para alimentos e refrigerados. 🏷️";
  if (t.match(/certificado|digital|a1|a3/))
    return "Emitimos Certificados Digitais tipo A1 e A3 com emissão 100% online e sem burocracia. 🔐";
  if (t.match(/manut|conserto|reparo|assist|notebook|computador/))
    return "Fazemos manutenção preventiva e corretiva de computadores e notebooks. Atendimento remoto e presencial. 🔧";
  if (t.match(/rede|router|switch|wifi|internet/))
    return "Instalamos e configuramos redes corporativas e residenciais com equipamentos de qualidade. 🌐";
  if (t.match(/câmera|cftv|alarm|seguran|monitoramento/))
    return "Trabalhamos com câmeras de vigilância, sistemas de alarme, sensores de presença, fumaça e umidade. 📷";
  if (t.match(/software|sistema|gestão|erp|pdv|restaurante|salão|clínica/))
    return "Fornecemos Sistemas de Gestão Comercial para restaurantes, salões de beleza, clínicas, pet shops e mais. 💻";
  if (t.match(/valor|preco|preço|quanto|custa|orc|orça/))
    return "Para orçamento, entre em contato pelo WhatsApp (81) 99816-7453 ou pelo formulário do site. 💬";
  if (t.match(/phone|telefone|contato|falar|ligar|whatsapp|zap/))
    return "Comercial e Suporte: (81) 99816-7453 | Financeiro: (81) 3127-6897. 📱";
  if (t.match(/oi|olá|ola|bom dia|boa tarde|boa noite|hey|hello/))
    return "Olá! Seja bem-vindo(a) à 3TKC Informática 💻 Como posso ajudar? Temos etiquetas, certificados digitais, manutenção, redes e muito mais!";
  if (t.match(/obrigad|thanks|valeu/))
    return "Por nada! Quando precisar, é só chamar. Estamos à disposição. 😊";

  return "Posso ajudar com etiquetas, certificados digitais, manutenção, redes, câmeras, sistemas de gestão e orçamentos. 💬";
}

/* ── Icons ── */
const Ico = {
  Monitor: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Tag: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  Shield: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Wifi: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </svg>
  ),
  Wrench: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a4 4 0 0 0 5 5l-8.4 8.4a2 2 0 1 1-2.8-2.8l8.4-8.4a4 4 0 0 0-5-5l3-3 2.8 2.8z" />
    </svg>
  ),
  Database: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Camera: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  MapPin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" />
    </svg>
  ),
  Mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Send: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Message: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  X: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ArrowRight: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Check: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ChevRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Star: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Zap: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Cpu: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Package: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
};

/* ── WhatsApp ── */
const PHONE_WA = "5581998167453";
const WA_LINK = (msg = "Olá! Gostaria de um orçamento com a 3TKC Informática.") =>
  `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(msg)}`;

/* ── Brand Logo ── */
const BrandLogo = ({ size = 44 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      overflow: "hidden",
      flexShrink: 0,
      background: "#1a3fcc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src={logo3tkc}
      alt="3TKC"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
);

/* ── WhatsApp icon branco sem fundo ── */
const WhatsAppIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    style={{ display: "block", flexShrink: 0 }}
  >
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.47 0 .12 5.35.12 11.94c0 2.1.55 4.15 1.6 5.95L0 24l6.28-1.65a11.9 11.9 0 0 0 5.78 1.47h.01c6.58 0 11.93-5.35 11.93-11.94 0-3.19-1.24-6.19-3.48-8.4ZM12.07 21.8h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.52-5.24c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.13 1.03 7 2.9a9.85 9.85 0 0 1 2.9 7c0 5.47-4.45 9.92-9.93 9.92Zm5.44-7.42c-.3-.15-1.76-.87-2.04-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.49 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.7.3 1.25.48 1.68.61.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
  </svg>
);

/* ── Chatbot ── */
function Chatbot({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Olá! Bem-vindo(a) à 3TKC Informática 💻\nComo posso ajudar você hoje?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const send = (text) => {
    if (!text.trim() || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { type: "user", text: text.trim() }]);
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text: getBotReply(text) }]);
      setLoading(false);
    }, 600);
  };

  const quickReplies = [
    "Sistema de etiquetas",
    "Certificado Digital",
    "Manutenção de PC",
    "Onde ficam?",
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 60,
          background: "#1a3fcc",
          color: "#fff",
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "3px solid #fff",
          boxShadow: "0 4px 24px rgba(26,63,204,0.5)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {Ico.Message}
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 60,
        width: 340,
        maxWidth: "calc(100vw - 24px)",
        height: 500,
        maxHeight: "calc(100vh - 48px)",
        borderRadius: 20,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg,#1a3fcc,#0b2494)",
          color: "#fff",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BrandLogo size={38} />
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>Assistente 3TKC</p>
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.7)",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  background: "#4ade80",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              ></span>
              Online agora
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}
        >
          {Ico.X}
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          background: "#f8fafc",
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.type === "user" ? "flex-end" : "flex-start" }}>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 16,
                maxWidth: "82%",
                fontSize: 13,
                lineHeight: 1.5,
                whiteSpace: "pre-line",
                background: m.type === "user" ? "#1a3fcc" : "#fff",
                color: m.type === "user" ? "#fff" : "#1e293b",
                borderBottomRightRadius: m.type === "user" ? 4 : 16,
                borderBottomLeftRadius: m.type === "bot" ? 4 : 16,
                boxShadow: m.type === "bot" ? "0 1px 4px rgba(0,0,0,0.08)" : undefined,
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                background: "#fff",
                padding: "10px 14px",
                borderRadius: 16,
                borderBottomLeftRadius: 4,
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                display: "flex",
                gap: 4,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    background: "#cbd5e1",
                    borderRadius: "50%",
                    animation: "bounce 1.2s infinite",
                    animationDelay: `${i * 0.15}s`,
                    display: "inline-block",
                  }}
                ></span>
              ))}
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {messages.length <= 2 && (
        <div
          style={{
            padding: "8px 12px",
            background: "#fff",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {quickReplies.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              style={{
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                color: "#1e40af",
                fontSize: 11,
                padding: "5px 10px",
                borderRadius: 50,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          padding: 12,
          background: "#fff",
          borderTop: "1px solid #f1f5f9",
          display: "flex",
          gap: 8,
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Digite sua pergunta..."
          style={{
            flex: 1,
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: 50,
            padding: "8px 14px",
            fontSize: 13,
            outline: "none",
          }}
        />

        <button
          onClick={() => send(input)}
          disabled={!input.trim() || loading}
          style={{
            background: "#1a3fcc",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            opacity: input.trim() ? 1 : 0.4,
          }}
        >
          {Ico.Send}
        </button>
      </div>
    </div>
  );
}

/* ── Main App ── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    servico: "Sistema de Etiquetas",
    mensagem: "",
  });
  const [sent, setSent] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useScrollReveal();

  const validateForm = () => {
    const errors = {};
    if (!form.nome || form.nome.trim().length < 10)
      errors.nome = "Nome deve ter pelo menos 10 caracteres.";
    if (!form.telefone || form.telefone.trim().length < 10)
      errors.telefone = "WhatsApp deve ter pelo menos 10 caracteres.";
    if (!form.mensagem || form.mensagem.trim().length < 10)
      errors.mensagem = "Mensagem deve ter pelo menos 10 caracteres.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    const msg = `Olá! Me chamo ${form.nome}. Interesse em: ${form.servico}. WhatsApp: ${form.telefone}. ${form.mensagem}`;

    try {
      window.open(WA_LINK(msg), "_blank");
    } catch {
      window.location.href = WA_LINK(msg);
    }

    setSent(true);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    ["inicio", "Início"],
    ["sobre", "Quem Somos"],
    ["etiquetas", "Etiquetas"],
    ["servicos", "Serviços"],
    ["contato", "Contato"],
  ];

  const services = [
    {
      icon: Ico.Tag,
      title: "Sistemas de Etiquetas",
      desc: "Etiquetas à prova d'água, impressoras Elgin e soluções completas para estoque, alimentos e refrigerados.",
      highlight: true,
    },
    {
      icon: Ico.Shield,
      title: "Certificado Digital",
      desc: "Emissão A1 e A3 rápida e 100% online. Segurança, praticidade e validade jurídica para você e sua empresa.",
    },
    {
      icon: Ico.Wrench,
      title: "Manutenção de PCs",
      desc: "Diagnóstico, reparo e upgrade de computadores e notebooks. Atendimento remoto e presencial.",
    },
    {
      icon: Ico.Wifi,
      title: "Redes e Conectividade",
      desc: "Instalação e suporte para redes corporativas e residenciais com equipamentos de qualidade.",
    },
    {
      icon: Ico.Camera,
      title: "Segurança Eletrônica",
      desc: "Câmeras CFTV, alarmes e sensores de presença, fumaça e umidade para proteção total.",
    },
    {
      icon: Ico.Database,
      title: "Sistemas de Gestão",
      desc: "ERP e PDV para restaurantes, salões de beleza, clínicas, pet shops e comércios em geral.",
    },
  ];

  const diferenciais = [
    {
      icon: Ico.Zap,
      title: "Agilidade no Atendimento",
      desc: "Respostas rápidas e suporte técnico eficiente para minimizar o impacto no seu negócio.",
    },
    {
      icon: Ico.Star,
      title: "+10 Anos de Experiência",
      desc: "Atuando desde 2014 com soluções tecnológicas confiáveis para empresas e pessoas físicas.",
    },
    {
      icon: Ico.Globe,
      title: "Atendimento em Todo Brasil",
      desc: "Suporte remoto para clientes de todo o território nacional com a mesma qualidade.",
    },
    {
      icon: Ico.Check,
      title: "Soluções Personalizadas",
      desc: "Cada cliente recebe um atendimento único, com soluções adaptadas à sua realidade.",
    },
    {
      icon: Ico.Cpu,
      title: "Peças e Software Originais",
      desc: "Trabalhamos apenas com componentes e licenças de procedência garantida.",
    },
    {
      icon: Ico.Package,
      title: "Suporte Pós-Venda",
      desc: "Acompanhamos nossos clientes após a entrega para garantir pleno funcionamento.",
    },
  ];

  /* ── helper: estilo de input com erro ── */
  const inputStyle = (field) => ({
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: 12,
    border: `1px solid ${formErrors[field] ? "#f87171" : "#e2e8f0"}`,
    background: formErrors[field] ? "#fff5f5" : "#f8fafc",
    fontSize: "0.9rem",
    outline: "none",
  });

  const errorMsg = (field) =>
    formErrors[field] ? (
      <p style={{ color: "#ef4444", fontSize: "0.72rem", marginTop: 4, marginBottom: 0 }}>
        {formErrors[field]}
      </p>
    ) : null;

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: "#f0f4ff",
        color: "#1e293b",
        minHeight: "100vh",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }

        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes floatA { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
        @keyframes floatB { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,25px)} }
        @keyframes pulse2 { 0%,100%{opacity:1} 50%{opacity:0.5} }

        [data-reveal] {
          opacity: 0;
          transform: translateY(28px) scale(0.97);
          transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }

        .nav-desktop { display: none !important; }
        .btn-desktop { display: none !important; }
        .hamburger { display: flex !important; }
        .desktop-only { display: none !important; }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(26,63,204,0.15);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .service-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .highlight-badge { animation: pulse2 2.5s ease infinite; }

        .about-grid,
        .contact-grid,
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .about-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .stats-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .contact-card {
          padding: 1.5rem !important;
        }

        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .btn-desktop { display: block !important; }
          .hamburger { display: none !important; }
          .desktop-only { display: block !important; }

          .about-grid,
          .contact-grid {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
          }

          .about-cards {
            grid-template-columns: 1fr 1fr;
          }

          .contact-form-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 900px) {
          .footer-grid {
            grid-template-columns: 1.3fr 0.8fr 0.9fr;
            gap: 32px;
          }
        }

        @media (max-width: 767px) {
          .hero-title {
            font-size: 2rem !important;
          }

          .hero-subtitle {
            font-size: 1rem !important;
          }

          .hero-actions a {
            width: 100%;
            justify-content: center;
          }

          .stats-grid > div {
            width: calc(50% - 8px);
            min-width: 140px;
          }

          .contact-card {
            border-radius: 18px !important;
          }

          .chat-mobile-fix {
            right: 12px !important;
            bottom: 12px !important;
          }
        }
      `}</style>

      {/* NAV */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled || menuOpen ? "#fff" : "rgba(5,18,70,0.6)",
          backdropFilter: "blur(10px)",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.1)" : "none",
          transition: "all 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            padding: scrolled ? "0.75rem 1.5rem" : "1.2rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMenuOpen(false);
            }}
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", minWidth: 0 }}
          >
            <BrandLogo size={44} />
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: scrolled || menuOpen ? "#0b1f6e" : "#fff",
                  lineHeight: 1,
                }}
              >
                3TKC
              </div>
              <div
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#4070f4",
                  textTransform: "uppercase",
                }}
              >
                Informática
              </div>
            </div>
          </a>

          <nav className="nav-desktop" style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
            {navLinks.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(id);
                }}
                style={{
                  color: scrolled ? "#1e293b" : "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            className="btn-desktop"
            onClick={() => scrollTo("contato")}
            style={{
              background: "#1a3fcc",
              color: "#fff",
              padding: "0.55rem 1.4rem",
              borderRadius: 50,
              fontWeight: 700,
              fontSize: "0.85rem",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Solicitar Orçamento
          </button>

          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              flexDirection: "column",
              gap: 5,
              marginLeft: 8,
              flexShrink: 0,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 24,
                  height: 2.5,
                  background: scrolled || menuOpen ? "#0b1f6e" : "#fff",
                  borderRadius: 2,
                  transition: "all 0.3s",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px,5px)"
                      : i === 2
                      ? "rotate(-45deg) translate(5px,-5px)"
                      : "none"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid #f1f5f9", padding: "0.5rem 1.5rem 1.5rem" }}>
            {navLinks.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(id);
                }}
                style={{
                  display: "block",
                  color: "#1e293b",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  padding: "0.8rem 0",
                  borderBottom: "1px solid #f8fafc",
                  cursor: "pointer",
                }}
              >
                {label}
              </a>
            ))}

            <button
              onClick={() => scrollTo("contato")}
              style={{
                marginTop: 12,
                width: "100%",
                background: "#1a3fcc",
                color: "#fff",
                padding: "0.9rem",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: "0.95rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Solicitar Orçamento
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="inicio"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg,#030c3a 0%,#0b2494 40%,#1a3fcc 70%,#0a2080 100%)",
          paddingTop: "7rem",
          paddingBottom: "5rem",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(100,160,255,0.08)",
            animation: "floatA 8s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            animation: "floatB 10s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            padding: "0 1.5rem",
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 48,
            width: "100%",
          }}
        >
          <div style={{ maxWidth: 700 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#93c5fd",
                fontWeight: 700,
                padding: "0.4rem 1rem",
                borderRadius: 50,
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                marginBottom: "1.5rem",
                backdropFilter: "blur(4px)",
              }}
            >
              <span
                className="highlight-badge"
                style={{ width: 7, height: 7, background: "#4ade80", borderRadius: "50%", display: "inline-block" }}
              ></span>
              TECNOLOGIA QUE TRANSFORMA SEU NEGÓCIO
            </div>

            <h1
              className="hero-title"
              style={{
                color: "#fff",
                fontSize: "clamp(2.2rem,5vw,3.6rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "1.2rem",
                letterSpacing: "-0.03em",
              }}
            >
              Soluções em TI para
              <br />
              <span style={{ color: "#60a5fa" }}>quem precisa de resultado</span>
            </h1>

            <p
              className="hero-subtitle"
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                maxWidth: 560,
                marginBottom: "2rem",
              }}
            >
              Sistemas de etiquetas, certificados digitais, manutenção, redes e muito mais. Atendendo Recife e todo o
              Brasil desde 2014.
            </p>

            <div className="hero-actions">
              <a
                href="#etiquetas"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("etiquetas");
                }}
                style={{
                  background: "#fff",
                  color: "#0b2494",
                  padding: "0.9rem 2rem",
                  borderRadius: 50,
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                🏷️ Ver Sistema de Etiquetas {Ico.ArrowRight}
              </a>

              <a
                href={WA_LINK()}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  padding: "0.9rem 2rem",
                  borderRadius: 50,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  backdropFilter: "blur(4px)",
                  justifyContent: "center",
                }}
              >
                <WhatsAppIcon size={20} />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="stats-grid">
            {[
              ["10+", "Anos de Mercado"],
              ["1000+", "Clientes Atendidos"],
              ["100%", "Online"],
              ["24h", "Suporte"],
            ].map(([n, l]) => (
              <div
                key={l}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "1rem 1.5rem",
                  borderRadius: 14,
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", fontWeight: 600, marginTop: 2 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" style={{ background: "#fff", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="about-grid">
            <div data-reveal="up">
              <div
                style={{
                  display: "inline-block",
                  background: "#dbeafe",
                  color: "#1a3fcc",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.35rem 1rem",
                  borderRadius: 50,
                  marginBottom: "1rem",
                }}
              >
                Quem Somos
              </div>

              <h2
                style={{
                  fontSize: "clamp(1.8rem,3vw,2.4rem)",
                  fontWeight: 900,
                  color: "#030c3a",
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                Tecnologia com propósito e <span style={{ color: "#1a3fcc" }}>compromisso real</span>
              </h2>

              <p style={{ color: "#475569", lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.95rem" }}>
                A 3TKC Informática é especializada em soluções tecnológicas para empresas e pessoas físicas. Fundada em
                2019, mas atuando desde 2014, construímos uma reputação sólida com serviços de alta qualidade em toda a
                região e no Brasil.
              </p>

              <p style={{ color: "#475569", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                Localizada em Recife/PE, nossa equipe é formada por profissionais capacitados e constantemente treinados
                para lidar com as mais diversas demandas do setor de tecnologia. Nosso diferencial está na rapidez,
                personalização e confiabilidade.
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div
                  style={{
                    background: "#eff6ff",
                    padding: "0.6rem 1.2rem",
                    borderRadius: 50,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#1a3fcc",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  CNPJ: 35.384.716/0001-14
                </div>

                <div
                  style={{
                    background: "#f0fdf4",
                    padding: "0.6rem 1.2rem",
                    borderRadius: 50,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#16a34a",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  Ativo desde 2014
                </div>
              </div>
            </div>

            <div data-reveal="up" data-delay="150" className="about-cards">
              {[
                { n: "Recife/PE", l: "Sede" },
                { n: "Todo Brasil", l: "Atendimento" },
                { n: "Seg-Sex", l: "Horário" },
                { n: "Desde 2014", l: "Experiência" },
              ].map(({ n, l }) => (
                <div
                  key={l}
                  style={{
                    background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
                    border: "1px solid #bfdbfe",
                    borderRadius: 16,
                    padding: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#0b2494", marginBottom: 4 }}>{n}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ETIQUETAS */}
      <section
        id="etiquetas"
        style={{
          background: `linear-gradient(135deg, rgba(3,12,58,0.92) 0%, rgba(11,36,148,0.86) 50%, rgba(26,63,204,0.84) 100%), url(${bgEtiquetas}) center center / cover no-repeat`,
          padding: "5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(3,12,58,0.82) 0%, rgba(11,36,148,0.58) 45%, rgba(26,63,204,0.35) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            animation: "floatA 9s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.4rem 1rem",
                borderRadius: 50,
                marginBottom: "1rem",
              }}
            >
              <span
                className="highlight-badge"
                style={{ width: 7, height: 7, background: "#facc15", borderRadius: "50%", display: "inline-block" }}
              ></span>
              Produto em Destaque
            </div>

            <h2
              style={{
                color: "#fff",
                fontSize: "clamp(2rem,4vw,2.8rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: "0.8rem",
              }}
            >
              Sistemas de Etiquetas <span style={{ color: "#facc15" }}>3TKC</span>
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.7,
                fontSize: "1rem",
              }}
            >
              Solução completa para organizar seu estoque com etiquetas que não rasgam, à prova d'água e perfeitas
              para alimentos refrigerados.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 20,
              marginBottom: 32,
            }}
          >
            {[
              {
                icon: "🏷️",
                title: "Etiquetas Resistentes",
                desc: "Não rasgam e não desgastam mesmo quando molhadas. Ideais para produtos refrigerados e ambientes úmidos.",
              },
              {
                icon: "🖨️",
                title: "Impressoras Elgin",
                desc: "Equipamentos de alta qualidade para impressão térmica de etiquetas com código de barras e QR code.",
              },
              {
                icon: "🥩",
                title: "Para Alimentos",
                desc: "Perfeitas para açougues, peixarias, laticínios e qualquer produto que exija identificação em ambientes frios.",
              },
              {
                icon: "📦",
                title: "Controle de Estoque",
                desc: "Organize seu estoque com etiquetas de validade, produto, lote e rastreabilidade total.",
              },
              {
                icon: "💧",
                title: "À Prova D'Água",
                desc: "Tecnologia que garante legibilidade mesmo em contato com água, gelo ou umidade intensa.",
              },
              {
                icon: "🔧",
                title: "Suporte Completo",
                desc: "Instalação, treinamento e suporte técnico para que sua operação nunca pare.",
              },
            ].map((item, i) => (
              <div
                key={i}
                data-reveal="up"
                data-delay={i * 80}
                className="service-card"
                style={{ background: "rgba(255,255,255,0.95)", borderRadius: 16, padding: "1.5rem", cursor: "default" }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{item.icon}</div>
                <h4 style={{ fontWeight: 800, color: "#030c3a", marginBottom: "0.4rem", fontSize: "0.95rem" }}>
                  {item.title}
                </h4>
                <p style={{ color: "#64748b", fontSize: "0.83rem", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <a
              href={WA_LINK("Olá! Tenho interesse no Sistema de Etiquetas da 3TKC. Podem me informar mais detalhes e preços?")}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#facc15",
                color: "#030c3a",
                padding: "1rem 2.5rem",
                borderRadius: 50,
                fontWeight: 800,
                fontSize: "1rem",
                textDecoration: "none",
                boxShadow: "0 4px 24px rgba(250,204,21,0.4)",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#030c3a", display: "flex", alignItems: "center" }}>
                <WhatsAppIcon size={22} />
              </span>
              Solicitar Demonstração Grátis
            </a>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" style={{ background: "#f0f4ff", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div
              style={{
                display: "inline-block",
                background: "#dbeafe",
                color: "#1a3fcc",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.35rem 1rem",
                borderRadius: 50,
                marginBottom: "1rem",
              }}
            >
              Portfólio Completo
            </div>

            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 900, color: "#030c3a", marginBottom: "0.6rem" }}>
              Produtos e Serviços 3TKC
            </h2>

            <p style={{ color: "#64748b", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              Tudo que sua empresa precisa em tecnologia em um só lugar.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
            {services.map((s, i) => (
              <div
                key={i}
                data-reveal="up"
                data-delay={i * 80}
                className="service-card"
                style={{
                  background: s.highlight ? "linear-gradient(135deg,#030c3a,#0b2494)" : "#fff",
                  borderRadius: 20,
                  padding: "2rem",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                  border: s.highlight ? "none" : "1px solid #e2e8f0",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {s.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "#facc15",
                      color: "#030c3a",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      padding: "3px 10px",
                      borderRadius: 50,
                    }}
                  >
                    PRINCIPAL
                  </div>
                )}

                <div
                  style={{
                    background: s.highlight ? "rgba(255,255,255,0.12)" : "#dbeafe",
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: s.highlight ? "#fff" : "#1a3fcc",
                    marginBottom: "1.2rem",
                  }}
                >
                  {s.icon}
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: s.highlight ? "#fff" : "#030c3a", marginBottom: "0.5rem" }}>
                  {s.title}
                </h3>

                <p
                  style={{
                    color: s.highlight ? "rgba(255,255,255,0.75)" : "#64748b",
                    fontSize: "0.86rem",
                    lineHeight: 1.7,
                    marginBottom: "1rem",
                  }}
                >
                  {s.desc}
                </p>

                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("contato");
                  }}
                  style={{
                    color: s.highlight ? "#facc15" : "#1a3fcc",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    textDecoration: "none",
                  }}
                >
                  Solicitar {Ico.ChevRight}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section style={{ background: "#fff", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 900, color: "#030c3a", marginBottom: "0.6rem" }}>
              Por que escolher a <span style={{ color: "#1a3fcc" }}>3TKC</span>?
            </h2>

            <p style={{ color: "#64748b", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              Compromisso com excelência, rapidez e atendimento humanizado em cada serviço.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
            {diferenciais.map((d, i) => (
              <div
                key={i}
                data-reveal="up"
                data-delay={i * 80}
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 16,
                  padding: "1.5rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#93c5fd";
                  e.currentTarget.style.background = "#eff6ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.background = "#f8fafc";
                }}
              >
                <div style={{ background: "#dbeafe", padding: 10, borderRadius: 12, flexShrink: 0, color: "#1a3fcc" }}>
                  {d.icon}
                </div>

                <div>
                  <h4 style={{ fontWeight: 800, color: "#030c3a", fontSize: "0.93rem", marginBottom: "0.3rem" }}>{d.title}</h4>
                  <p style={{ color: "#64748b", fontSize: "0.82rem", lineHeight: 1.65, margin: 0 }}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" style={{ background: "#f0f4ff", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
        <div
          style={{ position: "absolute", top: -60, left: -60, width: 280, height: 280, background: "#dbeafe", borderRadius: "50%", opacity: 0.5, pointerEvents: "none" }}
        />
        <div
          style={{ position: "absolute", bottom: -60, right: -60, width: 320, height: 320, background: "#bfdbfe", borderRadius: "50%", opacity: 0.3, pointerEvents: "none" }}
        />

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
          <div
            className="contact-grid contact-card"
            style={{
              background: "#fff",
              borderRadius: 24,
              boxShadow: "0 8px 48px rgba(0,0,0,0.1)",
              padding: "3rem",
              border: "1px solid #e2e8f0",
            }}
          >
            <div>
              <span
                style={{
                  background: "#dbeafe",
                  color: "#1a3fcc",
                  fontWeight: 700,
                  padding: "0.35rem 1rem",
                  borderRadius: 50,
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "inline-block",
                  marginBottom: "1.2rem",
                }}
              >
                Fale Conosco
              </span>

              <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#030c3a", marginBottom: "0.8rem", lineHeight: 1.2 }}>
                Solicite seu orçamento com a 3TKC
              </h2>

              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Entre em contato para etiquetas, certificados digitais, manutenção, redes ou qualquer serviço de TI.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  [Ico.Phone, "Comercial / Suporte", "(81) 97910-2097"],
                  [Ico.Phone, "Financeiro", "(81) 99816-7453"],
                  [Ico.Mail, "Comercial", "atendimento@3tkcinformatica.com.br"],
                  [Ico.MapPin, "Endereço", "Rua Abelardo, nº 45 — Graças, Recife/PE"],
                ].map(([icon, label, value], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ background: "#eff6ff", padding: 10, borderRadius: "50%", color: "#1a3fcc", flexShrink: 0 }}>
                      {icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "0.7rem",
                          color: "#94a3b8",
                          fontWeight: 700,
                          margin: 0,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {label}
                      </p>
                      <p style={{ fontWeight: 700, color: "#030c3a", margin: 0, fontSize: "0.9rem" }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={WA_LINK()}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginTop: 24,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#22c55e",
                  color: "#fff",
                  padding: "0.8rem 1.8rem",
                  borderRadius: 50,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(34,197,94,0.35)",
                  justifyContent: "center",
                }}
              >
                <WhatsAppIcon size={20} />
                Chamar no WhatsApp
              </a>
            </div>

            {/* ── FORMULÁRIO ── */}
            <div>
              {sent ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    textAlign: "center",
                    gap: 16,
                    padding: "3rem 0",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      background: "#dcfce7",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#16a34a",
                    }}
                  >
                    {Ico.Check}
                  </div>
                  <h3 style={{ fontWeight: 800, color: "#030c3a", fontSize: "1.2rem", margin: 0 }}>Mensagem enviada!</h3>
                  <p style={{ color: "#64748b", fontSize: "0.88rem" }}>Você será redirecionado ao WhatsApp para finalizar.</p>
                  <button
                    onClick={() => setSent(false)}
                    style={{ background: "none", border: "none", color: "#1a3fcc", textDecoration: "underline", cursor: "pointer", fontSize: "0.875rem" }}
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                  {/* Nome */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#475569", marginBottom: 4 }}>
                      Nome *
                    </label>
                    <input
                      required
                      minLength={10}
                      value={form.nome}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, nome: e.target.value }));
                        if (formErrors.nome) setFormErrors((prev) => ({ ...prev, nome: undefined }));
                      }}
                      placeholder="Seu nome completo"
                      style={inputStyle("nome")}
                    />
                    {errorMsg("nome")}
                  </div>

                  {/* WhatsApp + Serviço */}
                  <div className="contact-form-row">
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#475569", marginBottom: 4 }}>
                        WhatsApp *
                      </label>
                      <input
                        required
                        minLength={10}
                        type="tel"
                        value={form.telefone}
                        onChange={(e) => {
                          setForm((f) => ({ ...f, telefone: e.target.value }));
                          if (formErrors.telefone) setFormErrors((prev) => ({ ...prev, telefone: undefined }));
                        }}
                        placeholder="(81) 9 0000-0000"
                        style={inputStyle("telefone")}
                      />
                      {errorMsg("telefone")}
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#475569", marginBottom: 4 }}>
                        Serviço
                      </label>
                      <select
                        value={form.servico}
                        onChange={(e) => setForm((f) => ({ ...f, servico: e.target.value }))}
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          borderRadius: 12,
                          border: "1px solid #e2e8f0",
                          background: "#f8fafc",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                      >
                        <option>Sistema de Etiquetas</option>
                        <option>Certificado Digital</option>
                        <option>Manutenção de PC</option>
                        <option>Redes</option>
                        <option>Câmeras/Segurança</option>
                        <option>Sistema de Gestão</option>
                        <option>Consultoria em TI</option>
                      </select>
                    </div>
                  </div>

                  {/* Mensagem — agora obrigatória, mínimo 10 caracteres */}
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#475569", marginBottom: 4 }}>
                      Mensagem *
                      <span style={{ fontWeight: 400, color: "#94a3b8", marginLeft: 6 }}>
                        ({form.mensagem.trim().length}/10 mín.)
                      </span>
                    </label>
                    <textarea
                      required
                      minLength={10}
                      rows={3}
                      value={form.mensagem}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, mensagem: e.target.value }));
                        if (formErrors.mensagem) setFormErrors((prev) => ({ ...prev, mensagem: undefined }));
                      }}
                      placeholder="Descreva rapidamente o que você precisa (mín. 10 caracteres)"
                      style={{
                        ...inputStyle("mensagem"),
                        resize: "none",
                      }}
                    />
                    {errorMsg("mensagem")}
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: "#1a3fcc",
                      color: "#fff",
                      fontWeight: 700,
                      padding: "0.9rem",
                      borderRadius: 12,
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.95rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      boxShadow: "0 4px 16px rgba(26,63,204,0.35)",
                    }}
                  >
                    Solicitar Atendimento {Ico.Send}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#030c3a", color: "#94a3b8", padding: "3rem 0 1.5rem" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="footer-grid" style={{ marginBottom: 32 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <BrandLogo size={40} />
                <div>
                  <div style={{ color: "#fff", fontWeight: 900, fontSize: "1rem", lineHeight: 1 }}>3TKC</div>
                  <div style={{ color: "#4070f4", fontWeight: 700, fontSize: "0.6rem", letterSpacing: "0.12em" }}>
                    INFORMÁTICA
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 320, marginBottom: 16 }}>
                Tecnologia que transforma o seu negócio. Soluções em TI para empresas e pessoas físicas em todo o Brasil.
              </p>

              <div style={{ display: "flex", gap: 8 }}>
                <a
                  href="https://instagram.com/3tkcinformatica"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#0f172a",
                    border: "1px solid #1e293b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </a>

                <a
                  href={WA_LINK()}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#0f172a",
                    border: "1px solid #1e293b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  <WhatsAppIcon size={16} />
                </a>
              </div>
            </div>

            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", marginBottom: 12 }}>Navegação</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {navLinks.map(([id, label]) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(id);
                      }}
                      style={{ color: "#64748b", textDecoration: "none", fontSize: "0.85rem", cursor: "pointer" }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", marginBottom: 12 }}>Contato</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                <li style={{ display: "flex", gap: 8, fontSize: "0.82rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#4070f4", marginTop: 2 }}>{Ico.Phone}</span>
                  <span>
                    Suporte: (81) 97910-2097
                    <br />
                    Financeiro: (81) 99816-7453
                  </span>
                </li>
                <li style={{ display: "flex", gap: 8, fontSize: "0.82rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#4070f4", marginTop: 2 }}>{Ico.MapPin}</span>
                  <span>
                    Rua Abelardo, nº 45
                    <br />
                    Graças, Recife — PE
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div
            style={{
              paddingTop: "1.5rem",
              borderTop: "1px solid #0f172a",
              textAlign: "center",
              fontSize: "0.78rem",
              color: "#334155",
            }}
          >
            © 2025 3TKC Informática — CNPJ: 35.384.716/0001-14 — Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <Chatbot isOpen={chatOpen} setIsOpen={setChatOpen} />
    </div>
  );
}