import { ReactNode, useContext } from 'react';
import { TableContext } from '../SignalTable/Table';

interface SubmitProps {
  children: ReactNode;
  handleSubmit?: (
    data: Array<Record<string, string | number | boolean | null | undefined>>
  ) => void;
}

export function SubmitWrapper({ children, handleSubmit }: SubmitProps) {
  const { cellChangeMap, fk, sortedRows } = useContext(TableContext);
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    let r = [...cellChangeMap.value]
      .map(([key, value]) => {
        let [rowId, name] = key.split('|');
        let row = sortedRows.value.find((r) => String(r[fk.value]) === rowId);
        if (row) {
          row[name] = value;
        }
        return row;
      })
      .reduce<
        Array<Record<string, string | number | boolean | null> | undefined>
      >(
        (arr, curr) =>
          !!curr && !arr.find((x) => x![fk.value] === curr[fk.value])
            ? [...arr, curr]
            : arr,
        []
      );
    if (r && handleSubmit) {
      handleSubmit(r as Record<string, string | number | boolean | null>[]);
    }
  };

  if (!handleSubmit) return <>{children}</>;
  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      {children}
    </form>
  );
}
