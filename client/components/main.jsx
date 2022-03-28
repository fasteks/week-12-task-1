// import React, { useEffect } from 'react'
import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'

import Head from './head'
import Header from './header'

// import { changeName, getUsers } from '../redux/reducers/user'

const Main = () => {
  // const dispatch = useDispatch()
  // const userName = useSelector((s) => s.user.name)
  // const usersList = useSelector((s) => s.user.list)

  // useEffect(() => {
  //   dispatch(getUsers())
  // }, [userName])

  return (
    <div>
      <Head title="Main" />
      <Header title="Main" />
      <div className="flex flex-col justify-center items-center h-full">
        {/* <p className="font-bold text-xl">Hello {userName}</p> */}
        {/* <div>
          <input
            type="text"
            className="border-4 border-yellow-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                dispatch(changeName(e.target.value))
              }
            }}
          />
        </div>
        {usersList.map((it) => {
          return <div key={it.name}>{it.name}</div>
        })} */}
      </div>
    </div>
  )
}

Main.propTypes = {}

export default Main
