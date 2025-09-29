import { ExpenseProps, getExpenses } from "@/utils/db";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";



export const ExpenseList = () => {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemPerPageChange] = useState(numberOfItemsPerPageList[0]);

  const [data, setData] = useState<ExpenseProps[]>([]);



  useEffect(() => {
    const loadData = async () => {
      try
      {
        const rows: ExpenseProps[] = await getExpenses();
        setData(rows);
      } catch (err) {
        console.error("Error while setting expense data", err);
      }
    };
    loadData();
  })

  const from = page * itemsPerPage;
  const to = Math.min((page+1)*itemsPerPage, data.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <DataTable style={[styles.table]} >
        <DataTable.Header style= {styles.columns}>
          <DataTable.Title>Discription</DataTable.Title>
          <DataTable.Title numeric style={{marginRight: '10%'}}>Amount</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>

        {data.length === 0 ? (
          <DataTable.Row>
            <DataTable.Cell>The tabel is empty</DataTable.Cell>
          </DataTable.Row>
        ) :(data.slice(from, to).map((item) => (
          <DataTable.Row key={item.id} style={styles.rows}>
            <DataTable.Cell>{item.description}</DataTable.Cell>
            <DataTable.Cell numeric style={{marginRight: '10%'}}>{item.amount}</DataTable.Cell>
            <DataTable.Cell>{item.category}</DataTable.Cell>
            <DataTable.Cell>{item.date}</DataTable.Cell>
          </DataTable.Row>
        ))
        )}
        <DataTable.Row>
          <DataTable.Cell>Total:</DataTable.Cell>
          <DataTable.Cell numeric>{total}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(data.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${data.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  )

}

const styles = StyleSheet.create({
  table: {
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 20,
    margin: 30,
    backgroundColor: '#121212',
    color: 'black', 
    gap: 10,
    justifyContent: 'space-between',

  },
  columns: {
    justifyContent: 'space-between'
  },
  rows: {
    justifyContent: 'space-between'
  }
})