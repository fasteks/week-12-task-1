import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { history } from '../redux/index'

import Main from './main'
import Profile from './profile'
import Repository from './repository'

const Home = () => {
  const [url, setUrl] = useState('')
  const onInputChange = (string) => {
    setUrl(string)
  }

  useEffect(() => {
    history.push(url)
    return () => {}
  }, [url])

  return (
    <div>
      <Switch>
        <Route
          path="/:userName/:repositoryName"
          render={(props) => (
            <Repository {...props} onChange={onInputChange} onHistoryChange={history.goBack} />
          )}
        />
        <Route
          path="/:userName"
          render={(props) => <Profile {...props} onChange={onInputChange} />}
        />
        <Route path="/" render={(props) => <Main {...props} onChange={onInputChange} />} />
      </Switch>
    </div>
  )
}

Home.propTypes = {}

export default React.memo(Home)
