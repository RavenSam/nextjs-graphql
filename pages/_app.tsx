import { ApolloProvider } from "@apollo/client"
import { useApollo } from "src/config/apolloClient"
import { ChakraProvider } from "@chakra-ui/react"
import "src/styles/globals.css"
import { theme } from "src/themes"

export default function MyApp({ Component, pageProps }) {
   const client = useApollo()

   return (
      <>
         <ChakraProvider theme={theme}>
            <ApolloProvider client={client}>
               <Component {...pageProps} />
            </ApolloProvider>
         </ChakraProvider>
      </>
   )
}
