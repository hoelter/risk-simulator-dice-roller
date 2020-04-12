import React from 'react';
import Body from './Body';
import { screens } from './helpers';

export default function DefendersDiceInput({ setScreen, numDefenders, numDefendersDice, onNumDefendersDiceChange }) {
  const isValidInput = Number(numDefendersDice) > 0 && Number(numDefendersDice) < 3 && Number(numDefendersDice) <= Number(numDefenders);
  const nextText = isValidInput ? 'Next' : '';
  const onNext = isValidInput ? () => setScreen(screens.preBattleScreen) : () => null;

  return (
    <Body 
      text="Please enter how many dice the defender wishes to roll. The defender can roll 1 die for each troop, and at most 2 dice."
      primaryButtonTitle={nextText}
      onPrimaryButton={onNext}
      secondaryButtonTitle="Previous"
      onSecondaryButton={() => setScreen(screens.defendersInput)}
      inputValue={numDefendersDice}
      setInputValue={onNumDefendersDiceChange}
    />
  );
}