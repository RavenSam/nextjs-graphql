import { gql } from "@apollo/client"

// page query
// args page number
export const PAGE_QUERY = gql`
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
// search query
// args search character string
export const SEARCH_QUERY = gql`
   query SearchCharacter($search: String!) {
      characters(filter: { name: $search }) {
         info {
            count
            pages
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
