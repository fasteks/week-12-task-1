import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Head from './head'

const Profile = () => {
  const { userName } = useParams()
  return (
    <div>
      <Head title="Profile" />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center bg-neutral-900 p-10 rounded-xl select-none">
          <span className="text-white text-center font-semibold">This is {userName} profile</span>
          <div>
            <Link to="/" style={{ color: 'white' }}>
              Go To Main
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {}

export default Profile
