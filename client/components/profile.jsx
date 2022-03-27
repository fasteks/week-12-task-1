import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import Head from './head'
import Header from './header'

const Profile = () => {
  const [repoList, setRepoList] = useState([])
  const { userName } = useParams()

  useEffect(() => {
    axios(`https://api.github.com/users/${userName}/repos`).then((it) => setRepoList(it.data))
    return () => {}
  }, [userName])

  return (
    <div className="flex flex-col h-screen">
      <Head title="Profile" />
      <Header user={userName} />
      <div className="self-center">
        <div className="flex flex-col justify-center bg-neutral-900 p-10 mt-10 rounded-xl select-none">
          <span className="mb-5 text-white text-center font-semibold">Repositories:</span>
          <div className="mb-3 text-lime-500 font-medium border-lime-400 border-2 rounded-md">
            {repoList.map((it) => {
              return (
                <Link
                  to={`${userName}/${it.name}`}
                  key={it.name}
                  className="flex justify-center m-5"
                >
                  {it.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {}

export default Profile
