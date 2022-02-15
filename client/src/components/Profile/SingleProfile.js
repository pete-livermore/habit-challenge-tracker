import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Select, Spinner, VStack, HStack, Center, Container, Box, Heading, Flex, Avatar, Text, Textarea, Badge, Image, Button } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'

const SingleProfile = () => {

    const [profileDetails, setProfileDetails] = useState(null)
    const [loggedUserDetails, setLoggedUserDetails] = useState(null)
    const [eventData, setEventData] = useState([])
    const [filterHabits, setFilterHabits] = useState({
        event: '',
        date: ''
    })
    const [habitsFiltered, setHabitsFiltered] = useState(null)

    // const [isError, setIsError] = useState({ error: false, message: '' })
    // const navigate = useNavigate()

    const { userId } = useParams()

    useEffect(() => {

        const getEventData = async () => {
            try {
                const { data } = await axios.get(`/api/events`)
                setEventData(data)
                console.log('event indie effect', data)
                // console.log(data)
            } catch (err) {
                // setIsError({ error: true, message: 'Server error' })
            }
        }
        getEventData()

        const getProfile = async () => {
            try {
                const token = localStorage.getItem('tinyhabits-token')
                console.log(token)
                const { data } = await axios.get(`/api/profile/${userId}`, {
                    'headers': {
                        'Authorization': 'Bearer ' + token
                    }
                })
                console.log('data', data)
                setProfileDetails(data)
            } catch (err) {
                console.log(err)
            }
        }
        getProfile()
    }, [userId])

    useEffect(() => {
        const getLoggedInProfile = async () => {
            try {
                const token = localStorage.getItem('tinyhabits-token')
                console.log(token)
                const { data } = await axios.get(`/api/profile`, {
                    'headers': {
                        'Authorization': 'Bearer ' + token
                    }
                })
                // console.log('data', data)
                setLoggedUserDetails(data)
            } catch (err) {
                console.log(err)
            }
        }
        getLoggedInProfile()
    }, []) // Only on first render

    function filterHabitsFunction(e) {
        console.log(e.target.value)
        console.log(e.target.name)
        setFilterHabits({ ...filterHabits, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (profileDetails) {
            let filteredHabits
            if ((filterHabits.event === 'All' | filterHabits.event === '') && (filterHabits.date === 'All' | filterHabits.date === '')) {
                filteredHabits = profileDetails.habitCompletions
            } else if (filterHabits.event === 'All' | filterHabits.event === '') {
                filteredHabits = profileDetails.habitCompletions.filter(habit => new Date(habit.createdAt).toLocaleDateString() === filterHabits.date)
            } else if (filterHabits.date === 'All' | filterHabits.date === '') {
                filteredHabits = profileDetails.habitCompletions.filter(habit => eventData.filter(event => event._id === habit.event)[0].name === filterHabits.event)
            } else {
                filteredHabits = profileDetails.habitCompletions.filter(habit => (new Date(habit.createdAt).toLocaleDateString() === filterHabits.date) && (eventData.filter(event => event._id === habit.event)[0].name === filterHabits.event))
            }
            // console.log(filteredHabits)
            setHabitsFiltered(filteredHabits)
        }


    }, [filterHabits, profileDetails, eventData])

    console.log('profile', profileDetails)
    console.log('logged profile', loggedUserDetails)
    console.log('event', eventData)
    console.log('filter habits array', filterHabits)
    return (
        <>
            {profileDetails ?
                <>
                    <Flex zIndex='0' p='0' mt='5' name="wrapper" width='80%' direction={{ base: 'column', md: 'row' }}>
                        <VStack display='flex' name="content" direction='column' width='70%' alignItems='flex-start'>
                            <Box name="header" mb='70px' >
                                <Box name="image" w='450px'>
                                    <Avatar
                                        borderRadius='full'
                                        boxSize='150px'
                                        src={profileDetails.picture !== '' ? profileDetails.picture : ''}
                                        alt='profile picture' />
                                </Box>
                                <Box name="headline">
                                    <Text mt='3' size='lg' color='secondary'>Email: {profileDetails.email}</Text>
                                    <Heading color='white' mt='3' as='h1' size='2xl' mb='4'>{profileDetails.firstName + ' ' + profileDetails.lastName}</Heading>
                                </Box>
                                {loggedUserDetails ? profileDetails.id === loggedUserDetails.id ?
                                    <Link to={`/profile/${profileDetails.id}/edit-profile`}>
                                        <Button w='20%' mt='3' backgroundColor='#ffbb0f' boxShadow='lg' rounded='md' bg='white' color='white'>Edit</Button>
                                    </Link>
                                    : '' : ''}
                            </Box>
                            <Box>
                                <Flex flexDirection='row' justifyContent='center'>
                                    <Box>
                                        <Flex flexDirection='column' justifyContent='flex-start'>
                                            {habitsFiltered ?
                                                <>
                                                    <Box name="habits-completed-box" p='5' mt='0' color='black' borderTopRadius='10' boxShadow='lg' width='100%'>
                                                        <Heading as='h5' mb='2' size='md'>Habits Completed</Heading>
                                                        <Flex flexDirection='row' justifyContent='center'>
                                                            <Select mr='1' width='60%' className='filterHabit' name="event" id="event" onChange={filterHabitsFunction}>
                                                                <option hidden>Event</option>
                                                                <option>All</option>
                                                                {profileDetails.events.map(joinedEvent => {
                                                                    // console.log('CHECKKK', eventData.filter(event => event._id === joinedEvent._id)[0].name)
                                                                    return (
                                                                        <option key={joinedEvent._id}>{eventData.length ? eventData.filter(event => event._id === joinedEvent._id)[0].name : '...'}</option>
                                                                    )
                                                                })}
                                                            </Select>
                                                            <Select ml='1' width='30%' className='filterHabit' name="date" id="date" onChange={filterHabitsFunction}>
                                                            <option hidden>Date</option>
                                                            <option>All</option>
                                                            {profileDetails.habitCompletions.sort(function (a, b) {
                                                                return new Date(b.createdAt) - new Date(a.createdAt)
                                                            }).map(habit => {
                                                                return (
                                                                    <option key={habit._id}>{new Date(habit.createdAt).toLocaleDateString()}</option>
                                                                )
                                                            })}
                                                            </Select>
                                                            </Flex>
                                                    </Box>
                                                    <Flex bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' borderBottomRadius='10' rounded='md'>
                                                        {habitsFiltered.length ? habitsFiltered.map(habit => {
                                                            return (
                                                                <Box key={habit._id} width='80%' mt='2' mb='2' borderWidth='1px' boxShadow='lg' borderRadius='lg' overflow='hidden'>
                                                                    <Flex flexDirection='column' alignItems='center'>
                                                                    <Link to={`/events/${habit.event}`}><Image src={habit.picture} alt='habit-pic' /></Link>
                                                                    </Flex>
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
                                                                    {loggedUserDetails ? profileDetails.id === loggedUserDetails.id ?
                                                                        <Box>
                                                                            <Flex flexDirection='row' justifyContent='center'>
                                                                                <Box mr='2'>
                                                                                <Link to={`/profile/${profileDetails.id}/${habit.event}/${habit._id}/edit`}>
                                                                                <Button w='100%' mb='5' backgroundColor='#ffbb0f' boxShadow='lg' rounded='md' bg='white' color='white'>Edit</Button>
                                                                                </Link>
                                                                                </Box>
                                                                                <Box mr='2'>
                                                                                <Link to={`/profile/${profileDetails.id}/${habit.event}/${habit._id}/delete-habit`}>
                                                                                <Button w='100%' mb='5' backgroundColor='#ffbb0f' boxShadow='lg' rounded='md' bg='white' color='white'>Delete</Button>
                                                                                </Link>
                                                                                </Box>
                                                                            </Flex>
                                                                        </Box>
                                                                        : ''
                                                                        : ''}
                                                                </Box>
                                                            )
                                                        }) : <Text mb='4' fontSize='md'>no habits completed</Text>}
                                                    </Flex>
                                                </>
                                                :
                                                <Text mb='4'>Nothing to see</Text>}
                                        </Flex>
                                    </Box>

                                </Flex>
                            </Box>
                        </VStack>
                        <Container width={{ base: '100%', md: '40%' }} name="widget">
                            <Box name="joined-events-box" p='5' mt='0' backgroundColor='#0075ff' color='white' borderTopRadius='10' w='100%'>
                                <Heading as='h5' size='md'>Joined Events</Heading>
                            </Box>
                            <Flex name="joined-events" p='3' mt='0' bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' borderBottomRadius='10'>
                                {profileDetails.events.length ? profileDetails.events.map(joinedEvent => {
                                    return (
                                        <Text key={joinedEvent._id} as='h4' mb='1.5' mt='1.5' size='md'>- {eventData.length ? eventData.filter(event => event._id === joinedEvent._id)[0].name : '...'}</Text>
                                    )
                                }) : <Text as='h4' size='md'>Events: no events</Text>}
                            </Flex>
                        </Container>
                    </Flex>
                </>
                :
                <Flex flexDirection='row' justifyContent='center'>
                    <Spinner />
                </Flex>
            }
            <Box width='100%' zIndex='-1' position='absolute' top='0' left='0' bgGradient='linear(to-r, primary, thirdary)' height={{ base: '460px', md: '460x', lg: '460' }}>
            </Box>
        </>
    )





}

export default SingleProfile