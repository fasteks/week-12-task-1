import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import Head from './head'

const Profile = (props) => {
  const [repoList, setRepoList] = useState([])
  const { userName } = useParams()

  useEffect(async () => {
    const { data: repositories } = await axios(`https://api.github.com/users/${userName}/repos`)
    setRepoList(repositories)
    return () => {}
  }, [userName])

  return (
    <div>
      <Head title="Profile" />
      <div className="flex justify-center items-center content-center h-screen">
        <div className="flex flex-col justify-center bg-neutral-900 p-10 rounded-xl select-none">
          <span className="mb-3 text-white text-center font-semibold">
            This is {userName} profile
          </span>
          <div className="mb-3 text-lime-500 font-medium border-lime-400 border-2 rounded-md">
            {repoList.map((it) => {
              return (
                <Link key={it.name} className="flex justify-center m-5px">
                  {it.name}
                </Link>
              )
            })}
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="text-white"
              onClick={() => {
                props.onChange('/')
              }}
            >
              Go To Main
            </button>
            {/* <Link to="/" style={{ color: 'white' }}>
              Go To Main
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {}

export default Profile
