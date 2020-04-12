import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { iOS } from './helpers';

export default function Body({
  text,
  inputValue,
  setInputValue,
  onPrimaryButton,
  primaryButtonTitle,
  onSecondaryButton,
  secondaryButtonTitle,
  onCenterButton,
  centerButtonTitle
}) {

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.centerText}>{text}</Text>
      {setInputValue &&
        <TextInput
          autoFocus={!inputValue}
          style={styles.inputText}
          keyboardType="number-pad"
          keyboardAppearance="dark"
          selectionColor="white"
          placeholder="  "
          onChangeText={setInputValue}
          value={inputValue}
          maxLength={3}
        />
      }
      {onCenterButton &&
        <View style={styles.centerButton}>
          <Button
            color={iOS ? 'white' : 'black'}
            title={centerButtonTitle}
            accessibilityLabel={centerButtonTitle}
            onPress={onCenterButton}
          />
        </View>
      }
    </View>
    {!!(onPrimaryButton || onSecondaryButton) ?
      <View style={styles.buttonsContainer}>
        {onSecondaryButton && 
          <Button
            color={iOS ? 'white' : 'black'}
            title={secondaryButtonTitle}
            accessibilityLabel={secondaryButtonTitle}
            onPress={onSecondaryButton}
          />
        }
        {onPrimaryButton &&
          <Button
            color={iOS ? 'white' : 'black'}
            title={primaryButtonTitle}
            accessibilityLabel={primaryButtonTitle}
            onPress={onPrimaryButton}
          />
        }
      </View>
    : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  centerText: {
    color: 'white',
    fontSize: 22,
    marginBottom: 20
  },
  inputText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 22,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  centerButton: {
    justifyContent: 'flex-end',
    marginTop: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
