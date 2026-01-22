import { Target, Lightbulb, TrendingUp } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Conscience",
      description: "Explorer la pensée et éveiller les consciences à travers la musique"
    },
    {
      icon: Target,
      title: "Authenticité",
      description: "Une démarche artistique personnelle, ancrée dans une vision unique"
    },
    {
      icon: TrendingUp,
      title: "Vision Business",
      description: "La musique comme levier économique et entrepreneurial"
    }
  ];

  return (
    <section className="py-24 bg-card relative overflow-hidden" id="about">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Bio */}
          <div className="animate-slide-in-left">
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
              Biographie
            </p>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-8 tracking-wide">
              7 ANS D'ÉVEIL<br />
              <span className="text-gradient-gold">MUSICAL</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Originaire d'<span className="text-foreground font-medium">Edéa</span>, dans la région du Littoral au Cameroun, 
                ZAMAZU s'impose progressivement comme une voix singulière du rap camerounais.
              </p>
              <p>
                Sa démarche artistique est axée sur la <span className="text-primary">conscience</span>, 
                la <span className="text-primary">réflexion</span> et l'<span className="text-primary">élévation de l'esprit</span>. 
                À travers ses textes, il explore la pensée, la vision intérieure et la capacité de la musique 
                à éveiller les consciences.
              </p>
              <p>
                Déterminé, discipliné et tourné vers l'avenir, ZAMAZU poursuit son évolution avec l'ambition 
                de marquer durablement le rap camerounais.
              </p>
            </div>
          </div>

          {/* Right Column - Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="card-elevated p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-foreground tracking-wide mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
