import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Dimensions,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import Card from "../../components/Card";
import Input from "../Input";
import NumberContainer from "../NumberContainer";
import TitleText from "../TitleText";
import BodyText from "../BodyText";
import MainButton from "../../components/MainButton";
import Colours from "../../constants/colours";

const StartGameScreen = (props) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();
	const [buttonWidth, setButtonWidth] = useState(
		Dimensions.get("window").width / 4
	);

	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const resetInputHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	useEffect(() => {
		// Dimensions are only calculated once when the app starts. If you rotate the device, it will not recalculate if you come back to the initial orientation.
		// Hence a change listener is neccessary here.
		const updateLayout = () => {
			setButtonWidth(Dimensions.get("window").width / 4);
		};

		Dimensions.addEventListener("change", updateLayout);
		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				"Invalid Number!",
				"Number has to be a number between 1 and 99",
				[{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
			);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue("");
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You selected</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton onPress={() => props.onStartGame(selectedNumber)}>
					START GAME
				</MainButton>
			</Card>
		);
	}

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss();
					}}
				>
					<View style={styles.screen}>
						<TitleText style={styles.title}>Start a New Game!</TitleText>
						<Card style={styles.inputContainer}>
							<BodyText>Select a Number</BodyText>
							<Input
								style={styles.input}
								blurOnSubmit
								keyboardType="number-pad"
								maxLength={2}
								onChangeText={numberInputHandler}
								value={enteredValue}
							/>
							<View style={styles.buttonContainer}>
								<View style={{ width: buttonWidth }}>
									<Button
										title="Reset"
										onPress={resetInputHandler}
										color={Colours.accent}
									/>
								</View>
								<View style={{ width: buttonWidth }}>
									<Button
										title="Confirm"
										onPress={confirmInputHandler}
										color={Colours.primary}
									/>
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
	},
	inputContainer: {
		width: "80%",
		minWidth: 300,
		maxWidth: "95%",
		alignItems: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	// button: {
	// 	width: Dimensions.get("window").width / 3.5,
	// },
	input: {
		width: 50,
		textAlign: "center",
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: "center",
	},
});

export default StartGameScreen;
