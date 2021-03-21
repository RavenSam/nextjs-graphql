import { useState } from "react"
import { useToast, Container, InputGroup, Input, InputRightElement, IconButton, HStack } from "@chakra-ui/react"
import { SearchIcon, CloseIcon } from "@chakra-ui/icons"

export default function SearchInput({ charDefault, setCharacters, setLoading }) {
   const [search, setSearch] = useState("")

   const toast = useToast()

   const hadleChange = (e) => setSearch(e.target.value)

   const handleSearch = async () => {
      setLoading(true)

      const { characters, error } = await (await fetch("/api/searchCharacter", { method: "POST", body: search })).json()

      setLoading(false)

      if (error) {
         toast({
            position: "top-left",
            title: "An error occured",
            description: error,
            status: "error",
            duration: 5000,
            isClosable: true,
         })
      } else {
         setCharacters(characters)
      }
   }

   const handleClose = () => {
      setSearch("")
      charDefault()
   }

   return (
      <>
         <Container maxW="450px" p="5rem 0">
            <HStack>
               <InputGroup>
                  <Input value={search} onChange={hadleChange} pr="4rem" placeholder="Search for your character" />
                  <InputRightElement width="3.5rem">
                     <IconButton
                        onClick={handleSearch}
                        w="100%"
                        variant="ghost"
                        aria-label="Search Character"
                        disabled={search === ""}
                        icon={<SearchIcon />}
                     />
                  </InputRightElement>
               </InputGroup>

               {search !== "" && (
                  <IconButton
                     onClick={handleClose}
                     color="red"
                     variant="ghost"
                     aria-label="Close Search"
                     icon={<CloseIcon />}
                  />
               )}
            </HStack>
         </Container>
      </>
   )
}
