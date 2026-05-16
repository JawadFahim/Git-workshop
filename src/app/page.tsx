import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const username = cookieStore.get("session_user")?.value;

  if (!username) {
    redirect("/login");
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.greeting}>Welcome, {username}!</h1>
        <p style={styles.sub}>You are logged in.</p>
        <form action="/api/logout" method="POST">
          <button type="submit" style={styles.button}>
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    fontFamily: "sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "2rem 2.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  greeting: {
    fontSize: "1.75rem",
    fontWeight: 600,
    margin: "0 0 0.5rem",
  },
  sub: {
    color: "#555",
    margin: "0 0 1.5rem",
  },
  button: {
    padding: "0.6rem 1.25rem",
    backgroundColor: "#e00",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "0.95rem",
    cursor: "pointer",
    fontWeight: 500,
  },
};
