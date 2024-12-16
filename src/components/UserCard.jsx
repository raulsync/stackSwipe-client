import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../store/features/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;

  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      console.error("error in fetching send request", error.message);
    }
  };

  return (
    <div className="card bg-base-100 w-96 h-auto shadow-xl">
      <figure className="h-64 w-full overflow-hidden">
        <img
          src={photoUrl}
          alt="user-profile"
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <p className="text-xl text-gray-400">{age + ", " + gender}</p>
        )}
        <p className="font-semibold">{about}</p>
        <div className="card-actions flex justify-center">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
