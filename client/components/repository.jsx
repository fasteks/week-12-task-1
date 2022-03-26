import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Head from './head'

const Repository = () => {
  const [info, setInfo] = useState('')
  const [userName, repositoryName] = useParams()

  useEffect(() => {
    const readMe = axios(
      `https://raw.githubusercontent.com/${userName}/${repositoryName}/master/Readme.md`
    )
    setInfo(readMe)
  }, [info])

  return (
    <div>
      <Head title="Repository" />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center bg-neutral-900 p-10 rounded-xl select-none">
          <span className="text-white text-center font-semibold">Repository</span>
          <div id="description">{info.map((it) => it)}</div>
        </div>
      </div>
    </div>
  )
}

Repository.propTypes = {}

export default Repository
