import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/features/feedSlice";
import UserCard from "./UserCard";
import { Heart, Users, Sparkles, Star } from "lucide-react";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feed);

  const feed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    feed();
  }, []);

  if (!feedData || feedData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-cosmic-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-aurora-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float animation-delay-2000"></div>
        </div>

        <div className="mb-8 relative z-10">
          <div className="w-24 h-24 bg-gradient-to-r from-cosmic-400 to-nebula-400 rounded-full flex items-center justify-center mb-6 animate-glow mx-auto">
            <Heart className="w-12 h-12 text-white animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            No New Connections
          </h2>
          <p className="text-gray-600 max-w-md">
            You've seen all available profiles! Check back later for new people
            to connect with
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cosmic-400 to-aurora-400 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold bg-gradient-to-r from-cosmic-600 to-nebula-600 bg-clip-text text-transparent">
                0
              </div>
              <div className="text-sm text-gray-600">Total Connections</div>
              <div className="text-xs text-gray-500">
                Keep swiping to grow your network!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-48 h-48 bg-cosmic-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-nebula-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-float animation-delay-3000"></div>
      </div>

      <div className="text-center mb-8 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          {/* <Star className="w-6 h-6 text-aurora-500 animate-pulse" />
          <Sparkles className="w-6 h-6 text-cosmic-500 animate-bounce" /> */}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cosmic-600 via-nebula-600 to-aurora-600 bg-clip-text text-transparent">
            Discover Amazing People
          </h1>
          {/* <Sparkles className="w-6 h-6 text-cosmic-500 animate-bounce animation-delay-200" />
          <Star className="w-6 h-6 text-aurora-500 animate-pulse animation-delay-400" /> */}
        </div>
        <p className="text-gray-600">
          Swipe through profiles and find your perfect match
        </p>
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="animate-fade-in">
          {feedData && <UserCard user={feedData[0]} />}
        </div>
      </div>
    </div>
  );
};

export default Feed;
