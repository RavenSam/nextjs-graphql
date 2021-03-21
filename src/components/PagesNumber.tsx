import { useState } from "react"
import { useRouter } from "next/router"
import { Button, Spacer, HStack, Center, IconButton } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

export default function PagesNumber({ info }) {
   const { next, prev, pages } = info
   const [currentPage, setCurrentPage] = useState(next - 1)

   const router = useRouter()

   const handleNext = () => {
      setCurrentPage(currentPage + 1)
      router.push({ pathname: "/", query: { page: currentPage + 1 } })
   }

   const handlePrev = () => {
      setCurrentPage(currentPage - 1)
      router.push({ pathname: "/", query: { page: currentPage - 1 } })
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

            <Button borderRadius="full">{currentPage}</Button>

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
