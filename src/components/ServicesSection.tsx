import { Music, Mic, Users, Briefcase, Radio, Headphones } from "lucide-react";
import React from "react";

const ServicesSection = () => {
  const services = [
    {
      icon: Music,
      title: "Production Musicale",
      description: "Création de projets musicaux authentiques alliant conscience artistique et professionnalisme. Albums, EPs, singles et séries conceptuelles.",
      accent: "text-red-400",
      gradient: "from-red-500/20 to-transparent",
      iconColor: "text-red-400"
    },
    {
      icon: Mic,
      title: "Freestyles & Performances",
      description: "Sessions de freestyle et performances live qui incarnent l'essence du rap conscient. Chaque prestation est une expérience unique d'éveil musical.",
      accent: "text-green-300",
      gradient: "from-green-500/15 to-transparent",
      iconColor: "text-green-400"
    },
    {
      icon: Headphones,
      title: "Consultation Artistique",
      description: "Accompagnement d'artistes dans leur développement créatif et leur vision artistique. Guidance pour structurer et professionnaliser une carrière musicale.",
      accent: "text-emerald-300",
      gradient: "from-emerald-500/15 to-transparent",
      iconColor: "text-emerald-400"
    },
    {
      icon: Briefcase,
      title: "Stratégie Business Musical",
      description: "Conseil en stratégie entrepreneuriale pour artistes. Transformer la créativité en modèle économique viable et pérenne.",
      accent: "text-rose-400",
      gradient: "from-rose-500/15 to-transparent",
      iconColor: "text-rose-400"
    },
    {
      icon: Users,
      title: "Collaborations Artistiques",
      description: "Collaborations avec d'autres artistes pour créer des œuvres originales. Fusion d'univers créatifs au service de l'innovation musicale.",
      accent: "text-purple-400",
      gradient: "from-purple-500/15 to-transparent",
      iconColor: "text-purple-400"
    },
    {
      icon: Radio,
      title: "Conférences & Ateliers",
      description: "Interventions sur la musique consciente, l'entrepreneuriat artistique et l'éveil culturel. Partage d'expérience et transmission de savoirs.",
      accent: "text-blue-400",
      gradient: "from-blue-500/15 to-transparent",
      iconColor: "text-blue-400"
    }
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-black to-red-950/30" id="services">
      {/* Arrière-plan artistique */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-green-900/5 via-transparent to-transparent" />
      <div className="absolute top-32 right-10 w-72 h-72 bg-gradient-to-br from-green-500/10 to-red-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
      
      {/* Points stylisés décoratifs */}
      <div className="absolute top-1/3 right-1/4">
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
          <div className="absolute inset-0.5 bg-white rounded-full" />
        </div>
      </div>
      
      <div className="absolute bottom-1/3 left-1/4">
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse" />
          <div className="absolute inset-0.5 bg-red-100 rounded-full" />
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        {/* En-tête de section */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-px bg-gradient-to-r from-green-500 to-transparent" />
            <span className="font-mono text-xs tracking-[0.5em] text-gray-500 uppercase">Services</span>
          </div>
          <h2 className="font-light text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-white mb-6">
            Au-delà de la<br />
            <span className="font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-400 to-green-400">création musicale</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Une approche holistique qui combine excellence artistique, vision entrepreneuriale et impact culturel.
          </p>
        </div>

        {/* Grille de services */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className="group relative overflow-hidden p-6 lg:p-8 rounded-2xl border border-gray-800/50 hover:border-green-500/30 transition-all duration-500 bg-black/20 backdrop-blur-sm"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative space-y-4">
                {/* Icône */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>
                
                {/* Contenu */}
                <div>
                  <h3 className="text-xl font-medium text-white mb-3 group-hover:text-green-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>

                {/* Indicateur hover */}
                <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`h-px w-full bg-gradient-to-r ${service.gradient}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border border-gray-800/50 bg-black/20 backdrop-blur-sm">
            <p className="text-gray-300 text-lg">
              Intéressé par une collaboration ?
            </p>
            <a 
              href="#contact" 
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-medium rounded-lg transition-all duration-300 shadow-lg shadow-green-900/50 hover:shadow-green-800/60"
            >
              Prendre contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
