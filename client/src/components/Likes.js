import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Image, Text, Alert, AlertIcon } from '@chakra-ui/react'
import { getTokenFromLocalStorage } from './helper/auth'
import likeIcon from '../assets/images/like_icon_unclicked.png'
import likeIconClicked from '../assets/images/like_icon_clicked.png'

const Likes = ({ eventId, profileData }) => {
  const [hasError, setHasError] = useState('')
  const [eventLikesData, setEventsLikesData] = useState([])
  const persistedState = JSON.parse(localStorage.getItem('likeClickState'))
  const [likeClick, setLikeClick] = useState({})

  useEffect(() => {
    let likeBoolean
    if (eventLikesData.some(like => like.event === eventId)) {
      likeBoolean = true
    } else {
      likeBoolean = false
    }
    setLikeClick({ liked: likeBoolean })
    // console.log(eventLikesData)
  }, [eventLikesData, eventId])

  useEffect(() => {
    const getEventLikesData = async () => {
      try {
        const { data } = await axios.get(`/api/events/${eventId}/likes`)
        setEventsLikesData(data)
      } catch (err) {
        setHasError({ error: true, message: 'Server error' })
      }
    }
    getEventLikesData()
  }, [likeClick, eventId])

  // handles click of the like icon
  const handleClick = () => {
    const toggleLike = async () => {
      try {
        await axios.post(`/api/events/${eventId}/likes`, { string: '' }, {
          'headers': {
            'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
          },
        })
        if (!likeClick.liked) setLikeClick({ liked: true })
        else setLikeClick(false)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    toggleLike()
  }

  useEffect(() => {
    localStorage.setItem('likeClickState', JSON.stringify(likeClick))
  }, [likeClick])


  return (
    <>
      <Box mt='6' name='likes' display='flex' borderWidth='1px' borderRadius='lg' pl='4' pr='4' pt='2' pb='2' onClick={handleClick} style={{ cursor: 'pointer' }} >
        <Image boxSize='20px' sized='sm' mr='2' src={!likeClick.liked ? likeIcon : likeIconClicked} ></Image>
        <Text fontSize='sm' fontWeight='bold'>Likes({eventLikesData.length})</Text>
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