import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const styles = {
  wrapper:
    "min-h-screen flex items-center justify-center bg-dark text-font px-4 py-8",
  card: "bg-mid p-10 rounded-lg shadow-xl w-full max-w-2xl",
  title: "text-3xl font-semibold mb-8 text-center text-font",
  form: "flex flex-col gap-6",
  input:
    "bg-mid placeholder-font border border-border text-font rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-border",
  button:
    "mt-4 bg-border hover:bg-light text-dark px-8 py-2 rounded transition-colors duration-200 cursor-pointer",
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, logout, accessToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitLogin = async (event: any) => {
    event.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const user = response.data;
      const accessToken = response.headers["access-token"];
      const refreshToken = response.headers["refresh-token"];

      localStorage.setItem("user", user);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);

      console.log("User after login:", user);

      login(user, accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (accessToken !== null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-mid p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl text-font font-bold mb-4">Logout</h1>
          <h2 className="text-lg text-font mb-2">
            Are you sure you want to log out?
          </h2>
          <p className="text-sm text-font mb-6">
            You can log out here if you want:
          </p>
          <button
            onClick={logout}
            className="w-full bg-border hover:bg-light text-dark font-semibold py-2 px-4 rounded-xl transition-colors cursor-pointer"
          >
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <form
          className={styles.form}
          action=""
          method="POST"
          onSubmit={onSubmitLogin}
        >
          <input
            className={styles.input}
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
