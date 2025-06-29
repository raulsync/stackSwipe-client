import { Heart, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-white/10 backdrop-blur-xl text-gray-700 border-t border-white/20 p-8 fixed bottom-0 w-full">
      <aside className="flex flex-row sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2 group">
          <div className="relative">
            <Heart className="w-6 h-6 text-cosmic-500 group-hover:scale-110 transition-transform duration-300" />
            <Sparkles className="w-3 h-3 text-aurora-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-cosmic-600 to-nebula-600 bg-clip-text text-transparent">
            StackSwipe
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Bringing hearts together since 2024
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
