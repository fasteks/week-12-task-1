import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <div className="flex justify-between bg-teal-600 p-5 font-semibold text-white">
      <span id="repository-name">{props.user}</span>
      <div className="flex justify-center">
        {props.repo && (
          <Link to={`/${props.user}`} id="go-repository-list" className="text-white">
            Go To Repositories List
          </Link>
          // <button
          //   type="button"
          //   id="go-repository-list"
          //   className="text-white"
          //   onClick={() => {
          //     props.seeRepos()
          //   }}
          // >
          //   Go To Repositories List
          // </button>
        )}
        <Link to="/" id="go-back" className="text-white ml-10">
          Go To Main
        </Link>
        {/* <button
          type="button"
          id="go-back"
          className="text-white ml-10"
          onClick={() => {
            props.goBackwards('/')
          }}
        >
          Go To Main
        </button> */}
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header
