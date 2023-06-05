import { StyleSheet, View } from 'react-native';
import React from 'react';
import { HelperText, IconButton, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setSearchStatus, setSearchValue } from '../redux/slice';

const SearchForm: React.FC = () => {
    const dispatch = useDispatch();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<{ searchValue: string }>({
        defaultValues: {
            searchValue: '',
        },
    });
    const onSubmit = (data: { searchValue: string }) => {
        dispatch(setSearchStatus('loading'));
        dispatch(setSearchValue(data.searchValue));
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.searchField}
                            placeholder="Start typing"
                            label="Search"
                            mode="outlined"
                            keyboardType="web-search"
                            returnKeyType="done"
                            value={value}
                            onChangeText={(text) => onChange(text)}
                            {...register('searchValue')}
                        />
                    )}
                    name="searchValue"
                    rules={{
                        required: 'Search required',
                        minLength: {
                            value: 2,
                            message: 'At least 2 characters',
                        },
                    }}
                />
                <IconButton icon="magnify" mode="contained" size={30} onPress={handleSubmit(onSubmit)} />
            </View>
            <HelperText type="error" visible={!isValid}>
                {errors?.searchValue?.message}
            </HelperText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        marginTop: 12,
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    searchField: {
        flexGrow: 5,
    },
});

export default SearchForm;
