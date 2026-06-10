import gobLogo from "@assets/image_1781105750606.png";

export function GovernmentLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={gobLogo}
        alt="Logo Gobierno de Chile - Trabajando para usted"
        width={60}
        height={60}
        style={{ borderRadius: "50%", objectFit: "cover" }}
      />
      <div className="flex flex-col leading-tight">
        <span style={{ fontSize: "1rem", fontWeight: "700", color: "#1a1a1a", lineHeight: 1.2 }}>Gobierno de Chile</span>
        <span style={{ fontSize: "0.6rem", color: "#555", letterSpacing: "0.08em", textTransform: "uppercase" }}>Servicio Nacional de Aduanas</span>
      </div>
    </div>
  );
}