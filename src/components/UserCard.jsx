import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removeFeed } from "../store/features/feedSlice";
import { BASE_URL } from "../utils/constants";
import { User2, X, Heart, Loader2, MapPin, Clock, Info } from "lucide-react";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [actionType, setActionType] = useState("");
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    setIsLoading(true);
    setActionType(status);
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error.message);
    } finally {
      setIsLoading(false);
      setActionType("");
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-glow"></div>

      <div className="relative bg-white/20 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 w-full max-w-sm mx-auto border border-white/30 rounded-3xl overflow-hidden hover:scale-[1.02]">
        <figure className="relative h-64 sm:h-80 overflow-hidden">
          {!imageError ? (
            <img
              src={photoUrl}
              alt={`${firstName}'s profile`}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-cosmic-200 via-nebula-200 to-aurora-200 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-400/20 to-nebula-400/20 animate-shimmer"></div>
              <User2 className="w-16 sm:w-20 h-16 sm:h-20 text-cosmic-600/60 relative z-10" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {age && gender && (
            <div className="absolute top-4 right-4">
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full text-white font-semibold text-sm shadow-lg">
                {age}, {gender}
              </div>
            </div>
          )}

          <div className="absolute top-4 left-4"></div>
        </figure>

        <div className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {firstName} {lastName}
              </h2>
            </div>

            {about && (
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/30 overflow-hidden">
                <details className="group/details">
                  <summary className="flex items-center gap-2 p-3 cursor-pointer hover:bg-white/20 transition-all duration-300">
                    <Info className="w-4 h-4 text-cosmic-500" />
                    <span className="text-sm sm:text-base font-medium text-gray-700">
                      About me
                    </span>
                    <div className="ml-auto transform group-open/details:rotate-180 transition-transform duration-300">
                      ▼
                    </div>
                  </summary>
                  <div className="px-3 pb-3">
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {about}
                    </p>
                  </div>
                </details>
              </div>
            )}

            <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-cosmic-400" />
                <span>2.4km away</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-nebula-400" />
                <span>Active 2h ago</span>
              </div>
            </div>
          </div>

          {_id && (
            <div className="flex justify-center mt-4 sm:mt-6 gap-6">
              <button
                className={`btn btn-circle btn-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-red-100 hover:border-red-300 transition-all duration-300 group/btn ${
                  isLoading && actionType === "ignored"
                    ? "animate-pulse"
                    : "hover:scale-110"
                }`}
                onClick={() => handleSendRequest("ignored", _id)}
                disabled={isLoading}
              >
                {isLoading && actionType === "ignored" ? (
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-red-500" />
                ) : (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover/btn:text-red-500 transition-colors duration-300" />
                )}
              </button>

              <button
                className={`btn btn-circle btn-lg bg-gradient-to-r from-cosmic-400 to-nebula-400 text-white border-none hover:from-cosmic-500 hover:to-nebula-500 transition-all duration-300 shadow-lg hover:shadow-xl group/btn ${
                  isLoading && actionType === "interested"
                    ? "animate-pulse"
                    : "hover:scale-110"
                }`}
                onClick={() => handleSendRequest("interested", _id)}
                disabled={isLoading}
              >
                {isLoading && actionType === "interested" ? (
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                ) : (
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:scale-110 transition-transform duration-300" />
                )}
              </button>
            </div>
          )}

          {_id && (
            <div className="text-center mt-3 sm:mt-4">
              <p className="text-xs text-gray-500">
                Tap <Heart className="w-3 h-3 inline text-cosmic-400" /> to like
                • Tap <X className="w-3 h-3 inline text-gray-400" /> to pass
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
