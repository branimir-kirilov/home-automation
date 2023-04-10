import Toast from 'react-native-toast-message';

export default class ToastsService {
    static showErrorToast(message: string) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: message
        });
    }

    static showSuccessToast(message: string) {
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: message
        });
    }
}
