import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      100: "#a9d1ff",
      // ...
      900: "#0075ff",
    },
  },
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <div className='site-wrapper'>
      <App />
    </div>
  </ChakraProvider>, document.getElementById('root'))