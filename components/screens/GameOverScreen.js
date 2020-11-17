import React from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import TitleText from "../TitleText";
import BodyText from "../BodyText";

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
			<BodyText>Number of rounds: {props.numOfRounds}</BodyText>
			<BodyText>Your number was {props.userNumber}</BodyText>
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
});

export default GameOverScreen;
