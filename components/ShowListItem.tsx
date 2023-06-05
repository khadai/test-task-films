import { Image, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { Show } from '../types/Show';
import { RouteProp } from '@react-navigation/native';

interface Props extends Show {}

export default function ShowListItem({ title, rating, image }: Props) {
    return (
        <List.Item
            title={title}
            description={rating}
            style={styles.listItem}
            left={(props) => <Image style={styles.avatar} source={{ uri: image }} />}
        />
    );
}

const styles = StyleSheet.create({
    listItem: {
        paddingLeft: 12,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 8,
    },
});
