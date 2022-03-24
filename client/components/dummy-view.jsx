import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'

const Dummy = () => {
  return (
    <div>
      <Head title="Dummy" />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center bg-neutral-900 p-10 rounded-xl select-none">
          <span className="text-white text-center font-semibold">Boilerplate</span>
          <div>
            <Link to="/dashboard" style={{ color: 'white' }}>
              Go To Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
