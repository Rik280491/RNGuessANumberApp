import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../NumberContainer";
import TitleText from "../TitleText";
import Card from "../Card";
import MainButton from "../MainButton";
import BodyText from "../BodyText";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const randomNum = Math.floor(Math.random() * (max - min)) + min;
	if (randomNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return randomNum;
	}
};

const renderListItem = (value, numOfRound) => (
	<View key={value} style={styles.listItem}>
		<BodyText>#{numOfRound}</BodyText>
		<BodyText>{value}</BodyText>
	</View>
);

const GameScreen = (props) => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = (direction) => {
		if (
			(direction === "lower" && currentGuess < props.userChoice) ||
			(direction === "greater" && currentGuess > props.userChoice)
		) {
			Alert.alert(
				"Liars Never Prosper!",
				"Did you think you could trick me? Have you never watched a Sci-Fi movie?",
				[{ text: "Sorry!", style: "cancel" }]
			);
			return;
		}
		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setPastGuesses((curPastGuesses) => [nextNumber.toString(), ...curPastGuesses]);
	};

	return (
		<View style={styles.screen}>
			<TitleText>Opponent's Guess</TitleText>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={() => nextGuessHandler("lower")}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton onPress={() => nextGuessHandler("greater")}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 400,
		maxWidth: "90%",
	},
	listContainer: {
		flex: 1,
		width: "80%",
	},
	list: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "flex-end"
	},
	listItem: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "60%"
	},
});

export default GameScreen;
