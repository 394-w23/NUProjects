import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Image } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();
  console.log(user)
  if (!user) {
    // redirect to main page
    console.log("no user");
    return <></>;
  }

  return (
    <>
      <div className="info-container">
        <div className="user-card">
          <Image data-cy="profile-pic" src={user.profilePic} roundedCircle width={125} alt="avatar" />
          <p data-cy="profile-name" className="user-name">{user.name}</p>
          <em data-cy="profile-email" className="user-email">{user.email}</em>
        </div>
      </div>
      {/* {user && user.userId === userData.userId ? (
        <div className="user-jobs">JOBS</div>
      ) : (
        <div />
      )} */}
    </>
  );
};

export default Profile;
