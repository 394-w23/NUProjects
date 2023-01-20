import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import { getData } from '../../utilities/firebase';
import "./Profile.css";

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const response = await getData("/users/" + userId);
      setUserData(response);
    }

    fetchUserData();
  }, [])

  return (
    <>
      <div className='user-card'>
        <Image src={userData.profilePic} roundedCircle width={125}/>
        <p className='user-name'>{userData.name}</p>
        <em className='user-email'>{userData.email}</em>
      </div>
    </>
  )
}

export default Profile