import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
    const [permission, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const pickImage = async () => {
        if (!permission?.granted) {
            await requestPermission();
        }

        return await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
    };

    return { pickImage, permission };
};
