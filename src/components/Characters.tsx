import React from "react"
import Image from "next/image"
import { Box, Heading, SimpleGrid, Text, Spinner, Center } from "@chakra-ui/react"

export default function Characters({ characters, loading }) {
   return (
      <>
         {loading ? (
            <Center py="3rem">
               <Spinner />
            </Center>
         ) : (
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
               {characters.map((character) => (
                  <Box key={character.id} boxShadow="s3" borderRadius="xl" overflow="hidden">
                     <Image src={character.image} width={450} height={400} />

                     <Box p="1rem .8rem">
                        <Heading as="h4" textAlign="center" size="md" mb=".8rem">
                           {character.name}
                        </Heading>

                        <Text size="sm">
                           <Text as="strong">Origin:</Text> {character.origin.name.replace(/([\[(])(.+?)([\])])/g, "")}
                        </Text>
                        <Text size="sm">
                           <Text as="strong">Location:</Text>{" "}
                           {character.location.name.replace(/([\[(])(.+?)([\])])/g, "")}
                        </Text>
                     </Box>
                  </Box>
               ))}
            </SimpleGrid>
         )}
      </>
   )
}
