import { ReactNode } from 'react';
import { cellChangeMap } from './Table';

interface SubmitProps {
  children: ReactNode;
  handleSubmit?: (
    data: Array<Record<string, string | number | boolean | null | undefined>>
  ) => void;
}

export function SubmitWrapper({ children, handleSubmit }: SubmitProps) {
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    return [...cellChangeMap.value]
  };

  if (!handleSubmit) return <>{children}</>;
  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      {children}
    </form>
  );
}
