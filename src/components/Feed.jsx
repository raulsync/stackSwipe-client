import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/features/feedSlice";
import UserCard from "./UserCard";
import { Heart, Users } from "lucide-react";

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
        <div className="mb-8 animate-fade-in">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Heart className="w-12 h-12 text-gray-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            No New Connections
          </h2>
          <p className="text-gray-600 max-w-md">
            You've seen all available profiles. Check back later for new people
            to connect with.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-left">
              <div className="text-xs text-gray-500">
                Keep swiping to grow your network
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Discover People
        </h1>
        <p className="text-gray-600">
          Swipe through profiles and find your perfect match
        </p>
      </div>

      {/* User Card */}
      <div className="w-full max-w-sm animate-slide-up">
        {feedData && <UserCard user={feedData[0]} />}
      </div>
    </div>
  );
};

export default Feed;
