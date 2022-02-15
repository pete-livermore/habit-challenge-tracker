import React from 'react'
import { Box, Progress } from '@chakra-ui/react'

export const HabitsCompleted = ({ eventHabitCompletions }) => {
 return (
   <>
    <Box mt='4'>
    <p>Your completion progress: {((eventHabitCompletions.length / 30) * 100).toFixed(1)}%</p>
    <Progress borderRadius="1rem" colorScheme='green' size='lg' value={((eventHabitCompletions.length / 30) * 100).toFixed(1)} />
    </Box>
    </>
  )
}