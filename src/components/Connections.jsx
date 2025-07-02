import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/features/connectionSLice.js";
import { Users, User2, MessageCircle, UserMinus } from "lucide-react";
import { Link } from "react-router-dom";

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
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Users className="w-12 h-12 text-gray-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          No Connections Yet
        </h2>
        <p className="text-gray-600 max-w-md mb-6">
          Start swiping to find and connect with amazing people around you
        </p>
        <button className="btn bg-black text-white border-none hover:bg-gray-800 transition-colors duration-200">
          Start Discovering
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">My Connections</h1>
        </div>
        <p className="text-gray-600">
          {connections.length}{" "}
          {connections.length === 1 ? "connection" : "connections"} and counting
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, about, gender, age, _id } =
            connection;

          return (
            <div
              key={connection._id}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 rounded-2xl overflow-hidden"
            >
              <figure className="px-6 pt-6">
                <div className="avatar mx-auto">
                  <div className="w-24 h-24 rounded-full ring-2 ring-gray-200 ring-offset-2 ring-offset-white">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={firstName}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <User2 className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </figure>

              <div className="card-body text-center p-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {firstName} {lastName}
                </h2>

                {age && gender && (
                  <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {age}, {gender}
                  </div>
                )}

                {about && (
                  <p className="text-gray-600 text-sm line-clamp-2 mt-2">
                    {about}
                  </p>
                )}

                <div className="flex justify-center mt-4 gap-2">
                  <Link to={`/chat/${_id}`}>
                    <button className="btn btn-sm bg-black text-white border-none hover:bg-gray-800 transition-colors duration-200">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </button>
                  </Link>
                  <button className="btn btn-sm btn-outline border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors duration-200">
                    <UserMinus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
