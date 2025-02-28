import React from 'react';
import { useCallStateHooks } from '@stream-io/video-react-native-sdk';
import { View, StyleSheet, Text } from 'react-native';

const CustomTopView = () => {
	// Extracting useParticipants hook from useCallStateHooks
	const { useParticipants } = useCallStateHooks();
	const participants = useParticipants(); // This fetches the list of participants in the call

	return (
		<View style={styles.topContainer}>
			<Text ellipsizeMode="tail" numberOfLines={1} style={styles.topText}>
				{participants.length} participant{participants.length !== 1 ? 's' : ''} in the Video Call
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	topContainer: {
		width: '80%',
		alignSelf: 'center', // Centers horizontally
		height: 50,
		backgroundColor: 'rgba(3, 51, 193, 0.5)', // Better transparency
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10, // Adds slight rounding
	},
	topText: {
		color: '#FFF',
		fontSize: 14,
		paddingHorizontal: 15,
		fontWeight: '500', // Enhancing readability
	},
});

export default CustomTopView;


// import { useCallStateHooks } from '@stream-io/video-react-native-sdk';
// import { View, StyleSheet, Text } from 'react-native';

// // Custom View to display the number of participants in the call
// const CustomTopView = () => {
// 	const { useParticipants } = useCallStateHooks();
// 	const participants = useParticipants();

// 	return (
// 		<View style={styles.topContainer}>
// 			<Text ellipsizeMode="tail" numberOfLines={1} style={styles.topText}>
// 				{participants.length} participant{participants.length > 1 ? 's' : ''} in the Video Call
// 			</Text>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	topContainer: {
// 		width: '75%',
// 		position: 'absolute',
// 		left: '25%',
// 		height: 50,
// 		backgroundColor: '#0333c17c',
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	},
// 	topText: {
// 		color: 'white',
// 		fontSize: 14,
// 		padding: 10
// 	}
// });

// export default CustomTopView;