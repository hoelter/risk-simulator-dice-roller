import React from 'react';
import { StyleSheet, Text, ScrollView, View, Button } from 'react-native';
import { screens, iOS } from './helpers';

export default function BattleSummary({ history, resetGameState, setScreen }) {
  const onStartNewSimulation = () => {
    resetGameState();
    setScreen(screens.welcome);
  }

  return (
    <ScrollView style={styles.scrollView}>
      {history.map((state, index) => {
        if (index === 0) {
          return (
            <View key={index} style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{`Starting Troops`}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{`Attackers: ${state.numAttackers}`}</Text>
                <Text style={styles.text}>{`Defenders: ${state.numDefenders}`}</Text>
              </View>
            </View>
          );
        }
        return (
          <View key={index} style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{`Round ${index}`}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{`Attackers: ${state.numAttackers}`}</Text>
              <Text style={styles.text}>{`Defenders: ${state.numDefenders}`}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{`Attack Rolls: ${state.attackRolls}`}</Text>
              <Text style={styles.text}>{`Defense Rolls: ${state.defenseRolls}`}</Text>
            </View>
          </View>
        );
      })}
      <Button
        color={iOS ? 'white' : 'black'}
        title="Start New Simulation"
        accessibilityLabel="Start New Simulation"
        onPress={onStartNewSimulation}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20
  },
  container: {
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    flex: 1,
    fontSize: 18
  },
});
