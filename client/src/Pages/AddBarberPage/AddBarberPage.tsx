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
        <h1 className={styles.title}>Add New Barber</h1>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className={styles.form}
        >
          <input
            {...register("name", { required: true })}
            placeholder="Full Name"
            className={styles.input}
          />
          <input
            {...register("email", { required: true })}
            placeholder="Email Address"
            type="email"
            className={styles.input}
          />
          <input
            {...register("phoneNumber", { required: true })}
            placeholder="Phone Number"
            className={styles.input}
          />
          <input
            {...register("experience", { required: true, valueAsNumber: true })}
            placeholder="Years of Experience"
            type="number"
            className={styles.input}
          />
          <input
            {...register("image", { required: true })}
            placeholder="Image URL"
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
