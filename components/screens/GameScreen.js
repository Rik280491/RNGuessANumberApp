import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, FlatList, Dimensions } from "react-native";
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

// fn previously used with ScrollView
//
// const renderListItem = (value, numOfRound) => (
// 	<View key={value} style={styles.listItem}>
// 		<BodyText>#{numOfRound}</BodyText>
// 		<BodyText>{value}</BodyText>
// 	</View>
// );

const renderListItem = (itemData, listLength) => (
	<View style={styles.listItem}>
		<BodyText>#{listLength - itemData.index}</BodyText>
		<BodyText>{itemData.item}</BodyText>
	</View>
);

const GameScreen = (props) => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
		Dimensions.get("window").width
	);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get("window").height
	);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		let isMounted = true;
		const updateLayout = () => {
			setAvailableDeviceWidth(Dimensions.get("window").width);
			setAvailableDeviceHeight(Dimensions.get("window").height);
		};

		Dimensions.addEventListener("change", updateLayout);
		return () => {
			Dimensions.removeEventListener("change", updateLayout);
			isMounted = false;
		};
	});

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
		setPastGuesses((curPastGuesses) => [
			nextNumber.toString(),
			...curPastGuesses,
		]);
	};

	// alt to ternary in stylesheet
	let listContainerStyle = styles.listContainer;

	if (availableDeviceWidth < 350) {
		listContainerStyle = styles.listContainerBig;
	}

	let gameControls = (
		<>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card
				style={{
					...styles.buttonContainer,
					...{ marginTop: availableDeviceHeight > 600 ? 20 : 5 },
				}}
			>
				<MainButton onPress={() => nextGuessHandler("lower")}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton onPress={() => nextGuessHandler("greater")}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
		</>
	);

	if (availableDeviceHeight < 500) {
		gameControls = (
			<View style={styles.controls}>
				<MainButton onPress={() => nextGuessHandler("lower")}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<NumberContainer>{currentGuess}</NumberContainer>

				<MainButton onPress={() => nextGuessHandler("greater")}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<TitleText>Opponent's Guess</TitleText>
			{gameControls}
			<View style={listContainerStyle}>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView> */}
				<FlatList
					keyExtractor={(item) => item}
					data={pastGuesses}
					renderItem={(item) => renderListItem(item, pastGuesses.length)}
					contentContainerStyle={styles.list}
				/>
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
		width: 400,
		maxWidth: "90%",
	},
	controls: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		width: "80%",
	},
	listContainer: {
		flex: 1,
		// width: Dimensions.get("window").width > 350 ? "60%" : "80%",
		width: "60%",
	},
	// alt to ternary in listContainer
	listContainerBig: {
		flex: 1,
		width: "80%",
	},
	list: {
		flexGrow: 1,
		justifyContent: "flex-end",
	},
	listItem: {
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
});

export default GameScreen;
