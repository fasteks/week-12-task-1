import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeUser, getUsersList } from '../redux/reducers/current-user'

import Head from './head'

const Main = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const inputChange = (e) => {
    setUserName(e.target.value)
    dispatch(changeUser(e.target.value))
  }
  const url = `/${userName}`

  return (
    <div>
      <Head title="Main" />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-neutral-900 p-10 rounded-xl select-none text-white text-center font-semibold">
          <div className="p-10 text-lg font-bold">This is Main </div>
          <div className="">
            <span>Enter user name: </span>
            <input
              type="text"
              id="input-field"
              value={userName}
              onChange={inputChange}
              className="text-black m-1 p-2 rounded"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  dispatch(getUsersList())
                  document.querySelector('#main-search').click()
                }
              }}
            />
            <Link
              id="main-search"
              to={url}
              className="m-7 m-0 p-2 box-border bg-red-500 rounded-full"
              onClick={() => {
                dispatch(getUsersList())
              }}
            >
              Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default Main
