import { Music2, Mic, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";

const DiscographySection = () => {
  const projects = [
    {
      type: "Série",
      title: "SAÏ",
      count: "4 Projets",
      description: "Une série emblématique témoignant d'une constance artistique",
      icon: Disc,
      featured: true
    },
    {
      type: "Singles",
      title: "SINGLES",
      count: "3 Titres",
      description: "Des morceaux solo capturant l'essence de l'artiste",
      icon: Music2,
      featured: false
    },
    {
      type: "Freestyles",
      title: "FREESTYLES",
      count: "3 Sessions",
      description: "L'art du flow brut et authentique",
      icon: Mic,
      featured: false
    }
  ];

  return (
    <section className="py-24 bg-background relative" id="discography">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Discographie
          </p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground tracking-wide">
            LES <span className="text-gradient-gold">ŒUVRES</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className={`
                group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:scale-[1.02]
                ${project.featured 
                  ? 'border-primary/50 bg-gradient-to-br from-primary/10 to-transparent glow-gold' 
                  : 'border-border/50 bg-card hover:border-primary/30'
                }
              `}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  FEATURED
                </div>
              )}

              <div className="p-8">
                {/* Icon */}
                <div className={`
                  w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300
                  ${project.featured 
                    ? 'bg-primary/20 group-hover:bg-primary/30' 
                    : 'bg-muted group-hover:bg-primary/10'
                  }
                `}>
                  <project.icon className={`w-8 h-8 ${project.featured ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'} transition-colors`} />
                </div>

                {/* Content */}
                <p className="text-muted-foreground text-sm tracking-wider uppercase mb-2">
                  {project.type}
                </p>
                <h3 className="font-display text-4xl text-foreground tracking-wide mb-2">
                  {project.title}
                </h3>
                <p className="text-primary font-semibold mb-4">
                  {project.count}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="heroOutline" size="lg">
            Explorer toute la discographie
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiscographySection;
