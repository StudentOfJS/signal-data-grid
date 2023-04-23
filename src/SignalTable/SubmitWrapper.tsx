import { ReactNode, useContext } from 'react';
import { TableContext } from '../SignalTable/Table';

interface SubmitProps {
  children: ReactNode;
  handleSubmit?: (
    data: Array<Record<string, string | number | boolean | null | undefined>>
  ) => void;
}

export function SubmitWrapper({ children, handleSubmit }: SubmitProps) {
  const ctx = useContext(TableContext);
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (
      handleSubmit &&
      ctx?.cellChangeMap &&
      ctx?.sortedRows &&
      ctx?.foreignKey
    ) {
      const { cellChangeMap, sortedRows, foreignKey } = ctx;
      let r = [...cellChangeMap.value]
        .map(([key, value]) => {
          let [rowId, name] = key.split('|');
          let row = sortedRows.value.find(
            (r) => String(r[foreignKey]) === rowId
          );
          if (row) {
            row[name] = value;
          }
          return row;
        })
        .reduce<
          Array<Record<string, string | number | boolean | null> | undefined>
        >(
          (arr, curr) =>
            !!curr && !arr.find((x) => x![foreignKey] === curr[foreignKey])
              ? [...arr, curr]
              : arr,
          []
        );
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
