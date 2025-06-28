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
    <div className="card bg-base-100 shadow-2xl hover:shadow-3xl transition-all duration-300 w-full max-w-sm mx-auto border border-base-300">
      {/* Image Section */}
      <figure className="relative h-64 sm:h-80 overflow-hidden">
        {!imageError ? (
          <img
            src={photoUrl}
            alt={`${firstName}'s profile`}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <User2 className="w-16 sm:w-20 h-16 sm:h-20 text-primary/60" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Age/Gender Badge */}
        {age && gender && (
          <div className="absolute top-4 right-4">
            <div className="badge badge-primary badge-lg font-semibold">
              {age}, {gender}
            </div>
          </div>
        )}
      </figure>

      {/* Content Section */}
      <div className="card-body p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Name */}
          <div>
            <h2 className="card-title text-xl sm:text-2xl font-bold text-base-content">
              {firstName} {lastName}
            </h2>
          </div>

          {/* About Section */}
          {about && (
            <div className="collapse collapse-arrow bg-base-200 rounded-lg">
              <input
                type="checkbox"
                className="peer"
              />
              <div className="collapse-title flex items-center gap-2 text-sm sm:text-base font-medium py-2">
                <Info className="w-4 h-4" />
                About me
              </div>
              <div className="collapse-content">
                <p className="text-base-content/80 leading-relaxed text-sm sm:text-base">
                  {about}
                </p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex justify-between items-center text-xs sm:text-sm text-base-content/60">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>2.4km away</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Active 2h ago</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {_id && (
          <div className="card-actions justify-center mt-4 sm:mt-6 gap-4">
            <button
              className={`btn btn-outline btn-circle btn-lg hover:btn-error transition-all duration-200 ${
                isLoading && actionType === "ignored" ? "loading" : ""
              }`}
              onClick={() => handleSendRequest("ignored", _id)}
              disabled={isLoading}
            >
              {isLoading && actionType === "ignored" ? (
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
              ) : (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            <button
              className={`btn btn-primary btn-circle btn-lg hover:scale-110 transition-all duration-200 ${
                isLoading && actionType === "interested" ? "loading" : ""
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
            <p className="text-xs text-base-content/50">
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
