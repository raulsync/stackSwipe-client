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
    <div className="bg-white shadow-lg border border-gray-200 transition-all duration-300 w-full max-w-sm mx-auto rounded-2xl overflow-hidden hover:shadow-xl">
      {/* Image Section */}
      <figure className="relative h-64 sm:h-80 overflow-hidden">
        {!imageError ? (
          <img
            src={photoUrl}
            alt={`${firstName}'s profile`}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <User2 className="w-16 sm:w-20 h-16 sm:h-20 text-gray-400" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Age/Gender Badge */}
        {age && gender && (
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 px-3 py-1 rounded-full text-gray-900 font-semibold text-sm">
              {age}, {gender}
            </div>
          </div>
        )}
      </figure>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Name */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {firstName} {lastName}
            </h2>
          </div>

          {/* About Section */}
          {about && (
            <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              <details className="group">
                <summary className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                  <Info className="w-4 h-4 text-gray-600" />
                  <span className="text-sm sm:text-base font-medium text-gray-700">
                    About me
                  </span>
                  <div className="ml-auto transform group-open:rotate-180 transition-transform duration-200">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
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

          {/* Stats */}
          <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <span>2.4km away</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
              <span>Active 2h ago</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {_id && (
          <div className="flex justify-center mt-4 sm:mt-6 gap-6">
            <button
              className={`btn btn-circle btn-lg bg-white border-2 border-gray-300 hover:bg-red-50 hover:border-red-300 transition-all duration-200 ${
                isLoading && actionType === "ignored"
                  ? "opacity-50"
                  : "hover:scale-105"
              }`}
              onClick={() => handleSendRequest("ignored", _id)}
              disabled={isLoading}
            >
              {isLoading && actionType === "ignored" ? (
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-red-500" />
              ) : (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-red-500" />
              )}
            </button>

            <button
              className={`btn btn-circle btn-lg bg-black text-white border-none hover:bg-gray-800 transition-all duration-200 ${
                isLoading && actionType === "interested"
                  ? "opacity-50"
                  : "hover:scale-105"
              }`}
              onClick={() => handleSendRequest("interested", _id)}
              disabled={isLoading}
            >
              {isLoading && actionType === "interested" ? (
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
              ) : (
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        )}

        {/* Helper Text */}
        {_id && (
          <div className="text-center mt-3 sm:mt-4">
            <p className="text-xs text-gray-500">
              Tap <Heart className="w-3 h-3 inline" /> to like • Tap{" "}
              <X className="w-3 h-3 inline" /> to pass
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
