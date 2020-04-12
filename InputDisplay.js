import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function InputDisplay({ gameState }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer1}>
        <Text style={styles.text}>{`Attacking Troops: ${gameState.numAttackers}`}</Text>
        <Text style={styles.text}>{`Defending Troops: ${gameState.numDefenders}`}</Text>
      </View>
      <View style={styles.innerContainer2}>
        <Text style={styles.text}>{`Attacker Dice Count: ${gameState.numAttackersDice}`}</Text>
        <Text style={styles.text}>{`Defender Dice Count: ${gameState.numDefendersDice}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  innerContainer1: {
    flex: 1
  },
  innerContainer2: {
    flex: 1
  },
  text: {
    color: 'white',
    marginTop: 10,
    fontSize: 16
  }
});
