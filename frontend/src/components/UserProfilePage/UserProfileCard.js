function UserProfileCard({ userProfile }) {
  const profilePic = userProfile?.profilePicture;

  return (
    <div>
      <div className="user__profile__card">
        {profilePic && (
          <div className="user__profile__picture__div">
            <img src={`/api/images/${profilePic}`} className="user__profile__picture" />
          </div>
        )}
        <div className="user__profile__information">
          <h1>
            {userProfile && userProfile.firstName} {userProfile && userProfile.lastName}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
