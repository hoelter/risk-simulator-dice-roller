import React from 'react';
import { ActivityIndicator } from 'react-native';
import Body from './Body';
import { screens } from './helpers';

export default function BattleScreen({ setScreen, runBattle, isBattling, history }) {
  if (isBattling) {
    return <ActivityIndicator size="large" color="white" />;
  }

  const lastGameState = history[history.length - 2];
  const gameState = history[history.length - 1];
  const attackersEliminated = Number(lastGameState.numAttackers) - Number(gameState.numAttackers);
  const defendersEliminated = Number(lastGameState.numDefenders) - Number(gameState.numDefenders);

  const rollText = `Attacker Rolls: ${gameState.attackRolls}
Defender Rolls: ${gameState.defenseRolls}

Attackers lost ${attackersEliminated} troops and defenders lost ${defendersEliminated} troops.`;

  const gameComplete = Number(gameState.numAttackersDice) === 0 || Number(gameState.numDefendersDice) === 0;
  const onSecondaryButton = () => setScreen(screens.attackersInput);
  const onPrimaryButton = () => setScreen(screens.battleSummary);
  const completeBattleText = 'Complete Battle';
  const continueRollingText = 'Continue Rolling';

  return (
    <Body 
      text={rollText}
      centerButtonTitle={gameComplete ? completeBattleText : continueRollingText}
      onCenterButton={gameComplete ? onPrimaryButton : runBattle}
      primaryButtonTitle={completeBattleText}
      onPrimaryButton={gameComplete ? null : onPrimaryButton}
      secondaryButtonTitle="Change Input"
      onSecondaryButton={gameComplete ? null : onSecondaryButton}
    />
  );
}
