import './index.css';
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
    <div className="w-full flex flex-col items-center">
      {loading ? (<h1 className="text-5xl">Creating mock data</h1>) : (<h1 className="text-5xl">React Signals Data Grid</h1>)}
      <div className="pt-10">
        <Table
          rowData={rowData}
          groupBy={'group'}
          showGroupByColumn={true}
          columnDefs={[
            {
              field: 'date',
              isEditable: true,
              cellOptions: { type: 'date' },
            },
            {
              field: 'random',
              cellOptions: { type: 'number' },
              isSortable: true,
            },
            {
              field: 'email',
              isEditable: true,
              cellOptions: { type: 'email' },
              validation: (value) => {
                let at = (value as string).indexOf("@")
                if(at === -1) return false;
                let name = (value as string).slice(0, at)
                if(!name?.length) return false
                let end = (value as string).slice(at + 1)
                if(!end?.length || end.length < 5 || (end.slice(end.indexOf("."))?.length ?? 0) < 3) return false
                return true
              },
              isSortable: true,
            },
            {
              field: 'group',
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
