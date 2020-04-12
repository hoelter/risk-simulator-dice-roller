import React from 'react';
import Body from './Body';
import { screens } from './helpers';

export default function DefendersInput({ setScreen, numDefenders, onNumDefendersChange }) {
  const isValidInput = Number(numDefenders) > 0;
  const nextText = isValidInput ? 'Next' : '';
  const onNext = isValidInput ? () => setScreen(screens.defendersDiceInput) : () => null;

  return (
    <Body 
      text="Please enter the total number of defending troops. There must be at least 1 to defend."
      primaryButtonTitle={nextText}
      onPrimaryButton={onNext}
      secondaryButtonTitle="Previous"
      onSecondaryButton={() => setScreen(screens.attackersDiceInput)}
      inputValue={numDefenders}
      setInputValue={onNumDefendersChange}
    />
  );
}
