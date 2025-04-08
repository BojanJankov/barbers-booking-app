const styles = {
  wrapper:
    "min-h-screen flex items-center justify-center bg-dark text-font px-4 py-8",
  card: "bg-[--color-mid] p-10 rounded-lg shadow-xl w-full max-w-2xl",
  title: "text-3xl font-semibold mb-8 text-center text-font",
  form: "flex flex-col gap-6",
  input:
    "bg-dark placeholder-[--color-font] border border-[--color-border] text-font rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[--color-border]",
  button:
    "mt-4 bg-border hover:bg-[--color-light] text-font px-6 py-2 rounded transition-colors duration-200",
};

export const RegisterPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Register</h2>
        <form className={styles.form}>
          <input
            className={styles.input}
            placeholder="First Name"
            name="firstName"
            required
          />
          <input
            className={styles.input}
            placeholder="Last Name"
            name="lastName"
            required
          />
          <input
            className={styles.input}
            placeholder="Username"
            name="username"
            required
          />
          <input
            className={styles.input}
            placeholder="Email"
            type="email"
            name="email"
            required
          />

          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            name="password"
            required
          />

          <button
            type="submit"
            className="bg-[--color-border] hover:bg-[--color-light] text-[--color-dark]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
