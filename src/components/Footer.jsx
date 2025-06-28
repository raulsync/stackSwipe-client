import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="min-h-5 footer footer-center bg-base-200 text-base-content border-t border-base-300 p-8 fixed bottom-0 w-full">
      <aside className="flex flex-row sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg">stackSwipe</span>
        </div>
        <p className="text-sm text-base-content/70">
          Bringing hearts together since 2024
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
