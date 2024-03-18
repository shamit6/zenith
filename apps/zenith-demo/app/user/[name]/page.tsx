import { getUserValue } from "./get-user-value.go";

export default async function UserPage({ params: { name } }) {
  const value = await getUserValue(name);

  return (
    <div>
      <div>User: {name}</div>
      <div>value: {value}</div>
    </div>
  );
}
