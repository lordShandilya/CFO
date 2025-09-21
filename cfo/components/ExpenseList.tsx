import { FlatList, StyleSheet, Text, View } from "react-native";

type Item = {
    id?: number;
    description: string;
    amount: number;
    category: string;
    date: string;
}
    const data: Item[] = [
        { id: 1, description: "Groceries", amount: 50, category: "Food", date: "2023-01-01" },
        { id: 2, description: "Rent", amount: 1000, category: "Housing", date: "2023-01-01" },
        { id: 3, description: "Utilities", amount: 200, category: "Housing", date: "2023-01-01" },
    ];

export const ExpenseList = () => {

    const renderItem = ({ item }: { item: Item }) => (
        <View style={styles.row}>
      <Text style={[styles.cell, { flex: 2 }]}>{item.description}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>${item.amount}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.category}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.date}</Text>
    </View>
    )

    return (
        <View style={styles.container}>
      {/* Header Row */}
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, { flex: 2 }]}>Description</Text>
        <Text style={[styles.cell, { flex: 1 }]}>Amount</Text>
        <Text style={[styles.cell, { flex: 1 }]}>Category</Text>
        <Text style={[styles.cell, { flex: 1 }]}>Date</Text>
      </View>

      {/* Data Rows */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id !== undefined ? item.id.toString() : item.description}
      />
    </View>
    )
}

const styles = StyleSheet.create({
   container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  header: {
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 2,
  },
  cell: {
    paddingHorizontal: 5,
    textAlign: "center",
  },
})