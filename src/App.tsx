import './App.css';
import { Table } from './SignalTable/Table';

function App() {
  return (
    <div className="App">
      <Table
        rowData={[
          {
            id: 1,
            date: '10/03/2023',
            test2: 'more testing',
            test3: 'test@test.com',
          },
          {
            id: 2,
            date: '01/01/2023',
            test2: 'more testing',
            test3: 'test1@test.com',
          },
          {
            id: 3,
            date: '12/12/2022',
            test2: 'more testing',
            test3: 'test2@test.com',
          },
        ]}
        columnDefs={[
          {
            field: 'date',
            isEditable: true,
            cellType: 'date',
          },
          {
            field: 'test2',
            isSortable: true,
          },
          {
            field: 'test3',
            isEditable: true,
            cellType: 'email',
          },
        ]}
        foreignKey={'id'}
        handleSubmit={(data) => {
          console.log(data);
        }}
        renderButton={() => <button type="submit">Save</button>}
      />
    </div>
  );
}

export default App;
