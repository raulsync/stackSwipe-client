import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";

const Connections = () => {
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
    } catch (error) {
      console.error("error in fetching connections : ", error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex justify-center mt-10">
      <h1 className="text-2xl font-bold text-green-500">Connections</h1>
    </div>
  );
};

export default Connections;
