import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  MessageCircle,
  Shield,
  Zap,
  Star,
  ArrowRight,
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Smart Matching",
      description:
        "Our algorithm finds your perfect match based on compatibility and shared interests.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real Connections",
      description:
        "Connect with genuine people looking for meaningful relationships, not just casual encounters.",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Secure Messaging",
      description:
        "Chat safely with end-to-end encryption and privacy controls you can trust.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Profiles",
      description:
        "All profiles are verified to ensure authentic connections and reduce fake accounts.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Notifications",
      description:
        "Get notified immediately when someone likes you or sends you a message.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Experience",
      description:
        "Enjoy an ad-free experience with advanced features and unlimited swipes.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-black">StackSwipe</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-black transition-colors duration-200"
              >
                Features
              </a>
              <Link
                to="/login"
                className="btn bg-black text-white border-none hover:bg-gray-800 transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>

            <div className="md:hidden">
              <Link
                to="/login"
                className="btn btn-sm bg-black text-white border-none hover:bg-gray-800 transition-colors duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600 mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Over 2 million people finding love
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
              Find Your Perfect
              <br />
              <span className="relative">
                Match
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-black rounded-full"></div>
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect with amazing people who share your interests, values, and
              dreams. Start your journey to meaningful relationships today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/login"
                className="btn btn-lg bg-black text-white border-none hover:bg-gray-800 transition-all duration-200 hover:scale-105 group"
              >
                Start Swiping
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Why Choose StackSwipe?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've built the most advanced and secure platform for meaningful
              connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of people who have found love on StackSwipe. Your
            soulmate is just a swipe away.
          </p>
          <Link
            to="/login"
            className="btn btn-lg bg-white text-black border-none hover:bg-gray-100 transition-all duration-200 hover:scale-105 group"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
