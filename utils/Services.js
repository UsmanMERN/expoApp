import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error('Error while setting data:', e);
    }
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (e) {
        console.error('Error while fetching data:', e);
        return null;
    }
};

export const api_ENDPOINT = "http://192.168.41.175:8000/api"