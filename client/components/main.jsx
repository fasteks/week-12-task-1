import React from 'react'
// import { Link } from 'react-router-dom'
import Head from './head'

const Main = () => {
  return (
    <div>
      <Head title="Main" />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center bg-neutral-900 p-10 rounded-xl select-none">
          <span className="text-white text-center font-semibold">Main</span>
          {/* <div>
            <Link to="/dashboard" style={{ color: 'white' }}>
              Go To Dashboard
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
