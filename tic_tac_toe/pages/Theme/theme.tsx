import { extendTheme, GridItem } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools";

const themeChakra = extendTheme({
    styles: {
        GridItem:{
            bg:"#EAE3D2",
            color:"#607EAA"
        }
  },
});

export default themeChakra;