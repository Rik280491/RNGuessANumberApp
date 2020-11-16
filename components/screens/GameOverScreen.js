import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const GameOverScreen = (props) => {
	return (
		<View style={styles.screen}>
			<Text>Winner!</Text>
			<Text>Number of rounds: {props.numOfRounds}</Text>
			<Text>Your number was {props.userNumber}</Text>
			<Button title="New Game" onPress={props.onRestart} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default GameOverScreen;
