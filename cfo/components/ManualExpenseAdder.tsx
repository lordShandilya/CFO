import { addExpense, ExpenseProps } from "@/utils/db";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export const ManualExpenseAdder = () => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Expense</Text>
      <TextInput label="Description" value={description} onChangeText={setDescription} style={styles.fields}/>
      <TextInput label="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} style={styles.fields}/>
      <TextInput label="Category" value={category} onChangeText={setCategory} style={styles.fields}/>
      <TextInput label="Date" value={date} onChangeText={setDate} style={styles.fields}/>
      <Button mode="contained" style={{ marginTop: 10 }} onPress={async () => {
        const expense: ExpenseProps = {
          description: description,
          amount: parseInt(amount, 10),
          category: category,
          date: date
        };
        await addExpense(expense);
        console.log({ description, amount, category, date });
      }}>Add</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: 30,
    marginBottom: 20  
  },
  container: {
    width: '95%', 
    padding: 10,
    marginBottom: 20, 
    alignItems: 'center',
    alignSelf: 'center'
  },
  fields: {
    margin: '5%',
    width: '80%'
  }

})
