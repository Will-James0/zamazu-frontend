import { Instagram, Youtube, Music2, Twitter, Flame, Zap, Star } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Background énergétique */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-900/10 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-900/5 to-transparent" />
      </div>

      {/* Éclats de lumière */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${i % 3 === 0 ? 'bg-red-400' : i % 3 === 1 ? 'bg-green-400' : 'bg-red-300'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${1 + Math.random() * 2}s infinite ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          
          {/* Logo avec effet de feu */}
          <div className="mb-4 relative">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-3 h-3 text-red-500 animate-pulse" />
              <Zap className="w-3 h-3 text-red-400 animate-bounce delay-100" />
              <Star className="w-3 h-3 text-green-500 animate-spin-slow delay-200" />
            </div>
            
            <h2 className="text-2xl font-bold text-center">
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-rose-600 bg-clip-text text-transparent animate-gradient">
                ZAMAZU
              </span>
            </h2>
            
            {/* Ligne énergétique */}
            <div className="h-0.5 w-12 mx-auto mt-1 bg-gradient-to-r from-red-500 via-red-400 to-green-500 rounded-full animate-pulse" />
          </div>

          {/* Socials - ÉNERGIE TOTALE */}
          <div className="flex gap-1 mb-4">
            {[
              { icon: Instagram, color: 'hover:shadow-[0_0_15px_rgba(236,72,153,0.7)]' },
              { icon: Youtube, color: 'hover:shadow-[0_0_15px_rgba(239,68,68,0.7)]' },
              { icon: Music2, color: 'hover:shadow-[0_0_15px_rgba(16,185,129,0.7)]' },
              { icon: Twitter, color: 'hover:shadow-[0_0_15px_rgba(14,165,233,0.7)]' }
            ].map((social, i) => (
              <a
                key={i}
                href="#"
                className="relative group transform transition-all duration-300 hover:scale-125 hover:rotate-6"
              >
                {/* Effet de halo */}
                <div className="absolute -inset-1 bg-current rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity" />
                
                <div className={`relative w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 group-hover:text-white ${social.color} transition-all duration-300`}>
                  <social.icon className="w-4 h-4" />
                  
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))}
          </div>

          {/* Signature finale FLAMBOYANTE */}
          <div className="text-center">
            <p className="text-[10px] tracking-widest">
              <span className="text-red-400 animate-pulse">⚡</span>
              <span className="text-gray-300 mx-1">POWERED BY</span>
              <span className="text-green-400 font-bold mx-1">PASSION</span>
              <span className="text-red-400 animate-pulse delay-300">⚡</span>
            </p>
            
            <div className="flex justify-center gap-2 mt-1">
              <div className="w-4 h-0.5 bg-gradient-to-r from-red-500 to-transparent rounded-full" />
              <p className="text-[9px] text-gray-500">© {new Date().getFullYear()}</p>
              <div className="w-4 h-0.5 bg-gradient-to-r from-transparent to-green-500 rounded-full" />
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </footer>
  );
};

export default FooterSection;