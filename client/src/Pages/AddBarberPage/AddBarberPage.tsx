import { useForm } from "react-hook-form";
import { styles } from "../../assets/tailwindCss/formTaiwlindCss";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import BarberContext from "../../context/StateContext";

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
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { fetchBarbers } = useContext(BarberContext);

  const { register, handleSubmit, reset } = useForm<FormValuesModel>();

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
      fetchBarbers();
      navigate("/barbers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Add Your Barber Bussines</h1>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className={styles.form}
        >
          <input
            {...register("name", { required: true })}
            placeholder="Your Full Name"
            className={styles.input}
          />
          <input
            {...register("bussinesName", { required: true })}
            placeholder="Your bussines name"
            className={styles.input}
          />
          <input
            {...register("email", { required: true })}
            placeholder="Your email address"
            type="email"
            className={styles.input}
          />
          <input
            {...register("phoneNumber", { required: true })}
            placeholder="Your phone number"
            className={styles.input}
          />
          <input
            {...register("city", { required: true })}
            placeholder="Your bussines city"
            className={styles.input}
          />
          <input
            {...register("address", { required: true })}
            placeholder="Your bussines address"
            className={styles.input}
          />
          <input
            {...register("experience", { required: true, valueAsNumber: true })}
            placeholder="Years of Experience"
            type="number"
            className={styles.input}
          />
          <input
            type="string"
            {...register("image", { required: true })}
            placeholder="Your profile image"
            className={styles.input}
          />
          <textarea
            {...register("description", {
              required: true,
            })}
            placeholder="Write a description for your bussines"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Add Barber
          </button>
        </form>
      </div>
    </div>
  );
}
