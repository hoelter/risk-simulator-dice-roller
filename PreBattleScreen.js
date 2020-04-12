import React from 'react';
import Body from './Body';
import { screens } from './helpers';

export default function PreBattleScreen({ setScreen, runBattle }) {
  const onPrimaryButton = () => {
    runBattle();
    setScreen(screens.battleScreen);
  }

  return (
    <Body 
      text="Truly random dice rolls will now be automated for each player. After each round, you will have the option of stopping or adjusting input. Input will automatically be adjusted if you repeatedly choose continue until one player is completely defeated."
      primaryButtonTitle={"Begin Battle"}
      onPrimaryButton={onPrimaryButton}
      secondaryButtonTitle="Change Input"
      onSecondaryButton={() => setScreen(screens.attackersInput)}
    />
  );
}
