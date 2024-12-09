const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={photoUrl}
            alt="user-profile"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions">
            <button className="btn btn-primary">ignore</button>
            <button className="btn btn-secondary">interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
