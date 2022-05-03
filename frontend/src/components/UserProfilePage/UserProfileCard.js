function UserProfileCard({ user }) {
  return (
    <div>
      <div className="user__profile__card">
        <h1>{user && user.firstName}</h1>
        <h2>{user && user.email}</h2>
        <h2>{user && user.roleId}</h2>
      </div>
    </div>
  );
}

export default UserProfileCard;
