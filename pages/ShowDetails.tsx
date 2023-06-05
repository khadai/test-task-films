import { Image, Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { RootStackParamList } from '../types/RootStackParamList';

type ShowDetailsScreenProps = {
    route: RouteProp<RootStackParamList, 'ShowDetails'>;
};

const ShowDetails: React.FC<ShowDetailsScreenProps> = ({ route }) => {
    const { title, image, genres, rating, showSchedule, showSummary, status, link } = route.params;
    const handleLinkPress = () => {
        if (link != null) {
            Linking.openURL(link);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
                <Text variant="headlineLarge">{title}</Text>
                <Text variant="bodyLarge" style={styles.boldFont}>
                    Genres:{' '}
                    {genres?.map((item, index) => (
                        <Text key={index}>
                            {item}
                            {index + 1 >= genres?.length ? '' : ' | '}
                        </Text>
                    ))}
                </Text>
                {rating && (
                    <Text variant="bodyLarge" style={styles.boldFont}>
                        Rating: <Text>{rating}</Text>
                    </Text>
                )}
                {showSchedule && showSchedule.days && showSchedule.time && (
                    <Text variant="bodyLarge">
                        <Text style={styles.boldFont}>Schedule: </Text>
                        {showSchedule?.days?.map((item, index) => (
                            <Text key={index}>
                                {item}
                                {index + 1 >= showSchedule.days!.length ? '' : ', '}
                            </Text>
                        ))}{' '}
                        at {showSchedule?.time}
                    </Text>
                )}
                <Text variant="bodyLarge" style={styles.boldFont}>
                    Show's Summary:
                </Text>
                <Text variant="bodyLarge">{showSummary}</Text>
                <Text variant="bodyLarge" style={styles.boldFont}>
                    Status: <Text>{status}</Text>
                </Text>
                <TouchableOpacity onPress={handleLinkPress}>
                    <Text variant="bodyLarge" style={[styles.boldFont, styles.linkText]}>
                        Link to show
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 16,
    },
    boldFont: {
        fontWeight: 'bold',
    },
    linkText: {
        color: 'blue',
    },
    image: {
        height: 500,
        borderRadius: 8,
    },
});

export default ShowDetails;
