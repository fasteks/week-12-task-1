// import React, { useState, useEffect } from 'react'
// import { Switch, Route, Link } from 'react-router-dom'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import { history } from '../redux/index'

import Main from './main'
import Profile from './profile'
import Repository from './repository'

const Home = () => {
  // const [url, setUrl] = useState('')
  // const onInputChange = (string) => {
  //   setUrl(string)
  // }

  // useEffect(() => {
  //   history.push(url)
  //   return () => { }
  // }, [url])

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/:userName" component={Profile} />
        <Route exact path="/:userName/:repositoryName" component={Repository} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default React.memo(Home)
