import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import { getData } from '../../utilities/firebase';
import "./Profile.css";
import { UserContext } from '../../context/UserContext';

const Profile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const { user } = useContext(UserContext)

  useEffect(() => {
    async function fetchUserData() {
      const response = await getData("/users/" + userId);
      setUserData(response);
    }

    fetchUserData();
  }, [])

  return (
    <>
      <div className='info-container'>
        <div className='user-card'>
          <Image src={userData.profilePic} roundedCircle width={125}/>
          <p className='user-name'>{userData.name}</p>
          <em className='user-email'>{userData.email}</em>
        </div>
      </div>
      {user && user.userId === userData.userId ?
        <div className='user-jobs'>
          JOBS
        </div> 
        :
        <div />
      }
    </>
  )
}

export default Profile