import TextRecognition from "@react-native-ml-kit/text-recognition";


export const captureTransaction = async (uri: string) => {
    try {
        const resultFromCapture = await TextRecognition.recognize(uri);
        console.log(resultFromCapture.text);
    } catch (err) {
        console.error("Error while capturing the text", err);
    }
}