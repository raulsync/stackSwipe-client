/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/features/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feed);
  console.log(feedData);

  const feed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      // console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    feed();
  }, []);

  if (!feedData || feedData.length === 0) {
    return <h1 className="text-2xl text-center my-10">No new user found</h1>;
  }
  return (
    <div className="flex my-5 justify-center">
      {feedData && <UserCard user={feedData[0]} />}
    </div>
  );
};

export default Feed;
