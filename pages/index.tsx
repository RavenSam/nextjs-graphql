import { useState } from "react"
import { GetStaticProps } from "next"
import { Box, Container, Heading, Center, Spinner, useToast } from "@chakra-ui/react"
import { useQuery } from "@apollo/client"
import { initializeApollo } from "src/config/apolloClient"
import { PAGE_QUERY } from "src/config/querys"

// Components >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import Characters from "src/components/Characters"
import SearchInput from "src/components/SearchInput"
import PagesNumber from "src/components/PagesNumber"

// Rendering Function >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export default function Home(props) {
   const [currentPage, setCurrentPage] = useState(props.info.next - 1)
   const [characters, setCharacters] = useState(props.characters)
   const [info, setInfo] = useState(props.info)
   const [load, setLoad] = useState(false)

   // Apollo state query
   // variables the page number
   const { data, error, loading, fetchMore } = useQuery(PAGE_QUERY, { variables: { page: +currentPage } })

   // Chakra-ui Toast
   // Tost display if error is true
   const toast = useToast()
   if (error) {
      console.log(error)
      toast({
         position: "top-left",
         description: "Internal Error Please Try Again",
         status: "error",
         duration: 5000,
         isClosable: true,
      })
   }

   // Fetch Page Dtata
   // Function Called on Next and Prev Buttons
   // take the next or prev page number
   // update the character results and the info
   const fetchPage = (page: number) => {
      fetchMore({
         variables: { page: +page || 1 },
         updateQuery: (prevResult, { fetchMoreResult }) => {
            fetchMoreResult.characters = {
               ...prevResult.characters,
               ...fetchMoreResult.characters,
            }

            // Update the state
            setCharacters(fetchMoreResult.characters.results)
            setInfo(fetchMoreResult.characters.info)
         },
      })

      // Scroll to the Top
      window.scrollTo(0, 0)
   }

   // Function on Button to Close Search
   // Remove the search results
   // Render the page results data
   const charDefault = () => setCharacters(data.characters.results)
   
   // Loading new page
   // Not loading in first page
   const loadingNew = +currentPage !== 1 ? loading : false

   return (
      <>
         <Container maxW="container.lg">
            <Box my="4" py="8" textAlign="center">
               <Heading as="h1" size="2xl">
                  Rick & Morty
               </Heading>
            </Box>

            <SearchInput charDefault={charDefault} setCharacters={setCharacters} setLoading={setLoad} />

            {loadingNew || load ? (
               <Center py="3rem">
                  <Spinner />
               </Center>
            ) : (
               <Characters characters={characters} />
            )}

            <PagesNumber info={info} fetchPage={fetchPage} p={{ currentPage, setCurrentPage }} />
         </Container>
      </>
   )
}

// Static Props >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const getStaticProps: GetStaticProps = async (ctx) => {
   const apolloClient = initializeApollo()

   const { data } = await apolloClient.query({ query: PAGE_QUERY, variables: 1 })

   return {
      props: {
         characters: data.characters.results,
         info: data.characters.info,
      },
   }
}
