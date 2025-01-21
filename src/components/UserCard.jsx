import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removeFeed } from "../store/features/feedSlice";
import { BASE_URL } from "../utils/constants";
import { User2, X, Heart, Loader2 } from "lucide-react";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    setIsLoading(true);
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
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 w-full my-20 sm:max-w-sm mx-auto">
      <figure className="relative">
        {!imageError ? (
          <img
            src={photoUrl}
            alt={`${firstName}'s profile`}
            onError={() => setImageError(true)}
            className="h-72 w-full object-cover rounded-t-lg"
          />
        ) : (
          <div className="h-72 w-full bg-base-200 flex items-center justify-center">
            <User2 className="w-16 h-16 text-base-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent rounded-t-lg"></div>
      </figure>

      <div className="card-body relative -mt-10">
        <div className="space-y-2">
          <h2 className="card-title text-2xl font-bold">
            {firstName} {lastName}
            {age && gender && (
              <div className="badge badge-primary badge-sm">
                {age}, {gender}
              </div>
            )}
          </h2>

          {about && (
            <div className="collapse collapse-arrow bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-sm font-medium">About me</div>
              <div className="collapse-content">
                <p className="text-base-content/80">{about}</p>
              </div>
            </div>
          )}
        </div>

        <div className="card-actions justify-center mt-4 gap-4">
          <button
            className={`btn btn-outline flex-1 ${isLoading ? "loading" : ""}`}
            onClick={() => handleSendRequest("ignored", _id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <X className="w-4 h-4" />
                Skip
              </>
            )}
          </button>
          <button
            className={`btn btn-primary flex-1 ${isLoading ? "loading" : ""}`}
            onClick={() => handleSendRequest("interested", _id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Heart className="w-4 h-4" />
                Like
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats stats-vertical lg:stats-horizontal shadow-sm">
        <div className="stat place-items-center">
          <div className="stat-title">Distance</div>
          <div className="stat-value text-primary text-2xl">2.4km</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Active</div>
          <div className="stat-value text-secondary text-2xl">2h ago</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
