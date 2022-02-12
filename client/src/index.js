import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.scss'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.render(
  <ChakraProvider>
  <App />
  </ChakraProvider>, document.getElementById('root'))