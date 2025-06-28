import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/features/feedSlice";
import UserCard from "./UserCard";
import { Heart, Users, Sparkles } from "lucide-react";

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-base-content mb-2">
            No New Connections
          </h2>
          <p className="text-base-content/60 max-w-md">
            You've seen all available profiles! Check back later for new people
            to connect with.
          </p>
        </div>

        <div className="stats shadow-lg bg-base-200">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Users className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Connections</div>
            <div className="stat-value text-primary">0</div>
            <div className="stat-desc">Keep swiping to grow your network!</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-base-content">
            Discover People
          </h1>
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <p className="text-base-content/60">
          Swipe through profiles and find your perfect match
        </p>
      </div>

      {/* User Card */}
      <div className="w-full max-w-sm">
        {feedData && <UserCard user={feedData[0]} />}
      </div>
    </div>
  );
};

export default Feed;
