import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react"
import { Heading ,Box,Text, Center, Flex,
         Grid,GridItem, color, Button
       } from '@chakra-ui/react'
import { transferableAbortController } from 'util'
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
  const[wonCombo,setWonCombo]:any=useState([]);
  const [boardData,setBoardData]:any = useState({
    0:"",1:"",2:"",
    3:"",4:"",5:"",
    6:"",7:"",8:""
  }) as unknown as {name:string};
  const [isDraw,setIsDraw]=useState(false);
  const[ModeTitle,setModeTitle]=useState('');
  useEffect(()=>{
    winner();
    Draw();
    
  }),[boardData]
  const UpdateBD = (indx:any)=>{
    if(!boardData[indx] && !won){
      let value = xTurn === true ? 'X' : 'O'
      setBoardData({...boardData,[indx]:value})
      setXTurn(!xTurn)
    }
  };
  const Draw=()=>{
    let check = Object.keys(boardData).every((v)=>boardData[v])
    setIsDraw(check);
    if(check) setModeTitle("Match Draw !!!!!!!")
  }
  const winner = ()=>{
    Winning.map((key:any)=> {
      const [a, b, c] = key
      if (boardData[a] && boardData[a] === boardData[b] &&
        boardData[a] === boardData[c]) {
        setWon(true);
        setWonCombo([a,b,c]);
        setModeTitle(`Player ${!xTurn ?'X':'O'} Won !!!`)
        return;
      }
    })
  };
  const reset = ()=>{
    setBoardData({
      0:"",1:"",2:"",
      3:"",4:"",5:"",
      6:"",7:"",8:""
    });
    setXTurn(true);
    setWon(false);
    setWonCombo([]);
    setIsDraw(false);
    setModeTitle('');
  }
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
          <Center>
            <Text fontSize="20px" fontWeight="400" color="#1C3879" 
            >
              {`Game Won ${won} Draw: ${isDraw}`}
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
                      className={`square ${wonCombo.includes(indx) ? 'highlight' :''}`}
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
          <Center>
            <Flex m="5" alignItems="center" 
                  justifyContent="center"
                  w="200px" flexDirection="column"
                  p="24px" bg="#EAE3D2"  borderRadius="16px"
                  position="fixed" top="41%" left="47%"
                  boxShadow='dark-lg'
                  className={`modal ${ModeTitle ? "show" :""}`}
              >
              <Text textAlign="center" color="#1C3879">
                  {ModeTitle}
              </Text>
              <Button
                bg="#F9F5EB" color="#607EAA"
                onClick={reset} mt="5" boxShadow='base'
                _hover={{bg:"#1C3879" ,color:"#EAE3D2", boxShadow:"0px 4px #607EAA"}}
              >
                New Game
              </Button>
            </Flex>
          </Center>
        </Box>
    </Flex>
  )
}
