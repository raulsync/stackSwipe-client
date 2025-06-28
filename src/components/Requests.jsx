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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Bell className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-base-content mb-2">
          No Connection Requests
        </h2>
        <p className="text-base-content/60 max-w-md">
          When people send you connection requests, they'll appear here. Keep
          being awesome!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Bell className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-base-content">
            Connection Requests
          </h1>
        </div>
        <p className="text-base-content/60">
          {requests.length}{" "}
          {requests.length === 1 ? "person wants" : "people want"} to connect
          with you!
        </p>
      </div>

      {/* Requests List */}
      <div className="space-y-6">
        {requests?.map((request) => {
          const { firstName, lastName, photoUrl, about, gender, age } =
            request.fromUserId;
          const isLoading = loadingStates[request._id];

          return (
            <div
              key={request._id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300"
            >
              <div className="card-body">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Profile Image */}
                  <div className="avatar">
                    <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={firstName}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <User2 className="w-10 h-10 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-base-content">
                      {firstName} {lastName}
                    </h3>
                    {age && gender && (
                      <div className="badge badge-primary badge-outline mt-1">
                        {age}, {gender}
                      </div>
                    )}
                    {about && (
                      <p className="text-base-content/70 mt-2 line-clamp-2">
                        {about}
                      </p>
                    )}
                    <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-sm text-base-content/50">
                      <Heart className="w-4 h-4" />
                      <span>Wants to connect with you</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      className={`btn btn-outline hover:btn-error ${
                        isLoading === "rejected" ? "loading" : ""
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
                      className={`btn btn-primary ${
                        isLoading === "accepted" ? "loading" : ""
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
