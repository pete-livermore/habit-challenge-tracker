import React from 'react'
import { Box, Progress, Badge, Image,Flex, Button } from '@chakra-ui/react'
import { userIsAuthenticated} from '../helper/auth'
import { Link } from 'react-router-dom'

export const HabitsCompleted = ({ eventHabitCompletions }) => {
 return (

    <Box mt='4'>
    <p>Your completion progress: {((eventHabitCompletions.length / 30) * 100).toFixed(1)}%</p>
    <Progress borderRadius="1rem" colorScheme='green' size='lg' value={((eventHabitCompletions.length / 30) * 100).toFixed(1)} />
    </Box>

  )
}

export const HabitsActivity = ({ habitsFiltered, eventData, profileData }) => { 
  console.log('habitsFiltered =>', habitsFiltered)
  console.log(userIsAuthenticated())
  return (
    <Flex bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' rounded='md'>
     {habitsFiltered.map(habit => {
       
        return (
        <Box key={habit._id} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Link to={`/events/${habit.event}`}><Image src={habit.picture} alt='habit-pic' /></Link>

        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
              Completed
            </Badge>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {new Date(habit.createdAt).toLocaleDateString()}
            </Box>
          </Box>
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
          >
            {eventData.length ? eventData.filter(event => event._id === habit.event)[0].name : '...'}
          </Box>

          <Box>
            {habit.comment}
          </Box>
        </Box>
        { userIsAuthenticated() ?
          <Box>
            <Flex flexDirection='row'>
              <Link to={`/profile/${profileData.id}/${habit.event}/${habit._id}/edit`}>
                <Button w='20%' backgroundColor='green' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Edit</Button>
              </Link>
              <Link to={`/profile/${profileData.id}/${habit.event}/${habit._id}/delete-habit`}>
                <Button w='20%' backgroundColor='red' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Delete</Button>
              </Link>
            </Flex>
          </Box>
          :
          <p>Nothing to see</p>
        }
       </Box>
    )
       }) 
}
</Flex>
    
  )
}

