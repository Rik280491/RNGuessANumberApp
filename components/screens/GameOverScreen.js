import React, { useState, useEffect } from "react";
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
	const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
		Dimensions.get("window").width
	);
	const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
		Dimensions.get("window").height
	);

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceWidth(Dimensions.get("window").width);
			setAvailableDeviceHeight(Dimensions.get("window").height);
		};

		Dimensions.addEventListener("change", updateLayout);

		return () => {
			Dimensions.removeEventListener("change", updateLayout);
		};
	});

	return (
		<ScrollView>
			<View style={styles.screen}>
				<TitleText>Winner!</TitleText>
				<View
					style={{
						...styles.imageContainer,
						...{
							width: availableDeviceWidth * 0.7,
							height: availableDeviceWidth * 0.7,
							borderRadius: (availableDeviceWidth * 0.7) / 2,
							marginVertical: availableDeviceHeight / 30,
						},
					}}
				>
					<Image
						source={require("../../assets/success.png")}
						style={styles.image}
						resizeMode="cover"
					/>
					{/* for network images: source={{uri: "https://..."}} */}
				</View>
				<View
					style={{
						...styles.resultContainer,
						...{ marginVertical: availableDeviceHeight / 60 },
					}}
				>
					{/* Unlike other components, styles set on Text components are passed down to nested Text components, and doesn't use flexbox by default */}
					<BodyText
						style={{
							...styles.resultText,
							...{
								fontSize: availableDeviceHeight < 400 ? 16 : 20,
							},
						}}
					>
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
		paddingVertical: 10,
	},
	imageContainer: {
		borderWidth: 3,
		borderColor: "black",
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	resultContainer: {
		marginHorizontal: 30,
	},
	resultText: {
		textAlign: "center",
	},
	highlight: {
		color: Colours.primary,
		fontFamily: "open-sans-bold",
	},
});

export default GameOverScreen;
