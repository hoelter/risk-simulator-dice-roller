import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export const iOS = Platform.OS === 'ios';

export const screens = {
  welcome: 0,
  attackersInput: 1,
  attackersDiceInput: 2,
  defendersInput: 3,
  defendersDiceInput: 4,
  preBattleScreen: 5,
  battleScreen: 6,
  battleSummary: 7
};

export const updateGameStateInput = (gameState, setGameState, input, key) => {
  setGameState({
    ...gameState,
    [key]: removeNonNumbers(input)
  });
}

const removeNonNumbers = (input) => {
  const onlyNums = input.replace(/[^0-9]/g, '');
  return Number(onlyNums).toString();
};

export function useBattler() {
  const [gameState, setGameState] = useState({
    numAttackers: '',
    numDefenders: '',
    numAttackersDice: '',
    numDefendersDice: ''
  });
  const [history, setHistory] = useState([]);
  const [isBattling, setIsBattling] = useState(false);

  const randInfo = useRandomNumbers();

  const resetGameState = () => {
    setGameState({
      numAttackers: '',
      numDefenders: '',
      numAttackersDice: '',
      numDefendersDice: ''
    });

    setHistory([]);
  };

  const runBattle = () => {
    // Do nothing if game is complete
    if (Number(gameState.numDefendersDice) === 0 || Number(gameState.numAttackersDice) === 0) {
      console.log('runBattle called on completed game');
      return;
    }

    setIsBattling(true);
    const newRandIndex = randInfo.index + Number(gameState.numAttackersDice) + Number(gameState.numDefendersDice);
    const rolls = randInfo.randomNumbers.slice(randInfo.index, newRandIndex);
    const defenseRolls = rolls.slice(-1 * Number(gameState.numDefendersDice)).sort(byDescending);
    const attackRolls = rolls.slice(0, Number(gameState.numAttackersDice)).sort(byDescending);

    let defenseTroopsLost = 0;
    let attackTroopsLost = 0;
    for (let i = 0; i < defenseRolls.length; i++) {
      if (defenseRolls[i] < attackRolls[i]) {
        defenseTroopsLost++;
      } else {
        attackTroopsLost++;
      }
    }

    const newNumDefenders = Math.max(0, Number(gameState.numDefenders) - defenseTroopsLost);
    const newNumAttackers = Math.max(0, Number(gameState.numAttackers) - attackTroopsLost);

    let newNumDefendersDice = Number(gameState.numDefendersDice);
    if (newNumDefenders === 0) {
      newNumDefendersDice = 0;
    } else if (newNumDefenders < newNumDefendersDice) {
      newNumDefendersDice = 1;
    }

    let newNumAttackersDice = Number(gameState.numAttackersDice);
    if (newNumAttackers < 2) {
      newNumAttackersDice = 0;
    } else if (newNumAttackers - 1 < newNumAttackersDice) {
      newNumAttackersDice = newNumAttackers - 1;
    }

    const updatedGameState = {
      defenseRolls,
      attackRolls,
      numDefenders: newNumDefenders.toString(),
      numAttackers: newNumAttackers.toString(),
      numDefendersDice: newNumDefendersDice.toString(),
      numAttackersDice: newNumAttackersDice.toString()
    };

    // set initial game state history first round
    const updatedHistory = history.length === 0 ? [gameState] : [...history];
    updatedHistory.push(updatedGameState)

    setGameState(updatedGameState);
    setHistory(updatedHistory);
    randInfo.setIndex(newRandIndex);
    setIsBattling(false);
  }

  return [gameState, setGameState, runBattle, isBattling, history, resetGameState];
};

const byDescending = (a, b) => b - a;

function useRandomNumbers() {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index + 20 > randomNumbers.length) {
      loadRandomNumbers(randomNumbers, setRandomNumbers, index, setIndex);
    }
  }, [index])

  return { randomNumbers, index, setIndex };
}

const loadRandomNumbers = async (randomNumbers, setRandomNumbers, index, setIndex) => {
  try {
    const response = await fetch('https://www.random.org/integers/?num=200&min=1&max=6&col=1&base=10&format=plain&rnd=new');
    if (response.status === 200) {
      const body = await response.text();

      const newRandomNumbers = [];
      let i = body.length;
      while (i--) {
        const num = Number(body[i]);
        if (num) {
          newRandomNumbers.push(num);
        }
      }
      
      setRandomNumbers([...randomNumbers.slice(index), ...newRandomNumbers]);

      if (index > 0) {
        setIndex(0);
      }
    }
  } catch (e) {
    console.log('error loading numbers', e);
  }
};

