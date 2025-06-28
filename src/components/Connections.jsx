import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/features/connectionSLice.js";
import { Users, User2, MessageCircle, UserMinus } from "lucide-react";

const Connections = () => {
  const connections = useSelector((state) => state.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error("error in fetching connections : ", error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Users className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-base-content mb-2">
          No Connections Yet
        </h2>
        <p className="text-base-content/60 max-w-md mb-6">
          Start swiping to find and connect with amazing people around you!
        </p>
        <button className="btn btn-primary">Start Discovering</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-base-content">
            My Connections
          </h1>
        </div>
        <p className="text-base-content/60">
          {connections.length}{" "}
          {connections.length === 1 ? "connection" : "connections"} and
          counting!
        </p>
      </div>

      {/* Connections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, about, gender, age } =
            connection;

          return (
            <div
              key={connection._id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300"
            >
              {/* Profile Image */}
              <figure className="px-6 pt-6">
                <div className="avatar">
                  <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={firstName}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <User2 className="w-12 h-12 text-primary" />
                      </div>
                    )}
                  </div>
                </div>
              </figure>

              {/* Card Content */}
              <div className="card-body text-center">
                <h2 className="card-title justify-center text-xl">
                  {firstName} {lastName}
                </h2>

                {age && gender && (
                  <div className="badge badge-primary badge-outline">
                    {age}, {gender}
                  </div>
                )}

                {about && (
                  <p className="text-base-content/70 text-sm line-clamp-2">
                    {about}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="card-actions justify-center mt-4 gap-2">
                  <button className="btn btn-primary btn-sm">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                  <button className="btn btn-outline btn-sm">
                    <UserMinus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connection Stats */}
      <div className="mt-12">
        <div className="stats shadow-lg w-full bg-base-200">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Users className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Connections</div>
            <div className="stat-value text-primary">{connections.length}</div>
            <div className="stat-desc">Building meaningful relationships</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div className="stat-title">Active Chats</div>
            <div className="stat-value text-secondary">0</div>
            <div className="stat-desc">Start a conversation!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
