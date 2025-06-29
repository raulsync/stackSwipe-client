import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../store/features/requestSlice";
import { Bell, User2, Check, X, Heart, Loader2, Sparkles } from "lucide-react";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();
  const [loadingStates, setLoadingStates] = useState({});

  const handleReviewRequest = async (status, _id) => {
    setLoadingStates((prev) => ({ ...prev, [_id]: status }));
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(
        "error occurred in review request component",
        error.message
      );
    } finally {
      setLoadingStates((prev) => {
        const newState = { ...prev };
        delete newState[_id];
        return newState;
      });
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.error("error in fetching requests", error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-cosmic-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-nebula-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-gradient-to-r from-cosmic-400 to-nebula-400 rounded-full flex items-center justify-center mb-6 animate-glow">
            <Bell className="w-12 h-12 text-white animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            No Connection Requests
          </h2>
          <p className="text-gray-600 max-w-md">
            When people send you connection requests, they'll appear here. Keep
            being awesome!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cosmic-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-aurora-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-5000"></div>
      </div>

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-cosmic-500 to-nebula-500 rounded-xl flex items-center justify-center animate-glow">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cosmic-600 to-nebula-600 bg-clip-text text-transparent">
            Connection Requests
          </h1>
          <Sparkles className="w-6 h-6 text-aurora-500 animate-pulse" />
        </div>
        <p className="text-gray-600">
          {requests.length}{" "}
          {requests.length === 1 ? "person wants" : "people want"} to connect
          with you!
        </p>
      </div>

      {/* Requests List */}
      <div className="space-y-6 relative z-10">
        {requests?.map((request) => {
          const { firstName, lastName, photoUrl, about, gender, age } =
            request.fromUserId;
          const isLoading = loadingStates[request._id];

          return (
            <div
              key={request._id}
              className="relative group"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-400 via-nebula-400 to-aurora-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>

              <div className="relative bg-white/20 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/30 rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Profile Image */}
                    <div className="avatar">
                      <div className="w-20 h-20 rounded-full ring-2 ring-cosmic-300 ring-offset-2 ring-offset-white/20 group-hover:ring-cosmic-500 transition-all duration-300">
                        {photoUrl ? (
                          <img
                            src={photoUrl}
                            alt={firstName}
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-cosmic-400 to-nebula-400 flex items-center justify-center">
                            <User2 className="w-10 h-10 text-white" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center sm:justify-start gap-2">
                        {firstName} {lastName}
                        <Sparkles className="w-4 h-4 text-cosmic-400 animate-pulse" />
                      </h3>
                      {age && gender && (
                        <div className="bg-cosmic-100 text-cosmic-700 px-3 py-1 rounded-full text-sm font-medium inline-block mt-1">
                          {age}, {gender}
                        </div>
                      )}
                      {about && (
                        <p className="text-gray-600 mt-2 line-clamp-2">
                          {about}
                        </p>
                      )}
                      <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-sm text-gray-500">
                        <Heart className="w-4 h-4 text-cosmic-400" />
                        <span>Wants to connect with you </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        className={`btn btn-outline border-red-300 text-red-600 hover:bg-red-100 hover:border-red-400 hover:scale-105 transition-all duration-300 ${
                          isLoading === "rejected" ? "animate-pulse" : ""
                        }`}
                        onClick={() =>
                          handleReviewRequest("rejected", request._id)
                        }
                        disabled={isLoading}
                      >
                        {isLoading === "rejected" ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <X className="w-5 h-5" />
                            <span className="hidden sm:inline">Decline</span>
                          </>
                        )}
                      </button>
                      <button
                        className={`btn bg-gradient-to-r from-cosmic-500 to-nebula-500 text-white border-none hover:from-cosmic-600 hover:to-nebula-600 hover:scale-105 transition-all duration-300 shadow-lg ${
                          isLoading === "accepted" ? "animate-pulse" : ""
                        }`}
                        onClick={() =>
                          handleReviewRequest("accepted", request._id)
                        }
                        disabled={isLoading}
                      >
                        {isLoading === "accepted" ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Check className="w-5 h-5" />
                            <span className="hidden sm:inline">Accept</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
