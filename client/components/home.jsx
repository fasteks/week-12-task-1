import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'

const Home = () => {
  return (
    <div>
      <Head title="Dashboard" />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center bg-neutral-900 p-10 rounded-xl select-none">
          <span className="text-white text-center font-semibold">Dashboard</span>
          <div>
            <Link to="/" style={{ color: 'white' }}>
              Go To Dummy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
