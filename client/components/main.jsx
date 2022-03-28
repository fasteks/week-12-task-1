import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Head from './head'
import Header from './header'

import { getGoods } from '../redux/reducers/goods'

const Main = () => {
  const dispatch = useDispatch()
  const goodsList = useSelector((s) => s.goods)

  useEffect(() => {
    dispatch(getGoods())
  }, [])

  return (
    <div>
      <Head title="Main" />
      <Header title="Main" />
      <div className="flex flex-col justify-center items-center h-full">
        {goodsList.map((it) => {
          return <div key={it.title}>{it.title}</div>
        })}
        {/* {JSON.stringify(cardsList)} */}
        {/* <p className="font-bold text-xl">Hello {userName}</p> */}
        {/* <div>
          <input
            type="text"
            className="border-4 border-yellow-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                dispatch(changeName(e.target.value))
              }
            }}
          />
        </div>
        {usersList.map((it) => {
          return <div key={it.name}>{it.name}</div>
        })} */}
      </div>
    </div>
  )
}

Main.propTypes = {}

export default Main
