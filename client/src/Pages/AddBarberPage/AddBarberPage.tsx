import { useForm } from "react-hook-form";
import { styles } from "../../assets/tailwindCss/formTaiwlindCss";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import BarberContext from "../../context/StateContext";
import BackButton from "../../Components/BackButton/BackButton";
import { useTranslation } from "react-i18next";

export interface FormValuesModel {
  name: string;
  email: string;
  phoneNumber: string;
  experience: number;
  image: string;
  bussinesName: string;
  city: string;
  address: string;
  description: string;
}

export default function AddBarberPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, getUserById } = useContext(AuthContext);
  const { fetchBarbers } = useContext(BarberContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesModel>();

  const onSubmit = async (data: FormValuesModel) => {
    try {
      const userId = user?.id;

      console.log(data);

      await api.post("barbers", {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        experience: data.experience,
        image: data.image,
        bussinesName: data.bussinesName,
        city: data.city,
        address: data.address,
        description: data.description,
        userId,
      });

      reset();
      getUserById(String(userId));
      fetchBarbers();
      navigate("/barbers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BackButton />
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>{t("add-barber-title")}</h1>
          <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className={styles.form}
          >
            <input
              {...register("name", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Bussines name must be at least 3 characters long!",
                },
              })}
              placeholder={t("form-fullName-placeholder")}
              className={styles.input}
            />
            <p className={styles.error}>{errors.name?.message}</p>
            <input
              {...register("bussinesName", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Bussines name must be at least 3 characters long!",
                },
              })}
              placeholder={t("form-bussinesName-placeholder")}
              className={styles.input}
            />
            <p className={styles.error}>{errors.bussinesName?.message}</p>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter valid email",
                },
              })}
              placeholder={t("form-email-placeholder")}
              type="email"
              className={styles.input}
            />
            <p className={styles.error}>{errors.email?.message}</p>
            <input
              {...register("phoneNumber", {
                required: true,
                minLength: {
                  value: 7,
                  message: "Phone number must be at least 7 digits",
                },
                maxLength: {
                  value: 15,
                  message: "Phone number can't exceed 15 digits",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Phone number must contain only digits",
                },
              })}
              placeholder={t("form-phoneNumber-placeholder")}
              className={styles.input}
            />
            <p className={styles.error}>{errors.phoneNumber?.message}</p>
            <input
              {...register("city", {
                required: true,
                minLength: {
                  value: 3,
                  message: "City name must be at least 3 characters long!",
                },
              })}
              placeholder={t("form-city-placeholder")}
              className={styles.input}
            />
            <p className={styles.error}>{errors.city?.message}</p>
            <input
              {...register("address", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Address name must be at least 3 characters long!",
                },
                maxLength: {
                  value: 75,
                  message: "Address name must be 75 characters or less!",
                },
              })}
              placeholder={t("form-address-placeholder")}
              className={styles.input}
            />
            <p className={styles.error}>{errors.address?.message}</p>
            <input
              {...register("experience", {
                required: true,
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Experience value must be at least 0",
                },
                max: {
                  value: 75,
                  message: "Value must be 75 or less",
                },
              })}
              placeholder={t("form-experience-placeholder")}
              type="number"
              className={styles.input}
            />
            <p className={styles.error}>{errors.experience?.message}</p>
            <input
              type="string"
              {...register("image", { required: true })}
              placeholder={t("form-image-placeholder")}
              className={styles.input}
            />
            <p className={styles.error}>{errors.image?.message}</p>
            <textarea
              {...register("description", {
                required: true,
                minLength: {
                  value: 50,
                  message: "Description must be at least 50 characters",
                },
                maxLength: {
                  value: 250,
                  message: "Description must be 250 characters or less",
                },
              })}
              placeholder={t("form-description-placeholder")}
              className={styles.input}
            />
            <p className={styles.error}>{errors.description?.message}</p>
            <button type="submit" className={styles.button}>
              {t("add-barber-button")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
