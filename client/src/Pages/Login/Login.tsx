import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { styles } from "../../assets/tailwindCss/formTaiwlindCss";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
  const { t } = useTranslation();
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

      localStorage.setItem("user", JSON.stringify(user));
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
        <h2 className={styles.title}>{t("login-title")}</h2>
        <form
          className={styles.form}
          action=""
          method="POST"
          onSubmit={onSubmitLogin}
        >
          <input
            className={styles.input}
            placeholder={t("form-email-placeholder")}
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            className={styles.input}
            placeholder={t("form-password-placeholder")}
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <p className="text-font flex justify-center">
            {t("login-acc-message")}{" "}
            <a
              className="text-light pl-2 hover:text-font cursor-pointer"
              onClick={() => {
                navigate("/register");
              }}
            >
              {t("login-acc-link-text")}
            </a>
          </p>
          <button type="submit" className={styles.button}>
            {t("login-title")}
          </button>
        </form>
      </div>
    </div>
  );
};
