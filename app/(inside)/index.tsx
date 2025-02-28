import { 
    View,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import { rooms } from '../../assets/data/rooms';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';

type CustomButtonProps = {
    onPress: () => void;
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
    primary?: boolean;
};

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, icon, text, primary }) => (
    <TouchableOpacity 
        onPress={onPress} 
        style={[styles.button, primary ? styles.buttonPrimary : styles.buttonSecondary]} 
        activeOpacity={0.9}
    >
        <Ionicons name={icon} size={18} color="#fff" />
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
);

const Page = memo(() => {
    const router = useRouter();

    const onStartMeeting = () => {
        const randomId = Math.floor(Math.random() * 1000000000).toString();
        router.push(`/inside/room/${randomId}`);
    };

    const onJoinMeeting = () => {
        Alert.prompt(
            'Join Meeting',
            'Enter your Call ID:',
            (id) => {
                if (id && id.trim() !== '') {
                    router.push(`/inside/room/${id}`);
                }
            },
            'plain-text'
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Image source={require('../../assets/images/logo.jpeg')} style={styles.logo} />
                <Text style={styles.appTitle}>BornwithWealth Connect</Text>
            </View>

            <View style={styles.headerButtons}>
                <CustomButton onPress={onStartMeeting} icon="videocam-outline" text="Start Live" primary />
                <CustomButton onPress={onJoinMeeting} icon="enter-outline" text="Join by ID" />
            </View>

            <View style={styles.featureButtons}>
                <CustomButton onPress={() => {}} icon="chatbubble-ellipses-outline" text="Chat Rooms" />
                <CustomButton onPress={() => {}} icon="compass-outline" text="Explore" />
                <CustomButton onPress={() => {}} icon="calendar-outline" text="Schedule Live" />
            </View>

            <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>Live Streaming Rooms</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.roomGrid}>
                {rooms.map((room) => (
                    <Link key={room.id} href={`/inside/room/${room.id}`} asChild>
                        <TouchableOpacity activeOpacity={0.85}>
                            <ImageBackground source={room.img} style={styles.image} imageStyle={styles.imageStyle}>
                                <View style={styles.overlay}>
                                    <Text style={styles.roomText}>{room.name}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
    },
    contentContainer: {
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 10,
        borderRadius:25,
        borderColor:'#FFFFFF',
        borderWidth:1,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    featureButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,

    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        paddingVertical: 14,
        paddingHorizontal:14,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        borderColor:'#4CAF50',
       borderWidth:1,
    },
    buttonPrimary: {
        backgroundColor: '#6c00b2',
        // backgroundColor: '#8E00FF',
        borderColor: '#FFFFFF',
        borderWidth: 1,
    },
    buttonSecondary: {
        backgroundColor: '#115f84',
        // backgroundColor: '#0055A4',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#fff',
        marginLeft: 2,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1.5,
        backgroundColor: '#fff',
    },
    dividerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 15,
    },
    roomGrid: {
        flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
    },
    image: {
        width: WIDTH > HEIGHT ? WIDTH / 3.5 : WIDTH - 40,
        height: 230,
        borderRadius: 14,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#000',
    },
    imageStyle: {
        borderRadius: 14,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 14,
    },
    roomText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        textAlign: 'center',
    },
});

export default Page;

