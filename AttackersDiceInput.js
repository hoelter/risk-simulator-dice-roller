import React from 'react';
import Body from './Body';
import { screens } from './helpers';

export default function AttackersDiceInput({ setScreen, numAttackers, numAttackersDice, onNumAttackersDiceChange }) {
  const isValidInput = Number(numAttackersDice) > 0 && Number(numAttackersDice) < 4 && Number(numAttackersDice) <= Number(numAttackers) - 1;
  const nextText = isValidInput ? 'Next' : '';
  const onNext = isValidInput ? () => setScreen(screens.defendersInput) : () => null;

  return (
    <Body 
      text="Please enter how many dice the attacker wishes to roll. The attacker can roll 1 die for each troop after the first, and at most 3 dice."
      primaryButtonTitle={nextText}
      onPrimaryButton={onNext}
      secondaryButtonTitle="Previous"
      onSecondaryButton={() => setScreen(screens.attackersInput)}
      inputValue={numAttackersDice}
      setInputValue={onNumAttackersDiceChange}
    />
  );
}
