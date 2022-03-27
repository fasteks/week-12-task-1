import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

import Head from './head'
import Header from './header'

const Repository = () => {
  const [info, setInfo] = useState('')
  const { userName, repositoryName } = useParams()

  useEffect(() => {
    axios(`https://raw.githubusercontent.com/${userName}/${repositoryName}/master/Readme.md`)
      .then((it) => setInfo(it.data))
      .catch(() => {
        axios(
          `https://raw.githubusercontent.com/${userName}/${repositoryName}/master/README.md`
        ).then((el) => {
          setInfo(el.data)
        })
      })
    return () => {}
  }, [userName, repositoryName])

  return (
    <div>
      <Head title="Repository" />
      <Header user={userName} repo={repositoryName} />
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center bg-neutral-700 p-10 select-none">
          <span className="text-white text-center font-semibold mb-5 text-lg">
            {repositoryName} description:
          </span>
          <div id="description" className="text-white">
            <ReactMarkdown>{info}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}

Repository.propTypes = {}

export default Repository
