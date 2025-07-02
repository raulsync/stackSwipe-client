import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../store/features/requestSlice";
import { Bell, User2, Check, X, Heart, Loader2 } from "lucide-react";

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Bell className="w-12 h-12 text-gray-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          No Connection Requests
        </h2>
        <p className="text-gray-600 max-w-md">
          When people send you connection requests, they'll appear here. Keep
          being awesome
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <Bell className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Connection Requests
          </h1>
        </div>
        <p className="text-gray-600">
          {requests.length}{" "}
          {requests.length === 1 ? "person wants" : "people want"} to connect
          with you
        </p>
      </div>

      {/* Requests List */}
      <div className="space-y-6 animate-slide-up">
        {requests?.map((request) => {
          const { firstName, lastName, photoUrl, about, gender, age } =
            request.fromUserId;
          const isLoading = loadingStates[request._id];

          return (
            <div
              key={request._id}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Profile Image */}
                  <div className="avatar">
                    <div className="w-20 h-20 rounded-full ring-2 ring-gray-200 ring-offset-2 ring-offset-white">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={firstName}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <User2 className="w-10 h-10 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-gray-900">
                      {firstName} {lastName}
                    </h3>
                    {age && gender && (
                      <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium inline-block mt-1">
                        {age}, {gender}
                      </div>
                    )}
                    {about && (
                      <p className="text-gray-600 mt-2 line-clamp-2">{about}</p>
                    )}
                    <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-sm text-gray-500">
                      <Heart className="w-4 h-4 text-gray-400" />
                      <span>Wants to connect with you</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      className={`btn btn-outline border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-200 ${
                        isLoading === "rejected" ? "opacity-50" : ""
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
                      className={`btn bg-black text-white border-none hover:bg-gray-800 transition-colors duration-200 ${
                        isLoading === "accepted" ? "opacity-50" : ""
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
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
