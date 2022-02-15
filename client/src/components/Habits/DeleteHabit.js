import React from 'react'
import axios from 'axios'
import { HStack, Center, Container, Box, Heading, Flex, Avatar, Text, Textarea, Badge, Image, Button } from '@chakra-ui/react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const DeleteHabit = () => {

    const params = useParams()
    const navigate = useNavigate()

const deleteHabit = async (e) => {
    e.preventDefault()
    try {
        const token = localStorage.getItem('tinyhabits-token')
  console.log(token)
      await axios.delete(`/api/events/${params.eventId}/habits/${params.habitId}`, {
        'headers': {
          'Authorization': 'Bearer ' + token
        }
        }) //Posting the data from the form
        console.log(params.userId)
      navigate(`/profile/${params.userId}`)
    } catch (err) {
      console.log(err.response)
    }
}

    return (
        <>
            <Box>
                <Text>Are you sure you want to delete this habit?</Text>
                <Box>
                <Button onClick={deleteHabit} w='20%' backgroundColor='red' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Yes</Button>
                <Link to={`/profile/${params.userId}`}>
                <Button w='20%' backgroundColor='green' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>No</Button>
                </Link>
                </Box>
            </Box>
        </>
    )
}

export default DeleteHabit