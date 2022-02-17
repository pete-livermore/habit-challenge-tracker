import React from 'react'
import { ImageUpload } from '../helper/ImageUpload'
// Import Bootstrap Components
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Alert
  
  } from '@chakra-ui/react'

const HabitFormTemplate = ({ formData, formErrors, handleChange, handleSubmit, habitError, handleImageUrl }) => (
    <Flex width="full" align="center" justifyContent="center">
    <Box width='100%' p={8} backgroundColor='white' maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <>
          <Box textAlign="center">
            <Heading>Habit Completed Form</Heading>
            {habitError && <Alert status='error' mt={4}>{habitError}</Alert>}
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
            {/* Comment */}
            <FormControl isRequired mt={6}>
            <FormLabel htmlFor='comment'>Comment</FormLabel>
            <Input onChange={handleChange} type="text" name="comment" placeholder='comment' defaultValue={formData.comment} />
            {/* {formErrors.comment && <Alert status='error' mt={4}>{formErrors.comment}</Alert>} */}
            </FormControl>
              {/* Picture */}
              <FormControl mt={6}>
              <FormLabel htmlFor='picture'>Add Picture</FormLabel>
            <ImageUpload
                value={formData.picture}
                name='picture'
                handleImageUrl={handleImageUrl}
              />
              </FormControl>
              {/* {formErrors.picture && <Alert status='error' mt={4}>{formErrors.picture}</Alert>} */}
            {/* Error + Button */}
            <Button type="submit" width="full" mt={4}>Submit</Button>      
            </form>
          </Box>
        </>
    </Box>
    </Flex>
)

export default HabitFormTemplate