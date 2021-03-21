export const Button = {
   baseStyle: {
      borderRadius: "30px",
      lineHeight: "normal",

      _focus: {
         boxShadow: "none",
      },
   },

   variants: {
      outline: {
         border: "2px solid",
         borderColor: "primary.400",
         color: "primary.400",
      },
      solid: {
         border: "2px solid",
         borderColor: "primary.400",
         bg: "primary.400",
         color: "white",

         _hover: {
            bg: "primary.600",
            borderColor: "primary.800",
         },
         _active: {
            bg: "primary.900",
         },

         _disabled: {
            opacity: ".5",
            _hover: {
               color: "primary.500",
               PointerEvent: "none",
               cursor: "unset",
            },
         },
      },

      ghost: {
         borderRadius: "5px",
      },

      white: {
         bg: "white",
         borderColor: "gray.800",
         color: "primary.400",
      },

      nav: {
         fontWeight: "bold",
         borderRadius: "5px",
         textTransform: "capitalize",
         fontSize: ".9rem",

         _hover: {
            bg: "primary.200",
            color: "white",
         },

         _active: {
            bg: "primary.400",
            color: "white",
         },
      },
   },
}
