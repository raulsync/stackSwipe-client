import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../store/features/userSlice";
import {
  User2,
  Save,
  Camera,
  Edit,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age: age ? parseInt(age) : null,
          gender,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error.message ||
          "Failed to save profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Edit className="w-8 h-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
            Edit Your Profile
          </h1>
        </div>
        <p className="text-base-content/60 text-sm sm:text-base">
          Make your profile shine and attract the right connections
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Profile Edit Form */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-4 sm:p-6">
            <h2 className="card-title mb-4 flex items-center gap-2">
              <User2 className="w-6 h-6" />
              Personal Information
            </h2>

            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">First Name</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered focus:input-primary transition-all duration-200"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Last Name</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered focus:input-primary transition-all duration-200"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Photo URL
                  </span>
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  className="input input-bordered focus:input-primary transition-all duration-200"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://example.com/your-photo.jpg"
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Add a URL to your profile picture
                  </span>
                </label>
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Age</span>
                  </label>
                  <input
                    type="number"
                    value={age}
                    className="input input-bordered focus:input-primary transition-all duration-200"
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="25"
                    min="18"
                    max="100"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Gender</span>
                  </label>
                  <select
                    value={gender}
                    className="select select-bordered focus:select-primary transition-all duration-200"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* About */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">About Me</span>
                </label>
                <textarea
                  value={about}
                  className="textarea textarea-bordered h-20 focus:textarea-primary transition-all duration-200"
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell others about yourself, your interests, and what you're looking for..."
                  maxLength="300"
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    {about.length}/300 characters
                  </span>
                </label>
              </div>

              {/* Error Display */}
              {error && (
                <div className="alert alert-error">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Save Button */}
              <button
                className="btn btn-primary w-full text-lg"
                onClick={saveProfile}
                disabled={isLoading || !firstName || !lastName}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold text-base-content mb-2">
              Profile Preview
            </h3>
            <p className="text-base-content/60 text-sm">
              This is how others will see your profile
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <UserCard
                user={{
                  firstName: firstName || "Your",
                  lastName: lastName || "Name",
                  photoUrl,
                  age: age ? parseInt(age) : null,
                  gender,
                  about: about || "Add a description about yourself...",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <CheckCircle className="w-5 h-5" />
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
