import { fetcher } from "../../src/fetcher";
import useSWR from "swr";
// import { getUsers } from './get-users.go'

export function AdminPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const { data: users, mutate } = useSWR("/api/user", fetcher);
  // const { data: users, mutate } = useSWR("/api/user", getUsers); // Using server action

  // or just import as a server action
  const createUser = async () => {
    await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ name: usernameRef.current.value }),
    });
  };

  return (
    <main>
      <div>Admin Page</div>
      <div>
        {users ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          "loading..."
        )}
      </div>
      <div>
        <input type="text" placeholder="username" ref={usernameRef} />
        <button
          onClick={async () => {
            mutate(createUser);
          }}
        >
          Add User
        </button>
      </div>
    </main>
  );
}
