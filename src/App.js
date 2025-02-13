import './App.css';
import React, {useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const suits = ['H', 'S', 'D', 'C'];
const values = ['A',2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

function App() {
  let cards = []
  suits.forEach((suit) => { values.forEach((value) => { cards.push([suit,value])})})
  const [deck, setDeck] = useState(cards)
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [turn, setTurn] = useState('human');

  const changeTurn = () => {
    if (turn === 'human') {
      setTurn('computer')
    } else {
      setTurn('human')
    }
  }

  const shuffle = (referenceDeck) => {
      //because js is pass by reference for objects
      let copyDeck = [...referenceDeck]
      for (let idx = 0; idx < copyDeck.length-1; idx++) { //O(N)
        let j = Math.floor(Math.random() * (idx + 1));
        let temp = copyDeck[idx];
        copyDeck[idx] = copyDeck[j];
        copyDeck[j] = temp;
      }
      setDeck(copyDeck)
  }

  const hit = () => {
    const card = deck[deck.length-1]
    scoreHand(card)
    shuffle(deck.slice(0 ,-1))
    changeTurn()
  }

  const stay = () => {
    setTurn(!turn)
  }

  const scoreHand = (card) => {
    let score = 0
    if (card[1] === 'J' || card[1] === 'Q' || card[1] === 'K') {
      score = 10
    } else if (card[1] === 'A') {
      score = 11
    } else {
      score = card[1]
    }

    if (turn === 'human') {
      setPlayerScore((prevScore) => prevScore + score)
    } else if (turn === 'computer') {
      setDealerScore((prevScore) => prevScore + score)
    }
  }

  const reset = () => {
    setDealerScore(0)
    setPlayerScore(0)
    cards = []
    suits.forEach((suit) => { values.forEach((value) => { cards.push([suit,value])})})
    setDeck(cards)
    setTurn('human')
  }

  const winnerWinner = () => {
    if (playerScore === 21) {
      window.alert("You win")
      reset()
      return
    }

    if (playerScore > 21) {
      window.alert("Player bust")
      reset()
      return
    }

    if (dealerScore === 21) { 
      window.alert("You lose")
      reset()
      return
    }

    if(dealerScore > 21) {
      window.alert("Dealer bust")
      reset()
      return
    }
  }

  useEffect(()=> {
      if (turn === 'computer') {
        window.alert('Computer is thinking')
        setTimeout(() => {
          if (dealerScore >= 17) {
            stay()
          } else {
            hit()
          }
        }, [3000])
      }
  
      winnerWinner()
  }, [turn])

  return (
    <div className="App">
      <h1>BlackJack</h1>
      <center>
        <Stack spacing={2}  direction="row" sx={{justifyContent: 'center', marginBottom: 10}}>
          <Box component="section" sx={{ width: 50, p: 2, border: '1px dashed grey' }}>
            <Typography>Player Score</Typography>
            {playerScore}
          </Box>
          <Box component="section" sx={{ width: 50, p: 2, border: '1px dashed grey' }}>
          <Typography>Dealer Score</Typography>
            {dealerScore}
          </Box>
         </Stack>
         <Box>
          <div>Hand</div>
            <Button variant="text" onClick={hit}>HIT</Button>
            <Button variant="text" onClick={stay}>STAY</Button>
          </Box>
      </center>
    </div>
  );
}

export default App;
