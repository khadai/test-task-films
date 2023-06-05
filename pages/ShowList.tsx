import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SearchForm, ShowListItem } from '../components';
import React, { useEffect, useState } from 'react';
import { Show } from '../types/Show';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchStatus } from '../redux/slice';
import { RootStackParamList } from '../types/RootStackParamList';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'ShowList'>;
}

const ShowList: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();

    const searchValue = useSelector((state: any) => state.shows.searchValue);
    const searchStatus = useSelector((state: any) => state.shows.searchStatus);

    const [shows, setShows] = useState<Show[]>();
    const fetchData = async (searchTerm: string) => {
        try {
            const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
            const data = await response.json();
            const resultingData = data.map((item: any) => _transformShow(item.show));

            if (resultingData.length === 0) {
                dispatch(setSearchStatus('empty'));
            } else {
                dispatch(setSearchStatus('success'));
            }
            setShows(resultingData);

            return resultingData;
        } catch (error) {
            console.log(error);
            dispatch(setSearchStatus('failed'));
        }
    };

    const _transformShow = (show: any) => {
        return {
            id: show.id,
            title: show.name,
            image: show.image?.medium,
            rating: show.rating.average,
            genres: show.genres,
            link: show.url,
            status: show.status,
            showSchedule: show.schedule,
            showSummary: show.summary?.replace(/<\/?[^>]+(>|$)/g, ''),
        };
    };

    useEffect(() => {
        if (searchValue !== '') {
            fetchData(searchValue);
        }
    }, [searchValue, searchStatus]);
    const onListItemPress = (show: Show) => {
        navigation.navigate('ShowDetails', show);
    };

    let content;
    switch (searchStatus) {
        case 'initial':
            content = <Text style={styles.infoText}>Type the show's name</Text>;
            break;
        case 'loading':
            content = <Text style={styles.infoText}>Loading...</Text>;
            break;
        case 'empty':
            content = <Text style={styles.infoText}>Sorry, nothing find for this search</Text>;
            break;
        case 'success':
            content = (
                <FlatList
                    data={shows}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onListItemPress(item)}>
                            <ShowListItem {...item} />
                        </TouchableOpacity>
                    )}
                />
            );
            break;
        default:
            content = <Text style={styles.infoText}>Error happened, please try again later</Text>;
            break;
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <SearchForm />
            </View>
            <View style={styles.contentBox}>
                <View>{content}</View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBox: {
        height: 100,
    },
    contentBox: {
        height: '83%',
    },
    infoText: {
        textAlign: 'center',
    },
});

export default ShowList;
