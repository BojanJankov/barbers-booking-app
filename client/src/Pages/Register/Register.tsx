import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { styles } from "../../assets/tailwindCss/formTaiwlindCss";
import { useTranslation } from "react-i18next";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "user" | "barber";
}

export const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { accessToken, logout } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "barber",
    },
  });

  const onSubmitRegister = async (body: RegisterFormValues) => {
    try {
      const response = await api.post("/auth/register", {
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        email: body.email,
        password: body.password,
        role: "barber",
      });

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
          <h1 className="text-2xl text-font font-bold mb-4">
            {t("logout-title")}
          </h1>
          <h2 className="text-lg text-font mb-2">{t("logout-text-one")}</h2>
          <p className="text-sm text-font mb-6">{t("logout-text-two")}</p>
          <button
            onClick={logout}
            className="w-full bg-border hover:bg-light text-dark font-semibold py-2 px-4 rounded-xl transition-colors cursor-pointer"
          >
            {t("logout-button")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>{t("register-title")}</h2>
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
            placeholder={t("form-firstName-placeholder")}
            required
            {...register("firstName", {
              required: "Please Enter Your First name",
              minLength: {
                value: 3,
                message: "First name must be at least 3 characters long!",
              },
            })}
          />
          <p className={styles.error}>{errors.firstName?.message}</p>
          <input
            className={styles.input}
            placeholder={t("form-lastName-placeholder")}
            required
            {...register("lastName", {
              required: "Please Enter Your Last name",
              minLength: {
                value: 3,
                message: "First name must be at least 3 characters long!",
              },
            })}
          />
          <p className={styles.error}>{errors.lastName?.message}</p>
          <input
            className={styles.input}
            placeholder={t("form-username-placeholder")}
            required
            {...register("username", {
              required: "Please Enter Your Username",
              minLength: {
                value: 3,
                message: "First name must be at least 3 characters long!",
              },
            })}
          />
          <p className={styles.error}>{errors.username?.message}</p>
          <input
            className={styles.input}
            placeholder={t("form-email-placeholder")}
            type="email"
            required
            {...register("email", {
              required: "Please Enter Your Email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Plase enter valid email address!",
              },
            })}
          />
          <p className={styles.error}>{errors.email?.message}</p>
          <input
            className={styles.input}
            placeholder={t("form-passwrod-placeholder")}
            type="password"
            required
            {...register("password", {
              required: "Please Enter Your Password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long!",
              },
            })}
          />
          <p className={styles.error}>{errors.password?.message}</p>
          <input
            className={styles.input}
            placeholder={t("form-confirmPassword-placeholder")}
            {...register("confirmPassword", {
              required: "Please Enter Your Confirm Password",
              validate: (match) => {
                const password = getValues("password");
                return match === password || "Passwords should match!";
              },
            })}
            type="password"
            id="confirmPassword"
          />
          <p className={styles.error}>{errors.confirmPassword?.message}</p>
          <button type="submit" className={styles.button}>
            {t("register-button")}
          </button>
          <p className="text-font flex justify-center">
            {t("register-acc-message")}{" "}
            <span className="text-light pl-2 hover:text-font cursor-pointer">
              <a
                onClick={() => {
                  navigate("/login");
                }}
              >
                {t("register-login-link-message")}
              </a>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
