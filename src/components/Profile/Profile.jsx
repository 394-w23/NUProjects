import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();

  return (
    <>
      <p>UserId: {userId}</p>
    </>
  )
}

export default Profile