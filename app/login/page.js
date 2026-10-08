import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Log in" };

// No cookies are read while rendering, so this page is static (○).
// The login itself happens in a server action.
export default function LoginPage() {
  return (
    <section>
      <h1>Log in</h1>
      <p className="muted">Demo password: addis123 (use the name “admin” for the admin role).</p>
      <LoginForm />
    </section>
  );
}