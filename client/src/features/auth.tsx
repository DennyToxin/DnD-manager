import { useCurrentQuery } from "../share/auth"

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
}