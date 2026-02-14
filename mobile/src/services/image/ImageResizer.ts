export class ImageResizer {
    static async resize(uri: string, width: number, height: number) {
        return { uri, width, height };
    }
}
