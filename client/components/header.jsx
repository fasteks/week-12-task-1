import React from 'react'

const Header = (props) => {
  return (
    <div className="flex justify-between bg-teal-600 p-5 mb-10 font-semibold text-white">
      <span id="repository-name">This is {props.user} profile</span>
      <div className="flex justify-center">
        <button
          type="button"
          id="go-back"
          className="text-white"
          onClick={() => {
            props.goBack('/')
          }}
        >
          Go To Main
        </button>
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header
