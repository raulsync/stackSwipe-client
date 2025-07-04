import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((state) => state.user);

  return (
    user && (
      <div className="animate-fade-in">
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
