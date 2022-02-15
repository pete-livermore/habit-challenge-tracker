import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Spinner, HStack, Center, Container, Box, Heading, Flex, Avatar, Text, Textarea, Badge, Image, Button } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'

const SingleProfile = () => {

    const [profileDetails, setProfileDetails] = useState(null)
    const [loggedUserDetails, setLoggedUserDetails] = useState(null)
    const [eventData, setEventData] = useState({})
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
                <><Center>
                    <Box>
                        {profileDetails ?
                            <>
                                <Box p='4' mt='4' backgroundColor='#0075ff' color='white' boxShadow='lg' rounded='md' maxWidth='400px' minWidth='300px'>
                                    {loggedUserDetails ? profileDetails.id === loggedUserDetails.id ? <Button w='20%' backgroundColor='#ffbb0f' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Edit</Button> : '' : ''}
                                    <Center><Avatar
                                        borderRadius='full'
                                        boxSize='150px'
                                        src={profileDetails.picture !== '' ? profileDetails.picture : ''}
                                        alt='profile picture' /></Center>
                                </Box>
                                <Flex bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' rounded='md'>
                                    <Heading as='h4' size='md'>First Name: {profileDetails.firstName}</Heading>
                                    <Heading as='h4' size='md'>Last Name: {profileDetails.lastName}</Heading>
                                    <Heading as='h4' size='md'>Email: {profileDetails.email}</Heading>
                                </Flex>
                            </>
                            :
                            <p>Nothing to see</p>}
                    </Box>
                    <Box>
                        <Flex flexDirection='column' justifyContent='flex-start'>
                            <Box>
                                {profileDetails ?
                                    <>
                                        <Box p='4' mt='4' backgroundColor='#0075ff' color='white' boxShadow='lg' rounded='md' maxWidth='400px' minWidth='300px'>
                                            <Heading as='h5' size='sm'>Joined Events</Heading>
                                        </Box>
                                        <Flex bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' rounded='md'>
                                            {profileDetails.events.length ? profileDetails.events.map(joinedEvent => {
                                                return (
                                                    <Text key={joinedEvent._id} as='h4' size='md'>{eventData.length ? eventData.filter(event => event._id === joinedEvent._id)[0].name : '...'}</Text>
                                                )
                                            }) : <Text as='h4' size='md'>Events: no events</Text>}
                                        </Flex>
                                    </>
                                    :
                                    <p>Nothing to see</p>}
                            </Box>
                        </Flex>
                    </Box>
                </Center><Box>
                        <Flex flexDirection='row' justifyContent='center'>
                            <Box>
                                <Flex flexDirection='column' justifyContent='flex-start'>
                                    {habitsFiltered ?
                                        <>
                                            <Box p='4' mt='4' backgroundColor='#0075ff' color='white' boxShadow='lg' rounded='md' maxWidth='400px' minWidth='300px'>
                                                <Heading as='h5' size='sm'>Habits Completed</Heading>
                                                <select className='filterHabit' name="event" id="event" onChange={filterHabitsFunction}>
                                                    <option hidden>Filter Event</option>
                                                    <option>All</option>
                                                    {profileDetails.events.map(joinedEvent => {
                                                        // console.log('CHECKKK', eventData.filter(event => event._id === joinedEvent._id)[0].name)
                                                        return (
                                                            <option key={joinedEvent._id}>{eventData.length ? eventData.filter(event => event._id === joinedEvent._id)[0].name : '...'}</option>
                                                        )
                                                    })}
                                                </select>
                                                <select className='filterHabit' name="date" id="date" onChange={filterHabitsFunction}>
                                                    <option hidden>Filter Date</option>
                                                    <option>All</option>
                                                    {profileDetails.habitCompletions.sort(function (a, b) {
                                                        return new Date(b.createdAt) - new Date(a.createdAt)
                                                    }).map(habit => {
                                                        return (
                                                            <option key={habit._id}>{new Date(habit.createdAt).toLocaleDateString()}</option>
                                                        )
                                                    })}
                                                </select>
                                            </Box>
                                            <Flex bg='white' w='100%' flexDirection='column' alignItems='center' boxShadow='lg' rounded='md'>
                                                {habitsFiltered.length ? habitsFiltered.map(habit => {
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
                                                            {loggedUserDetails ? profileDetails.id === loggedUserDetails.id ?
                                                                <Box>
                                                                    <Flex flexDirection='row'>
                                                                        <Link to={`/profile/${profileDetails.id}/${habit.event}/${habit._id}/edit`}>
                                                                            <Button w='20%' backgroundColor='green' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Edit</Button>
                                                                        </Link>
                                                                        <Link to={`/profile/${profileDetails.id}/${habit.event}/${habit._id}/delete-habit`}>
                                                                            <Button w='20%' backgroundColor='red' boxShadow='lg' p='6' rounded='md' bg='white' color='white'>Delete</Button>
                                                                        </Link>
                                                                    </Flex>
                                                                </Box>
                                                                : ''
                                                                : ''}
                                                        </Box>
                                                    )
                                                }) : <Text fontSize='md'>no habits completed</Text>}
                                            </Flex>
                                        </>
                                        :
                                        <p>Nothing to see</p>}
                                </Flex>
                            </Box>

                        </Flex>
                    </Box></>
                :
                <Flex flexDirection='row' justifyContent='center'>
                    <Spinner />
                </Flex>
            }
        </>
    )





}

export default SingleProfile