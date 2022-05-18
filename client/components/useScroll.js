import { useEffect, useState } from 'react'

export default () => {
  // получение данных о положении окна (ширину и высоту окна)(получить ограничивающий клиентский прямоугольник)
  // записываем все детали высоты, ширины, на сколько отскролились
  const [bodyOffset, setBodyOffset] = useState(document.body.getBoundingClientRect())

  const [scrollY, setScrollY] = useState(0)
  const [scrollX, setScrollX] = useState(0)
  const [scrollDirection, setScrollDirection] = useState('')

  const listener = () => {
    const rect = document.body.getBoundingClientRect()
    setBodyOffset(rect)
    setScrollY(-rect.top)
    setScrollX(-rect.left)
    setScrollDirection(bodyOffset.top > rect.top ? 'down' : 'up')
  }

  useEffect(() => {
    window.addEventListener('scroll', listener)
    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [bodyOffset])

  return { scrollY, scrollX, scrollDirection }
}
