import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import {
  screens,
  updateGameStateInput,
  useBattler
} from './helpers';

import InputDisplay from './InputDisplay';
import Welcome from './Welcome';
import AttackersInput from './AttackersInput';
import AttackersDiceInput from './AttackersDiceInput';
import DefendersInput from './DefendersInput';
import DefendersDiceInput from './DefendersDiceInput';
import PreBattleScreen from './PreBattleScreen';
import BattleScreen from './BattleScreen';
import BattleSummary from './BattleSummary';

export default function Main() {
  const [screen, setScreen] = useState(0);
  const [gameState, setGameState, runBattle, isBattling, history, resetGameState] = useBattler();

  const onNumAttackersChange = (input) => {
    updateGameStateInput(gameState, setGameState, input, 'numAttackers');
  };

  const onNumAttackersDiceChange = (input) => {
    updateGameStateInput(gameState, setGameState, input, 'numAttackersDice');
  }

  const onNumDefendersChange = (input) => {
    updateGameStateInput(gameState, setGameState, input, 'numDefenders');
  };

  const onNumDefendersDiceChange = (input) => {
    updateGameStateInput(gameState, setGameState, input, 'numDefendersDice');
  }

  const ActiveScreenComponent = screenComponentDict[screen];

  return (
    <View style={styles.appContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Text style={styles.title}>War Simulator Dice Roller</Text>
          {screen !== screens.welcome && screen !== screens.battleSummary && <InputDisplay gameState={gameState} />}
          <ActiveScreenComponent
            setScreen={setScreen}
            runBattle={runBattle}
            isBattling={isBattling}
            history={history}
            resetGameState={resetGameState}
            onNumAttackersChange={onNumAttackersChange}
            onNumAttackersDiceChange={onNumAttackersDiceChange}
            onNumDefendersChange={onNumDefendersChange}
            onNumDefendersDiceChange={onNumDefendersDiceChange}
            {...gameState}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const screenComponentDict = {
  [screens.welcome]: Welcome,
  [screens.attackersInput]: AttackersInput,
  [screens.attackersDiceInput]: AttackersDiceInput,
  [screens.defendersInput]: DefendersInput,
  [screens.defendersDiceInput]: DefendersDiceInput,
  [screens.preBattleScreen]: PreBattleScreen,
  [screens.battleScreen]: BattleScreen,
  [screens.battleSummary]: BattleSummary
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    margin: 15,
    marginTop: 30
  },
  title: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    justifyContent: 'flex-start'
  }
});
