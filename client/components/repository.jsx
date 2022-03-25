import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'

const Repository = () => {
  return (
    <div>
      <Head title="Repository" />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center bg-neutral-900 p-10 rounded-xl select-none">
          <span className="text-white text-center font-semibold">Repository</span>
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

Repository.propTypes = {}

export default Repository
