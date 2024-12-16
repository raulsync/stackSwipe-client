import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../store/features/requestSlice";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      // console.log(res?.data?.data);

      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.error("error in fetching requests", error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return <h1 className="text-center">No requests found</h1>;
  }
  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-5 w-full mx-auto">
      <div>
        <h1 className="text-2xl text-center font-bold text-gray-300">
          Connection Requests
        </h1>
      </div>
      {requests?.map((request) => {
        const { firstName, lastName, photoUrl, about, gender, age } =
          request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex justify-between items-center text-center gap-10 bg-base-300 w-1/2 rounded-xl p-5"
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
              <p className="text-gray-300">{about}</p>
            </div>
            <div className="flex gap-3">
              <button className="btn btn-active btn-primary">Accept</button>
              <button className="btn btn-active btn-secondary">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
