import { InMemoryCache, ApolloClient, HttpLink, NormalizedCacheObject } from "@apollo/client"

let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient() {
   return new ApolloClient({
      link: new HttpLink({ uri: "https://rickandmortyapi.com/graphql" }),
      cache: new InMemoryCache(),
   })
}

export const initializeApollo = () => (apolloClient = apolloClient ?? createApolloClient())

export const useApollo = () => initializeApollo()
