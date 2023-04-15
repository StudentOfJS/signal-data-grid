import './index.css';
import './App.css';
import { Table } from './SignalTable/Table';
import { useEffect, useState } from 'react';
import { generateTestData, type TestData } from './generateData';

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const [rowData, setRowData] = useState<TestData[]>()

  useEffect(() => {
    const data = generateTestData(100);
    setRowData(data)
    setLoading(false)
  }, [])
  return (
    <div className="App">
      {loading ? (<h1>Creating mock data</h1>) : (<h1>React Signals Data Grid</h1>)}
      <div className="pt-10 mt-10">
        <Table
          rowData={rowData}
          columnDefs={[
            {
              field: 'date',
              isEditable: true,
              cellOptions: { type: 'date' },
            },
            {
              field: 'test2',
              cellOptions: { type: 'number' },
              isSortable: true,
            },
            {
              field: 'test3',
              isEditable: true,
              cellOptions: { type: 'email' },
              isSortable: true,
            },
          ]}
          foreignKey={'id'}
          handleSubmit={(data) => {
            console.log(data);
          }}
          renderButton={() => <button type="submit">Save</button>}
        />
      </div>
    </div>
  );
}

export default App;
