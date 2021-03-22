import { Button, Center, IconButton } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

export default function PagesNumber({ info, fetchPage, p }) {
   //   Next & Previous page Number
   const { next, prev } = info

   // Function to handle the Next Button
   // funtion set the current page
   // call fetchPage with next page number
   const handleNext = () => {
      p.setCurrentPage(p.currentPage + 1)
      fetchPage(next)
   }

   // Function to handle the Previous Button
   // funtion set the current page
   // call fetchPage with prev page number
   const handlePrev = () => {
      p.setCurrentPage(p.currentPage - 1)
      fetchPage(prev)
   }

   return (
      <>
         <Center py="3rem">
            <IconButton
               onClick={handlePrev}
               borderRadius="full"
               m=".5rem"
               icon={<ChevronLeftIcon boxSize="1.8rem" />}
               aria-label="Previous Page"
               isDisabled={!prev}
            />

            <Button borderRadius="full" px="1.5rem">
               {p.currentPage}
            </Button>

            <IconButton
               onClick={handleNext}
               borderRadius="full"
               m=".5rem"
               icon={<ChevronRightIcon boxSize="1.8rem" />}
               aria-label="Next Page"
               isDisabled={!next}
            />
         </Center>
      </>
   )
}
