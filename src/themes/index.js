import { extendTheme } from "@chakra-ui/react"
import { Button } from "./componentStyle"
import { purpleC, indigoC, minsk } from "./colors"
import { fonts } from "./fonts"
import shadows from "./shadows"

export const primary = minsk

export const theme = extendTheme({
   colors: {
      primary,
      indigoC,
      purpleC,
      minsk,
   },

   shadows,

   components: {
      Button,
   },

   fonts,
})
