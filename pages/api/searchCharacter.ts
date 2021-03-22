import type { NextApiRequest, NextApiResponse } from "next"
import { initializeApollo } from "src/config/apolloClient"
import { SEARCH_QUERY } from "src/config/querys"

export default async (req: NextApiRequest, res: NextApiResponse) => {
   const apolloClient = initializeApollo()
   const search = req.body

   try {
      const { data } = await apolloClient.query({
         query: SEARCH_QUERY,
         variables: { search },
      })

      res.status(200).json({ characters: data.characters.results, error: null })
   } catch (err) {
      if (err.message === "404: Not Found") {
         res.status(400).json({ characters: null, error: "No Character Found" })
      } else {
         res.status(500).json({ characters: null, error: "Internal Error Please Try Again" })
         console.log(err)
      }
   }
}
