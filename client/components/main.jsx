import React, { useState } from 'react'

import Head from './head'

const Main = (props) => {
  const [userName, setUserName] = useState('')
  const inputChange = (e) => {
    setUserName(e.target.value)
  }
  const url = `/${userName}`

  return (
    <div>
      <Head title="Main" />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-neutral-900 p-10 rounded-xl select-none text-white text-center font-semibold">
          <div className="p-10">This is Main</div>
          <div className="">
            <span>Enter user name: </span>
            <input
              type="text"
              id="input-field"
              value={userName}
              onChange={inputChange}
              className="text-black m-1 p-1"
            />
            <button
              type="button"
              id="search-button"
              className="m-7 m-0 p-1 box-border bg-red-500"
              onClick={() => {
                props.onChange(url)
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
