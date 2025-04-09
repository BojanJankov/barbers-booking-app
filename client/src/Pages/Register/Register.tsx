import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useContext } from "react";
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
    "mt-4 bg-border hover:bg-light text-dark px-6 py-2 rounded transition-colors duration-200 cursor-pointer",
};

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useContext(AuthContext);

  const { register, handleSubmit } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmitRegister = async (body: RegisterFormValues) => {
    try {
      const response = await api.post("/auth/register", body);

      console.log(response);
      navigate("/login");
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
        <h2 className={styles.title}>Register</h2>
        <form
          className={styles.form}
          method="POST"
          action=""
          onSubmit={handleSubmit((data) => {
            onSubmitRegister(data);
          })}
        >
          <input
            className={styles.input}
            placeholder="First Name"
            required
            {...register("firstName", { required: true })}
          />
          <input
            className={styles.input}
            placeholder="Last Name"
            required
            {...register("lastName", { required: true })}
          />
          <input
            className={styles.input}
            placeholder="Username"
            required
            {...register("username", { required: true })}
          />
          <input
            className={styles.input}
            placeholder="Email"
            type="email"
            required
            {...register("email", { required: true })}
          />

          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            required
            {...register("password", { required: true })}
          />

          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
