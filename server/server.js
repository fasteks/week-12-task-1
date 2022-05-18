import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import cookieParser from 'cookie-parser'
import axios from 'axios'

import config from './config'
import Html from '../client/html'

import { sortDataArray, sortGoodsByServer } from './common/index'

const { readFile, writeFile, unlink } = require('fs').promises

require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

const getGoods = () => {
  return readFile(`${__dirname}/data/goods.json`, 'utf-8')
    .then((text) => {
      return JSON.parse(text)
    })
    .catch(async () => {
      const { data: goodsData } = await axios(
        'https://raw.githubusercontent.com/ovasylenko/skillcrcuial-ecommerce-test-data/master/data.json'
      ).catch((error) => error)
      const setNewImageSrc = goodsData.map((it) => ({
        ...it,
        image: 'https://icons.iconarchive.com/icons/fi3ur/fruitsalad/128/lime-icon.png'
      }))
      // const slicedGoodsData = setNewImageSrc.slice(0, 50)
      const slicedGoodsData = setNewImageSrc
      await writeFile(`${__dirname}/data/goods.json`, JSON.stringify(slicedGoodsData), 'utf-8')
      return slicedGoodsData
    })
}

server.get('/api/v1/goods', async (req, res) => {
  const goods = await getGoods()
  const slicedGoodsData = goods.slice(0, 50)
  res.json(slicedGoodsData)
})

server.post('/api/v1/usescroll', async (req, res) => {
  const { length } = req.body
  const goods = await getGoods()
  const newLength = length + 10
  const slicedGoodsData = goods.slice(0, newLength)
  res.json(slicedGoodsData)
})

const getRates = () => {
  return readFile(`${__dirname}/data/ratesData.json`, 'utf-8')
    .then((text) => {
      return JSON.parse(text)
    })
    .catch(async () => {
      const ratesData = await axios(
        'https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD'
      )
        .then(({ data }) => data.rates)
        .catch((error) => error)
      await writeFile(`${__dirname}/data/ratesData.json`, JSON.stringify(ratesData), 'utf-8')
      return ratesData
    })
}

server.get('/api/v1/rates', async (req, res) => {
  const rates = await getRates()
  res.json(rates)
})

server.get('/api/v1/logs', async (req, res) => {
  const logs = await readFile(`${__dirname}/data/logs.json`, 'utf-8')
    .then((logsArray) => {
      return JSON.parse(logsArray)
    })
    .catch(() => {
      return []
    })
  res.json(logs)
})

server.post('/api/v1/logs', async (req, res) => {
  const logs = await readFile(`${__dirname}/data/logs.json`, 'utf-8')
    .then(async (logsArray) => {
      const updatedLogs = [...JSON.parse(logsArray), req.body.log]
      await writeFile(`${__dirname}/data/logs.json`, JSON.stringify(updatedLogs), 'utf-8')
      return updatedLogs
    })
    .catch(async () => {
      const logObj = [req.body.log]
      await writeFile(`${__dirname}/data/logs.json`, JSON.stringify(logObj), 'utf-8')
      return logObj
    })
  res.json(logs)
})

server.delete('/api/v1/logs', async (req, res) => {
  await unlink(`${__dirname}/data/logs.json`)
  res.end()
})

server.post('/api/v1/sort', async (req, res) => {
  const { obj, by } = req.body
  const sortedProductsArray = await sortDataArray(obj, by)
  res.json(sortedProductsArray)
})

server.post('/api/v1/sortByServer', async (req, res) => {
  const goods = await getGoods()
  const { obj, by } = req.body
  const sortedGoods = await sortGoodsByServer(goods, obj, by)
  await writeFile(`${__dirname}/data/goods.json`, JSON.stringify(sortedGoods), 'utf-8')
  res.json(sortedGoods.slice(0, 50))
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
