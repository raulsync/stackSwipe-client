import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/features/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || null);
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      console.log(res.data);

      dispatch(addUser(res?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center my-10 gap-6">
        {/* Profile Edit Form */}
        <div className="card bg-base-300 w-full md:w-96 shadow-xl p-6">
          <h2 className="card-title text-center mb-6">Edit Profile</h2>
          <div className="space-y-4">
            <label className="form-control w-full">
              <span className="label-text">First Name:</span>
              <input
                type="text"
                value={firstName}
                className="py-2 px-3 bg-base-100 rounded-lg outline-none w-full"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Last Name:</span>
              <input
                type="text"
                value={lastName}
                className="py-2 px-3 bg-base-100 rounded-lg outline-none w-full"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Photo URL:</span>
              <input
                type="text"
                value={photoUrl}
                className="py-2 px-3 bg-base-100 rounded-lg outline-none w-full"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Age:</span>
              <input
                type="text"
                value={age}
                className="py-2 px-3 bg-base-100 rounded-lg outline-none w-full"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Gender:</span>
              <input
                type="text"
                value={gender}
                className="py-2 px-3 bg-base-100 rounded-lg outline-none w-full"
                onChange={(e) => setGender(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">About:</span>
              <input
                type="text"
                value={about}
                className="py-2 px-3 bg-base-100 rounded-lg outline-none w-full"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="card-actions justify-center">
              <button
                className="btn btn-primary w-full"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="w-full sm:w-96">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
