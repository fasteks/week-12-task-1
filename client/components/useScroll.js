import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import debounce from 'lodash.debounce'
import { getCardsUseScroll } from '../redux/reducers/cards'

export default () => {
  const dispatch = useDispatch()
  const approximateCardHeight = 55

  const { cards } = useSelector((s) => s.cards)
  const cardsRef = useRef()
  cardsRef.current = cards

  // получение данных о положении окна (ширину и высоту окна)(получить ограничивающий клиентский прямоугольник)
  // записываем все детали высоты, ширины, на сколько отскролились
  const [bodyOffset, setBodyOffset] = useState(document.body.getBoundingClientRect())

  const [scrollY, setScrollY] = useState(0)
  const scrollYRef = useRef()
  scrollYRef.current = scrollY

  const [scrollX, setScrollX] = useState(0)

  const [scrollDirection, setScrollDirection] = useState('')
  const srollRef = useRef()
  srollRef.current = scrollDirection

  const listener = debounce(() => {
    const rect = document.body.getBoundingClientRect()
    setBodyOffset(rect)
    setScrollY(-rect.top)
    setScrollX(-rect.left)
    setScrollDirection(bodyOffset.top > rect.top ? 'down' : 'up')

    // console.log('srollRef.current', srollRef.current)
    if (
      scrollYRef.current >= cardsRef.current.length * approximateCardHeight &&
      srollRef.current === 'down'
    ) {
      // console.log('cardsRef.current.length', cardsRef.current.length)
      dispatch(getCardsUseScroll(cardsRef.current.length))
    }
  }, 800)

  useEffect(() => {
    window.addEventListener('scroll', listener)
    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [bodyOffset])

  return { scrollY, scrollX, scrollDirection }
}
