import { GetStaticProps, GetServerSideProps } from "next"
import { Box, Container, Heading } from "@chakra-ui/react"
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

   const { data, error, loading } = useQuery(pageQuery, { variables: { page: 2 } })

   console.log({ data, error, loading })

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

            <Characters characters={characters} loading={load} />

            <PagesNumber info={props.info} />
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
