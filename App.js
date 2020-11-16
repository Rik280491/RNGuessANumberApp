import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./components/screens/StartGameScreen";
import GameScreen from "./components/screens/GameScreen";
import GameOverScreen from "./components/screens/GameOverScreen";

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [gameDuration, setGameDuration] = useState(0);

	const configureNewGameHandler = () => {
		setGameDuration(0);
		setUserNumber(null);
	};

	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber);
		setGameDuration(0);
	};

	const gameOverHandler = (numOfRounds) => {
		setGameDuration(numOfRounds);
	};

	let content = <StartGameScreen onStartGame={startGameHandler} />;
	if (userNumber && gameDuration === 0) {
		content = (
			<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
		);
	} else if (gameDuration > 0) {
		content = (
			<GameOverScreen
				numOfRounds={gameDuration}
				userNumber={userNumber}
				onRestart={configureNewGameHandler}
			/>
		);
	}

	return (
		<View style={styles.screen}>
			<Header title="Guess a Number" />
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
