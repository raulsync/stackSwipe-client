import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../store/features/connectionSLice";

const Connections = () => {
  const connections = useSelector((state) => state.connection);

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
      // console.log(res?.data?.data);
    } catch (error) {
      console.error("error in fetching connections : ", error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return;
  }

  if (connections.length === 0) {
    return <h1 className="text-red-400">No Connections Found</h1>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-5 w-full mx-auto">
      <div>
        <h1 className="text-2xl text-center font-bold text-gray-300">
          Connections
        </h1>
      </div>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, about, gender, age } =
          connection;
        return (
          <div
            key={connection._id}
            className="flex justify-evenly items-center text-center gap-10 bg-base-300 w-1/3 rounded-xl p-5"
          >
            <div className="w-20 h-20 ">
              <img
                className="w-20 h-20 object-cover rounded-full"
                src={photoUrl}
                alt={firstName}
              />
            </div>
            <div>
              <h1 className="font-bold text-2xl">
                {firstName + " " + lastName}
              </h1>
              {age && gender && (
                <p className="text-gray-400">{age + ", " + gender}</p>
              )}
              <p className="text-gray-600">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
