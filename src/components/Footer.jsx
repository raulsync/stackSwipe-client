import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-gray-50 text-gray-700 border-t border-gray-200 p-8 fixed bottom-0 w-full">
      <aside className="flex flex-row sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-black" />
          <span className="font-bold text-lg text-black">StackSwipe</span>
        </div>
        <p className="text-sm text-gray-600">
          Bringing hearts together since 2024
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
