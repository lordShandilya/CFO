import { ExpenseList } from "@/components/ExpenseList";
import { View } from "react-native";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";


export default function Index() {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <View style= {{alignItems: 'center', padding: 30, backgroundColor: 'white', height: '100%'}}>
        <ExpenseList/>
        
      </View>
    </PaperProvider>
  );
}
