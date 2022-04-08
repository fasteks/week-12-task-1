import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { MARKET } from './main/main'
import { BASKET } from './basket/basket'

const Head = (props) => (
  <Helmet>
    <title>Market - {props.title === '/' ? MARKET : BASKET}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#FF0000" />
    <link
      rel="icon"
      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVQI12P4//8/AAX+Av7czFnnAAAAAElFTkSuQmCC"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  </Helmet>
)

Head.propTypes = {
  title: PropTypes.string
}

Head.defaultProps = {
  title: 'skillcrucial.com'
}

export default Head
