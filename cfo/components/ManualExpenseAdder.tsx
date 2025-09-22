import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";


export const ManualExpenseAdder = () => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

  return (
    <View style={{height: '80%',width: '100%', gap: 10, marginBottom: 20}}>
      <TextInput label="Description" value={description} onChangeText={setDescription} />
      <TextInput label="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      <TextInput label="Category" value={category} onChangeText={setCategory} />
      <TextInput label="Date" value={date} onChangeText={setDate} />
      <Button mode="contained" style={{ marginTop: 10 }} onPress={() => {
        // Handle adding the expense
        console.log({ description, amount, category, date });
      }}>Add</Button>
    </View>
  );
};
