import { Button, Center, IconButton } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

export default function PagesNumber({ info, fetchPage, p }) {
   const { next, prev } = info

   const handleNext = () => {
      p.setCurrentPage(p.currentPage + 1)
      fetchPage(next)
   }

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
