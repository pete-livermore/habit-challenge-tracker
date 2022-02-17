import React, { useState } from 'react'
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  Text

} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ImageUpload } from '../helper/ImageUpload'
import { Spinner } from '@chakra-ui/react'


const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    profilePicture: '',
  })

  const [formError, setFormError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    profilePicture: '',
  })
  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value } //Spreading formData makes sure we maintain the data structure of formData
    setFormData(newObj)

    setFormError({ ...formError, [e.target.name]: '' })
  }
  const [imageUploading, setImageUploading] = useState(false)

  // Saves the token from handleSubmit in the localStorage

  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('tinyhabits-token', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.profilePicture) {
      try {
        const { data } = await axios.post('/api/register', formData) //Posting the data from the form
        console.log('token', data.token)
        setTokenToLocalStorage(data.token) // pass on the token to the localStorage
        navigate('/login')
      } catch (err) {
        console.log('form error ->', formError)
        console.log(err.response)
        setFormError(err.response.data.message)
      }
    }
  }

  const handleImageUrl = url => {
    setFormData({ ...formData, profilePicture: url })
  }

  console.log(formData)
  return (
    <>
      <Flex width="full" align="center" justifyContent="center">
        <Box p={8} maxW="500px" minW='300px' borderWidth={1} borderRadius={8} boxShadow="lg" backgroundColor='white'>
          <>
            <Box textAlign="center">
              <Heading>Register</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
                {/* FirstName */}
                <Text fontSize='sm' fontWeight='500'>All fields below are required</Text>
                <FormControl isRequired>
                  {/* <FormLabel htmlFor='firstName' mb='1'></FormLabel> */}
                  <Input color='gray.300' onChange={handleChange} mt='2' type="firstName" name="firstName" placeholder='First name' defaultValue={formData.firstName} />
                  {formError.firstName && <Alert status='error' mt={4}>{formError.firstName}</Alert>}
                </FormControl>
                {/* LastName */}
                <FormControl isRequired>
                  {/* <FormLabel htmlFor='lastName' fontSize='sm' mt='4' mb='1'>Required</FormLabel> */}
                  <Input onChange={handleChange} type="lastName" name="lastName" placeholder='Last name' mt='4' defaultValue={formData.lastName} />
                  {formError.lastName && <Alert status='error' mt={4}>{formError.lastName}</Alert>}
                </FormControl>
                {/* Email */}
                <FormControl isRequired>
                  {/* <FormLabel htmlFor='email'>Email</FormLabel> */}
                  <Input onChange={handleChange} type="email" name="email" mt='4' placeholder='Email' defaultValue={formData.email} />
                  {formError.email && <Alert status='error' mt={4}>{formError.email}</Alert>}
                </FormControl>
                {/* Password */}
                <FormControl isRequired mt={4}>
                  {/* <FormLabel htmlFor='password'>Password</FormLabel> */}
                  <Input onChange={handleChange} type="password" name="password" placeholder='Password' defaultValue={formData.password} />
                  {formError.password && <Alert status='error' mt={4}>{formError.password}</Alert>}
                </FormControl>
                {/* Password Confirmation */}
                <FormControl isRequired mt={4}>
                  {/* <FormLabel htmlFor='passwordConfirmation'>Password Confirmation</FormLabel> */}
                  <Input onChange={handleChange} type="password" name="passwordConfirmation" placeholder='Password Confirmation' defaultValue={formData.passwordConfirmation} />
                  {formError.passwordConfirmation && <Alert status='error' mt={4}>{formError.passwordConfirmation}</Alert>}
                </FormControl>
                <FormControl mt={6}>
                  <FormLabel htmlFor='picture'>Add Profile Picture</FormLabel>
                  <ImageUpload
                    value={formData.profilePicture}
                    name='picture'
                    handleImageUrl={handleImageUrl}
                    setImageUploading={setImageUploading}
                  />
                </FormControl>
                {/* Error + Button */}
                {!imageUploading ?
                  <Button type="submit" width="full" size='lg' backgroundColor='fourth' color='white' mt={6}>Register</Button>
                  :
                  <Spinner mt='4' />
                }
              </form>
            </Box>
          </>
        </Box>
      </Flex><Box width='100%' zIndex='-1' position='absolute' top='0' left='0' bgGradient='linear(to-r, first, third)' height={{ base: '460px', md: '460x', lg: '460' }}>
      </Box>
    </>
  )
}

export default Register