import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/features/connectionSLice.js";
import {
  Users,
  User2,
  MessageCircle,
  UserMinus,
  Sparkles,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((state) => state.connection);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cosmic-200 border-t-cosmic-500 rounded-full animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-cosmic-500 animate-pulse" />
        </div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-cosmic-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-aurora-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float animation-delay-2000"></div>
        </div>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-gradient-to-r from-cosmic-400 to-nebula-400 rounded-full flex items-center justify-center mb-6 animate-glow">
            <Users className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            No Connections Yet
          </h2>
          <p className="text-gray-600 max-w-md mb-6">
            Start swiping to find and connect with amazing people around you! 🚀
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn bg-gradient-to-r from-cosmic-500 to-nebula-500 text-white border-none hover:from-cosmic-600 hover:to-nebula-600 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Start Discovering
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cosmic-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-nebula-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-4000"></div>
      </div>

      <div className="text-center mb-8 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-cosmic-500 to-nebula-500 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cosmic-600 to-nebula-600 bg-clip-text text-transparent">
            My Connections
          </h1>
        </div>
        <p className="text-gray-600">
          {connections.length}{" "}
          {connections.length === 1 ? "connection" : "connections"} and
          counting!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, about, gender, age } =
            connection;

          return (
            <div
              key={connection._id}
              className="relative group"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-400 to-nebula-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>

              <div className="relative bg-white/20 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/30 rounded-2xl overflow-hidden hover:scale-[1.02]">
                {/* Profile Image */}
                <figure className="px-6 pt-6">
                  <div className="avatar mx-auto">
                    <div className="w-24 h-24 rounded-full ring-2 ring-cosmic-300 ring-offset-2 ring-offset-white/20 group-hover:ring-cosmic-500 transition-all duration-300">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={firstName}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-cosmic-400 to-nebula-400 flex items-center justify-center">
                          <User2 className="w-12 h-12 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </figure>

                {/* Card Content */}
                <div className="card-body text-center p-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                    {firstName} {lastName}
                    <Heart className="w-4 h-4 text-cosmic-400 animate-pulse" />
                  </h2>

                  {age && gender && (
                    <div className="bg-cosmic-100 text-cosmic-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                      {age}, {gender}
                    </div>
                  )}

                  {about && (
                    <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                      {about}
                    </p>
                  )}

                  <div className="flex justify-center mt-4 gap-2">
                    <button className="btn btn-sm bg-gradient-to-r from-cosmic-400 to-nebula-400 text-white border-none hover:from-cosmic-500 hover:to-nebula-500 hover:scale-105 transition-all duration-300">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </button>
                    <button className="btn btn-sm btn-outline border-gray-300 text-gray-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                      <UserMinus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 relative z-10">
        <div className="bg-white/20 backdrop-blur-xl shadow-lg rounded-2xl border border-white/30 p-6 hover:scale-[1.02] transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cosmic-400 to-nebula-400 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-cosmic-600 to-nebula-600 bg-clip-text text-transparent">
                    {connections.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Connections</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Building meaningful relationships
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-aurora-400 to-cosmic-400 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-aurora-600 to-cosmic-600 bg-clip-text text-transparent">
                    0
                  </div>
                  <div className="text-sm text-gray-600">Active Chats</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">Start a conversation!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
