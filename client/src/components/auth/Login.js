import React, { useState } from 'react'
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,

  InputGroup,
  InputRightElement,
  Alert

} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {

  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  })

  const [ formError, setFormError ] = useState('') // We expect only a string now

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value } //Spreading formData makes sure we maintain the data structure of formData
    setFormData(newObj)
    setFormError('') 
  }
  
  // Saves the token from handleSubmit in the localStorage
  
  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('tinyhabits-token', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formData) //Posting the data from the form
      console.log('token', data.token)
      setTokenToLocalStorage(data.token) // pass on the token to the localStorage
      navigate('/')
    } catch (err) {
      console.log('form error ->',formError)
      console.log(err.response)
      setFormError(err.response.data.message)
    }
  }

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <>
            <Box textAlign="center">
              <Heading>Login</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input onChange={handleChange} type="email" name="email" placeholder='Email' defaultValue={formData.email} />
                </FormControl>
                <FormControl isRequired mt={6}>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <InputGroup>
                    <Input onChange={handleChange} type="password" name="password" placeholder='Password' defaultValue={formData.password} />
                    <InputRightElement width="3rem">
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                {formError && <Alert status='error' mt={4}>{formError}</Alert>}
                <Button type="submit" width="full" mt={4}>Login</Button>
      
              </form>
            </Box>
          </>
      </Box>
    </Flex>
  )
}

export default Login