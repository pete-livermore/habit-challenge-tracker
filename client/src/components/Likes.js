import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Image, Text, Alert, AlertIcon } from '@chakra-ui/react'
import { getTokenFromLocalStorage } from './helper/auth'
import likeIcon from '../assets/images/like_icon_unclicked.png'
import likeIconClicked from '../assets/images/like_icon_clicked.png'

const Likes = ({ eventId, eventData, setEventData, likeClick, setLikeClick }) => {
  const [likeOperator, setLikeOperator] = useState({ operator: 0 })
  const [hasError, setHasError] = useState('')

  // handles click of the like icon
  const handleClick = () => {
    if (!likeClick.liked) {
      setLikeClick({ liked: true })
      setLikeOperator({ operator: 1 })
    } else {
      setLikeClick({ liked: false })
      setLikeOperator({ operator: -1 })
    }
  }
  // Storing the state of the like to persist on refresh - issue is that it persists on every page fml
  useEffect(() => {
    window.localStorage.setItem('likeClick', JSON.stringify(likeClick))
  }, [likeClick])

  // Adds the like to the database
  useEffect(() => {
    const addLike = async () => {
      try {
        await axios.put(`/api/events/${eventId}/likes`, likeOperator, {
          'headers': {
            'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    addLike()
    // Refetches the event data, with a delay to allow put request to work first (will work on more robust method)
    setTimeout(() => {
      const getEventData = async () => {
        try {
          const { data } = await axios.get(`/api/events/${eventId}`)
          setEventData(data)
        } catch (err) {
          setHasError({ error: true, message: 'Server error' })
        }
      }
      getEventData()
    }, 150)
  }, [likeClick, eventId, likeOperator, setEventData])

  return (
    <>
      <Box mt='6' name='likes' display='flex' borderWidth='1px' borderRadius='lg' pl='4' pr='4' pt='2' pb='2' onClick={handleClick} style={{ cursor: 'pointer' }} >
        <Image boxSize='20px' sized='sm' mr='2' src={!likeClick.liked ? likeIcon : likeIconClicked} ></Image>
        <Text fontSize='sm' fontWeight='bold'>Likes({eventData.likes})</Text>
      </Box>
      {hasError.error &&
        <Alert status='error'>
          <AlertIcon />
          {hasError.message}
        </Alert>
      }
    </>
  )


}

export default Likes