import { Button } from "@/components/ui/button";
import { Play, Music } from "lucide-react";
import heroBg from "@/assets/images/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Animated Gold Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        <div className="animate-fade-up">
          <p className="text-primary font-body text-sm md:text-base tracking-[0.3em] uppercase mb-6">
            Artiste Rap • Edéa, Cameroun
          </p>
          
          <h1 className="font-display text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none tracking-wider mb-8 text-gradient-gold drop-shadow-2xl">
            ZAMAZU
          </h1>
          
          <p className="font-body text-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            L'éveil musical de l'œuvre d'esprit — Une voix singulière du rap camerounais
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" className="group">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Écouter maintenant
            </Button>
            <Button variant="heroOutline" size="xl" className="group">
              <Music className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Découvrir la discographie
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
