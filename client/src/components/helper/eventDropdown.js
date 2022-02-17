import {Select, Text, Box} from '@chakra-ui/react'
 
const EventDropdown = ({handleOptionChange, selectedEvent, userEvents}) => {
return (
  <>
  <Select w='300px' rounded='lg' width='xxs' backgroundColor='white' size='md' onChange={handleOptionChange} boxShadow='10' value={selectedEvent.name}>
    {userEvents.sort(function (a, b) {
      return new Date(a.startDate) - new Date(b.startDate)
    }).map(event => {
      return <option key={event.name} value={event.name}>{event.name}</option>
    })}
  </Select>
  </>
  )
}
export default EventDropdown

