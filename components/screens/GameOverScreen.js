import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import TitleText from "../TitleText";
import BodyText from "../BodyText";
import MainButton from "../MainButton";
import Colours from "../../constants/colours";

const GameOverScreen = (props) => {
	return (
		<View style={styles.screen}>
			<TitleText>Winner!</TitleText>
			<View style={styles.imageContainer}>
				<Image
					source={require("../../assets/success.png")}
					style={styles.image}
					resizeMode="cover"
				/>
				{/* for network images: source={{uri: "https://..."}} */}
			</View>
			<View style={styles.resultContainer}>
				{/* Unlike other components, styles set on Text components are passed down to nested Text components, and doesn't use flexbox by default */}
				<BodyText style={styles.resultText}>
					The app needed{" "}
					<Text style={styles.highlight}>{props.numOfRounds}</Text> rounds to
					guess the number{" "}
					<Text style={styles.highlight}>{props.userNumber}</Text>
				</BodyText>
			</View>
			<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: 30,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: 15,
	},
	resultText: {
		textAlign: "center",
		fontSize: 20,
	},
	highlight: {
		color: Colours.primary,
		fontFamily: "open-sans-bold",
	},
});

export default GameOverScreen;
