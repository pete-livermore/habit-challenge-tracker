import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";

const Logo = (props) => {
  return (
    <Box {...props} >
    <Link href='/'>
      <Text fontSize="lg" fontWeight="bold">
        TinyHabit
      </Text>
    </Link>
    </Box>
  )
}

export default Logo