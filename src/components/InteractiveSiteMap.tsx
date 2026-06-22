import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MapLocation {
  id: string;
  label: string;
  description: string;
  distance: string;
  cx: number;
  cy: number;
}

const locations: MapLocation[] = [
  { id: "clarendon", label: "Clarendon Park", description: "Your new home", distance: "", cx: 400, cy: 300 },
  { id: "winchester", label: "Winchester City Centre", description: "Historic cathedral city with fine dining & boutique shopping", distance: "3 miles", cx: 280, cy: 200 },
  { id: "cathedral", label: "Winchester Cathedral", description: "One of Europe's finest medieval cathedrals", distance: "3.5 miles", cx: 260, cy: 230 },
  { id: "station", label: "Winchester Station", description: "Direct trains to London Waterloo in ~1 hour", distance: "3 miles", cx: 300, cy: 180 },
  { id: "marwell", label: "Marwell Zoo", description: "Family days out in Hampshire's countryside", distance: "5 miles", cx: 520, cy: 420 },
  { id: "southdowns", label: "South Downs National Park", description: "Rolling chalk downland for walking & cycling", distance: "4 miles", cx: 550, cy: 250 },
  { id: "m3", label: "M3 Motorway", description: "Fast access to London & Southampton", distance: "2 miles", cx: 180, cy: 350 },
  { id: "hospital", label: "Royal Hampshire Hospital", description: "Full NHS services nearby", distance: "3 miles", cx: 240, cy: 270 },
];

const InteractiveSiteMap = () => {
  const [active, setActive] = useState<string | null>(null);
  const activeLocation = locations.find((l) => l.id === active);

  return (
    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[hsl(var(--brand-limestone))]">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background terrain */}
        <defs>
          <radialGradient id="terrain" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="hsl(48, 24%, 90%)" />
            <stop offset="100%" stopColor="hsl(48, 24%, 85%)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="800" height="500" fill="url(#terrain)" />

        {/* Subtle grid lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 62.5} x2="800" y2={i * 62.5} stroke="hsl(197, 100%, 15%)" strokeOpacity="0.04" />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 61.5} y1="0" x2={i * 61.5} y2="500" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.04" />
        ))}

        {/* Roads */}
        <path d="M 0 350 Q 200 340 400 300 Q 600 260 800 240" fill="none" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.12" strokeWidth="3" strokeDasharray="8 4" />
        <path d="M 180 0 L 180 500" fill="none" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.15" strokeWidth="4" />
        <path d="M 250 500 Q 300 300 280 200 Q 260 100 300 0" fill="none" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.1" strokeWidth="2.5" />
        <path d="M 0 200 Q 200 210 400 300 Q 500 340 600 350 L 800 380" fill="none" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.08" strokeWidth="2" />

        {/* M3 label */}
        <text x="175" y="130" fill="hsl(197, 100%, 15%)" fillOpacity="0.2" fontSize="11" fontFamily="Lato, sans-serif" fontWeight="300" textAnchor="middle">M3</text>

        {/* Green areas for South Downs */}
        <ellipse cx="550" cy="260" rx="100" ry="60" fill="hsl(140, 20%, 75%)" fillOpacity="0.3" />
        <ellipse cx="520" cy="420" rx="60" ry="35" fill="hsl(140, 25%, 70%)" fillOpacity="0.25" />

        {/* Connection lines from Clarendon to other points */}
        {locations.filter(l => l.id !== "clarendon").map((loc) => (
          <line
            key={`line-${loc.id}`}
            x1={400}
            y1={300}
            x2={loc.cx}
            y2={loc.cy}
            stroke="hsl(197, 100%, 15%)"
            strokeOpacity={active === loc.id ? 0.25 : 0.06}
            strokeWidth={active === loc.id ? 1.5 : 0.5}
            strokeDasharray="4 3"
            style={{ transition: "all 0.3s ease" }}
          />
        ))}

        {/* Location markers */}
        {locations.map((loc) => {
          const isClarendon = loc.id === "clarendon";
          const isActive = active === loc.id;
          const markerRadius = isClarendon ? 8 : 5;

          return (
            <g
              key={loc.id}
              className="cursor-pointer"
              onMouseEnter={() => setActive(loc.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === loc.id ? null : loc.id)}
            >
              {/* Pulse ring for Clarendon */}
              {isClarendon && (
                <>
                  <circle cx={loc.cx} cy={loc.cy} r="16" fill="none" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.15" strokeWidth="1">
                    <animate attributeName="r" from="10" to="24" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" from="0.2" to="0" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={loc.cx} cy={loc.cy} r="10" fill="none" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.1" strokeWidth="0.5">
                    <animate attributeName="r" from="14" to="30" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
                    <animate attributeName="stroke-opacity" from="0.15" to="0" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              {/* Hover ring */}
              <circle
                cx={loc.cx}
                cy={loc.cy}
                r={markerRadius + 6}
                fill="hsl(197, 100%, 15%)"
                fillOpacity={isActive ? 0.08 : 0}
                style={{ transition: "all 0.3s ease" }}
              />

              {/* Marker dot */}
              <circle
                cx={loc.cx}
                cy={loc.cy}
                r={isActive ? markerRadius + 1.5 : markerRadius}
                fill={isClarendon ? "hsl(197, 100%, 15%)" : "hsl(197, 100%, 15%)"}
                fillOpacity={isClarendon ? 1 : isActive ? 0.9 : 0.5}
                style={{ transition: "all 0.3s ease" }}
              />

              {/* Inner white dot */}
              {isClarendon && (
                <circle cx={loc.cx} cy={loc.cy} r="3" fill="hsl(48, 24%, 92%)" />
              )}

              {/* Label */}
              <text
                x={loc.cx}
                y={loc.cy - markerRadius - 8}
                textAnchor="middle"
                fill="hsl(197, 100%, 15%)"
                fillOpacity={isClarendon ? 0.9 : isActive ? 0.85 : 0.4}
                fontSize={isClarendon ? "12" : "10"}
                fontFamily="Lato, sans-serif"
                fontWeight={isClarendon ? "600" : "400"}
                letterSpacing="0.05em"
                style={{ transition: "all 0.3s ease" }}
              >
                {loc.label}
              </text>

              {/* Distance label */}
              {loc.distance && (
                <text
                  x={loc.cx}
                  y={loc.cy + markerRadius + 14}
                  textAnchor="middle"
                  fill="hsl(197, 100%, 15%)"
                  fillOpacity={isActive ? 0.5 : 0.2}
                  fontSize="8"
                  fontFamily="Lato, sans-serif"
                  fontWeight="300"
                  letterSpacing="0.1em"
                  style={{ transition: "all 0.3s ease" }}
                >
                  {loc.distance}
                </text>
              )}
            </g>
          );
        })}

        {/* Compass */}
        <g transform="translate(720, 60)">
          <circle cx="0" cy="0" r="18" fill="none" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.15" strokeWidth="0.5" />
          <line x1="0" y1="-14" x2="0" y2="14" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.15" strokeWidth="0.5" />
          <line x1="-14" y1="0" x2="14" y2="0" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.15" strokeWidth="0.5" />
          <text x="0" y="-22" textAnchor="middle" fill="hsl(197, 100%, 15%)" fillOpacity="0.3" fontSize="9" fontFamily="Lato, sans-serif" fontWeight="300" letterSpacing="0.15em">N</text>
          <polygon points="0,-12 -3,-4 3,-4" fill="hsl(197, 100%, 15%)" fillOpacity="0.25" />
        </g>

        {/* Scale bar */}
        <g transform="translate(40, 460)">
          <line x1="0" y1="0" x2="80" y2="0" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.2" strokeWidth="1" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.2" strokeWidth="1" />
          <line x1="80" y1="-4" x2="80" y2="4" stroke="hsl(197, 100%, 15%)" strokeOpacity="0.2" strokeWidth="1" />
          <text x="40" y="14" textAnchor="middle" fill="hsl(197, 100%, 15%)" fillOpacity="0.2" fontSize="8" fontFamily="Lato, sans-serif" fontWeight="300" letterSpacing="0.1em">approx. 5 miles</text>
        </g>
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {activeLocation && activeLocation.id !== "clarendon" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs bg-secondary/95 backdrop-blur-sm p-4 sm:p-5 border border-brand-limestone/10"
          >
            <h4 className="font-display text-sm sm:text-base font-medium text-brand-limestone mb-1 tracking-wide">
              {activeLocation.label}
            </h4>
            {activeLocation.distance && (
              <span className="font-body text-[10px] sm:text-xs text-brand-limestone/40 tracking-widest uppercase">
                {activeLocation.distance} from Clarendon Park
              </span>
            )}
            <p className="font-body text-xs sm:text-sm text-brand-limestone/60 mt-2 leading-relaxed tracking-wide">
              {activeLocation.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveSiteMap;
