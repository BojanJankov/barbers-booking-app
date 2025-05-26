import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { styles } from "../../assets/tailwindCss/formTaiwlindCss";
import { api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import BarberContext from "../../context/StateContext";
import { AuthContext } from "../../context/AuthContext";

type FormData = {
  name: string;
  email: string;
  experience: string;
  phoneNumber: string;
  image: string;
  bussinesName: string;
  city: string;
  address: string;
  description: string;
};

const EditBarberFormPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { getBarberById, foundBarber } = useContext(BarberContext);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<FormData>({});

  useEffect(() => {
    getBarberById(Number(id));

    reset({
      name: foundBarber?.name,
      email: foundBarber?.email,
      experience: foundBarber?.experience,
      phoneNumber: foundBarber?.phoneNumber,
      image: foundBarber?.image,
      description: foundBarber?.description,
      bussinesName: foundBarber?.bussinesName,
      address: foundBarber?.address,
      city: foundBarber?.city,
    });
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Submitted data:", data);

      const response = await api.patch(`barbers/${user?.id}`, {
        name: data.name,
        email: data.email,
        experience: Number(data.experience),
        phoneNumber: data.phoneNumber,
        image: data.image,
        description: data.description,
        bussinesName: data.bussinesName,
        address: data.address,
        city: data.city,
      });

      console.log(response);

      getBarberById(Number(id));
      navigate(`/edit-barber/${id}`);
      console.log("Upesno napraven edit na berber");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Edit your barber information</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Bussines name"
            {...register("bussinesName", { required: true })}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="City"
            {...register("city", { required: true })}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: true })}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Experience"
            {...register("experience", { required: true })}
            className={styles.input}
          />
          <input
            type="string"
            placeholder="Phone Number"
            {...register("phoneNumber", { required: true })}
            className={styles.input}
          />
          <textarea
            placeholder="Your description"
            {...register("description", { required: true })}
            className={styles.input}
          />
          <input
            placeholder="Image"
            type="string"
            {...register("image", { required: true })}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBarberFormPage;
