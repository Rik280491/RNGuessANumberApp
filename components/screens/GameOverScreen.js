import React from "react";
import {
	View,
	Text,
	Image,
	Dimensions,
	ScrollView,
	StyleSheet,
} from "react-native";
import TitleText from "../TitleText";
import BodyText from "../BodyText";
import MainButton from "../MainButton";
import Colours from "../../constants/colours";

const GameOverScreen = (props) => {
	return (
		<ScrollView>
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
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	imageContainer: {
		width: Dimensions.get("window").width * 0.7,
		height: Dimensions.get("window").width * 0.7,
		borderRadius: (Dimensions.get("window").width * 0.7) / 2,
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
		marginVertical: Dimensions.get("window").height / 30,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: Dimensions.get("window").height / 60,
	},
	resultText: {
		textAlign: "center",
		fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
	},
	highlight: {
		color: Colours.primary,
		fontFamily: "open-sans-bold",
	},
});

export default GameOverScreen;
