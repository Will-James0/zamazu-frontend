import { Instagram, Youtube, Music, Twitter } from "lucide-react";

const FooterSection = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Music, href: "#", label: "Spotify" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="py-16 bg-card border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <h3 className="font-display text-4xl md:text-5xl text-gradient-gold tracking-wider mb-4">
            ZAMAZU
          </h3>
          
          <p className="text-muted-foreground mb-8 max-w-md">
            L'éveil musical de l'œuvre d'esprit
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mb-10">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-border/50 mb-8" />

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ZAMAZU. Tous droits réservés.
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            Edéa, Littoral — Cameroun
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
