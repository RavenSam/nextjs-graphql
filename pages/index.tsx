import { GetStaticProps } from "next"
import { Box, Container, Heading, Center, Spinner } from "@chakra-ui/react"
import { gql, useQuery } from "@apollo/client"
import { useState } from "react"
import { initializeApollo } from "src/config/apolloClient"

// Components
import Characters from "src/components/Characters"
import SearchInput from "src/components/SearchInput"
import PagesNumber from "src/components/PagesNumber"

const pageQuery = gql`
   query pages($page: Int) {
      characters(page: $page) {
         info {
            count
            pages
            next
            prev
         }
         results {
            id
            name

            location {
               id
               name
            }

            origin {
               id
               name
            }

            episode {
               id
               episode
               air_date
            }
            image
         }
      }
   }
`

export default function Home(props) {
   const initialState = props
   const [characters, setCharacters] = useState(initialState.characters)
   const [load, setLoad] = useState(false)
   const [currentPage, setCurrentPage] = useState(props.info.next - 1)
   const [info, setInfo] = useState(props.info)

   const { data, error, loading, fetchMore } = useQuery(pageQuery, { variables: { page: +currentPage } })

   const fetchPage = (page) => {
      fetchMore({
         variables: { page: +page || 1 },
         updateQuery: (prevResult, { fetchMoreResult }) => {
            fetchMoreResult.characters = {
               ...prevResult.characters,
               ...fetchMoreResult.characters,
            }

            setCharacters(fetchMoreResult.characters.results)
            setInfo(fetchMoreResult.characters.info)
         },
      })

      window.scrollTo(0, 0)
   }

   const charDefault = () => setCharacters(initialState.characters)

   return (
      <>
         <Container maxW="container.lg">
            <Box my="4" py="8" textAlign="center">
               <Heading as="h1" size="2xl">
                  Rick & Morty
               </Heading>
            </Box>

            <SearchInput charDefault={charDefault} setCharacters={setCharacters} setLoading={setLoad} />
            {loading || load ? (
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

   const { data } = await apolloClient.query({
      query: pageQuery,
      variables: 1,
   })

   return {
      props: {
         characters: data.characters.results,
         info: data.characters.info,
      },
   }
}
