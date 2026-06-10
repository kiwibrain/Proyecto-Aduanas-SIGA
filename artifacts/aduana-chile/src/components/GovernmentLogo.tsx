export function GovernmentLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="44" height="54" viewBox="0 0 220 270" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="50" width="75" height="75" fill="#D52B1E"/>
        <rect x="105" y="50" width="75" height="75" fill="#0032A0"/>
        <rect x="30" y="125" width="150" height="75" fill="white" stroke="#8B6914" strokeWidth="3"/>
        <text x="105" y="178" fontSize="52" textAnchor="middle" fill="#D52B1E">★</text>
        <rect x="30" y="50" width="150" height="150" fill="none" stroke="#8B6914" strokeWidth="4"/>
        <ellipse cx="18" cy="80" rx="14" ry="20" fill="#555" opacity="0.7"/>
        <ellipse cx="192" cy="80" rx="14" ry="20" fill="#555" opacity="0.7"/>
        <path d="M40 220 Q20 200 50 195 Q35 212 55 210" fill="#2E7D32"/>
        <path d="M55 228 Q30 210 58 204 Q45 220 65 218" fill="#388E3C"/>
        <path d="M180 220 Q200 200 170 195 Q185 212 165 210" fill="#2E7D32"/>
        <path d="M165 228 Q190 210 162 204 Q175 220 155 218" fill="#388E3C"/>
        <rect x="60" y="235" width="100" height="3" fill="#8B6914"/>
        <text x="105" y="252" fontSize="10" textAnchor="middle" fill="#8B6914" fontFamily="serif">POR LA RAZÓN O LA FUERZA</text>
      </svg>
      <div className="flex flex-col leading-tight">
        <span style={{fontSize: '1.05rem', fontWeight: '700', color: '#1a1a1a', lineHeight: 1.2}}>Gobierno de Chile</span>
        <span style={{fontSize: '0.65rem', color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase'}}>República de Chile</span>
      </div>
    </div>
  );
}