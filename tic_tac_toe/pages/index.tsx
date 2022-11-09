import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from "react"
import { Heading ,Box,Text, Center, Flex,
         Grid,GridItem, color
       } from '@chakra-ui/react'
export default function Home() {
  const Winning =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  const[xTurn,setXTurn] = useState(true);
  const[won,setWon]= useState(false);
  const [boardData,setBoardData] = useState({
    0:"",1:"",2:"",
    3:"",4:"",5:"",
    6:"",7:"",8:""
  });
  const UpdateBD = (indx:any)=>{
    if(!boardData[indx]){
      let value = xTurn === true ? 'X' : 'O'
      setBoardData({...boardData,[indx]:value})
      setXTurn(!xTurn)
    }
  };
  const winner = ()=>{
    boardData.map((bd:any)=>{
      const[a,b,c]=bd;
      if(boardData[a] && boardData[a]=== boardData[b] && 
        boardData[a]===boardData[c]){
         setWon(true)
        }
    })
  };
  return (
    <Flex
      justifyContent="center" alignItems="center"
      flexDirection="column"
    >
        <Heading mt="5" color="#1C3879">Tic Tac Teo</Heading>
        <Box className='game'>
          <Center m="5" className='game__menu'>
            <Text fontSize="30px" fontWeight="400" color="#607EAA"
            >
              __{xTurn===true ?'X Turn':'O Turn'}__
            </Text>
          </Center>
          <Grid templateColumns='repeat(3, 1fr)' gap="8px"  mt="10">
            {
              [...Array(9)].map((_v,indx:any)=>{
                return(
                  <GridItem 
                     key={indx} 
                     bg='#607EAA' borderRadius="8px"
                     boxShadow='0px 4px #ddd'
                     w="80px" h="80px"
                     onClick={()=>
                      UpdateBD(indx)
                      }
                      textAlign="center" fontSize="50px"
                      fontWeight="bold" color="#EAE3D2"
                      cursor="pointer"
                      _hover={{bg:"#EAE3D2" ,color:"#607EAA"}}
                    >
                    {boardData[indx]}
                  </GridItem>
                )
              })
            }
            
          </Grid>
          <Box className='game__board'>
            <Box className='square'>

            </Box>
          </Box>
        </Box>
    </Flex>
  )
}
