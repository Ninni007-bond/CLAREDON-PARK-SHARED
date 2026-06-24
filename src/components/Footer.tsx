const links = [
  { label: "info@shorewoodhomes.co.uk", href: "mailto:info@shorewoodhomes.co.uk" },
  { label: "01962 678528", href: "tel:01962678528" },
  { label: "Instagram", href: "https://instagram.com/shorewoodhomes" },
  { label: "LinkedIn", href: "https://linkedin.com/company/shorewoodhomes" },
  { label: "Pinterest", href: "https://pinterest.com/shorewoodhomes" },
  { label: "YouTube", href: "https://youtube.com/@shorewoodhomes" },
];

const legal = [
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-brand-limestone border-t border-brand-blue/15 py-5">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-[13px] text-brand-blue">
          {links.map((l, i) => (
            <span key={l.label} className="flex items-center gap-2">
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity"
              >
                {l.label}
              </a>
              {i < links.length - 1 && <span className="text-brand-blue/40">/</span>}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-[13px] text-brand-blue">
          {legal.map((l) => (
            <span key={l.label} className="flex items-center gap-2">
              <a href={l.href} className="hover:opacity-60 transition-opacity">
                {l.label}
              </a>
              <span className="text-brand-blue/40">/</span>
            </span>
          ))}
          <span>© Shorewood Homes {new Date().getFullYear()}</span>
          <span className="text-brand-blue/40">/</span>
          <a
            href="https://stormmarketingstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            Built by Storm
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
