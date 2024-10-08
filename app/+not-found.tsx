import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text, Button, IconButton } from 'react-native-paper';
import { Warning } from 'phosphor-react-native'; // Import the warning icon

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Surface style={styles.container}>
        <IconButton
          icon={() => <Warning size={48} color="#FFB74D" />} // Using Phosphor icon
          style={styles.icon}
          size={64}
        />
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => { /* navigate to home screen */ }}
        >
          Go to home screen!
        </Button>
      </Surface>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    elevation: 4,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 15,
  },
});
