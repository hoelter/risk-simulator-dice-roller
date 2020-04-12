import React from 'react';
import Body from './Body';
import { screens } from './helpers';

export default function Welcome({ setScreen }) {
  return (
    <Body 
      text={`Welcome to War Simulator Dice Roller.${"\n\n"}You will be prompted to enter information on the following screens in order to accurately simulate truly random dice rolls for the upcoming battle.`}
      centerButtonTitle="Begin"
      onCenterButton={() => setScreen(screens.attackersInput)}
    />
  );
}
