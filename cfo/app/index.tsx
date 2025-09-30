import { ExpenseList } from "@/components/ExpenseList";
import { ManualExpenseAdder } from "@/components/ManualExpenseAdder";
import { initDB } from "@/utils/db";
import { captureTransaction } from "@/utils/ocr";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, MD3DarkTheme, Modal, PaperProvider, Portal } from "react-native-paper";



export default function Index() {
  useEffect(() => {
    initDB();
  }, []);

  const [image, setImage] = useState<string>("");
  const [showManualAdder, setShowManualAdder] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    // TODO: Implement ocr logic here
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    captureTransaction(image);
  };
  
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <View style= {{alignItems: 'center', padding: 30, backgroundColor: 'white', height: '100%'}}>
        <ExpenseList/>
        <Portal>
          <Modal visible={showManualAdder} onDismiss={() => setShowManualAdder(false)} contentContainerStyle={styles.modal}>
            <ManualExpenseAdder />
          </Modal>
        </Portal>
        <Button mode="contained" onPress={() => setShowManualAdder(true)}>Add Expense</Button>
        <Button mode="contained" style={{ marginTop: 20 }} onPress={pickImage}>Import Expenses</Button>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  modal: {
    
    backgroundColor: '#121212', 
    padding: 20,
    marginLeft: '20%',
    borderRadius: 10, 
    shadowOpacity: 0.5, 
    width: '60%', 
    alignItems: 'center'
  }
});
