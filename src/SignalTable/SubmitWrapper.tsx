import { ReactNode } from 'react';
import { cellChangeMap, rows, fk } from './Table';

interface SubmitProps {
  children: ReactNode;
  handleSubmit?: (
    data: Array<Record<string, string | number | boolean | null | undefined>>
  ) => void;
}

export function SubmitWrapper({ children, handleSubmit }: SubmitProps) {
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (handleSubmit && cellChangeMap.value && rows.value && fk.value) {
      let r = [...cellChangeMap.value]
        .map(([key, value]) => {
          let [rowId, name] = key.split('|');
          let row = rows.value.find((r) => String(r[fk.value]) === rowId);
          if (row) {
            row[name] = value;
            delete row.element;
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
