import React from 'react'
import { useParams } from 'react-router-dom'

const Header = (props) => {
  const { repositoryName } = useParams()

  return (
    <div className="flex justify-between bg-teal-600 p-5 font-semibold text-white">
      <span id="repository-name">{props.user}</span>
      <div className="flex justify-center">
        {repositoryName && (
          <button
            type="button"
            id="go-repository-list"
            className="text-white"
            onClick={() => {
              props.seeRepos()
            }}
          >
            Go To Repositories List
          </button>
        )}
        <button
          type="button"
          id="go-back"
          className="text-white ml-10"
          onClick={() => {
            props.goBackwards('/')
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
