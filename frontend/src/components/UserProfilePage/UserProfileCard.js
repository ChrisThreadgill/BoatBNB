function UserProfileCard({ userProfile }) {
  const profilePic = userProfile?.profilePicture;
  console.log(profilePic);
  return (
    <div>
      <div className="user__profile__card">
        {profilePic && (
          <div>
            <img src={`/api/images/${profilePic}`} className="user__profile__picture" />
          </div>
        )}
        <div className="user__profile__information">
          <h1>{userProfile && userProfile.firstName}</h1>
          <h2>{userProfile && userProfile.email}</h2>
          <h2>{userProfile && userProfile.roleId}</h2>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
