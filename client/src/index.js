import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'
import { ChakraProvider, extendTheme, Center, Container} from '@chakra-ui/react'

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      first: {
        default: '#a9d1ff',
        _dark: 'red.400',
      },
      second: {
        default: 'white',
        _dark: 'red.700',
      },
      third: {
        default: '#0075ff',
        _dark: 'red.700',
      },
      fourth: {
        default: '#2663FF',
        _dark: 'red.700',
      },      
    },
  },
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
  <Center>
    <Container m='0' maxWidth='container.2xl' maxheight='container.2xl' padding={0} centerContent>
      <App />
    </Container>
    </Center>
  </ChakraProvider>, document.getElementById('root'))