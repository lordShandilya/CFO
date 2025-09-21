import { ExpenseList } from "@/components/ExpenseList";
import { ScrollView } from "react-native";

export default function Index() {
  return (
    
    <ScrollView
      contentContainerStyle = {{
        
        marginTop: 20
      }}
    >
       <ExpenseList/>
    </ScrollView>
  );
}
