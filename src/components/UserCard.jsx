const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
