import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'


const theme = extendTheme({
  semanticTokens: {
    colors: {
      primary: {
        default: 'a9d1ff',
        _dark: 'red.400',
      },
      secondary: {
        default: 'white',
        _dark: 'red.700',
      },
      thirdary: {
        default: '#0075ff',
        _dark: 'red.700',
      },
    },
  },
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <div className='site-wrapper'>
      <App />
    </div>
  </ChakraProvider>, document.getElementById('root'))