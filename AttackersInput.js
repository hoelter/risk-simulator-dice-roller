import React from 'react';
import Body from './Body';
import { screens } from './helpers';

export default function AttackersInput({ setScreen, numAttackers, onNumAttackersChange }) {
  const isValidInput = Number(numAttackers) > 1;
  const nextText = isValidInput ? 'Next' : '';
  const onNext = isValidInput ? () => setScreen(screens.attackersDiceInput) : () => null;

  return (
    <Body 
      text="Please enter the total number of attacking troops. There must be at least 2 troops to attack."
      primaryButtonTitle={nextText}
      onPrimaryButton={onNext}
      secondaryButtonTitle=""
      onSecondaryButton={() => null}
      inputValue={numAttackers}
      setInputValue={onNumAttackersChange}
    />
  );
}
