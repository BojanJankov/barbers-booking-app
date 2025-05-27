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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({});

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
          <label className={styles.label}>Your Full name</label>
          <input
            type="text"
            placeholder="Name"
            {...register("name", {
              required: true,
            })}
            className={styles.input}
          />
          <p className={styles.error}>{errors.name?.message}</p>
          <label className={styles.label}>Your Bussines name</label>
          <input
            type="text"
            placeholder="Bussines name"
            {...register("bussinesName", {
              required: true,
              minLength: {
                value: 3,
                message: "Bussines name must be at least 3 characters long!",
              },
            })}
            className={styles.input}
          />
          <p className={styles.error}>{errors.bussinesName?.message}</p>
          <label className={styles.label}>Your Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter valid email",
              },
            })}
            className={styles.input}
          />
          <p className={styles.error}>{errors.email?.message}</p>
          <label className={styles.label}>Your City</label>
          <input
            type="text"
            placeholder="City"
            {...register("city", {
              required: true,
              minLength: {
                value: 3,
                message: "City name must be at least 3 characters long!",
              },
            })}
            className={styles.input}
          />
          <p>{errors.city?.message}</p>
          <label className={styles.label}>Your Address</label>
          <input
            type="text"
            placeholder="Address"
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
            className={styles.input}
          />
          <p className={styles.error}>{errors.address?.message}</p>
          <label className={styles.label}>Your Experience</label>
          <input
            type="text"
            placeholder="Experience"
            {...register("experience", {
              required: true,
              min: {
                value: 0,
                message: "Experience value must be at least 0",
              },
              max: {
                value: 75,
                message: "Value must be 75 or less",
              },
            })}
            className={styles.input}
          />
          <p className={styles.error}>{errors.experience?.message}</p>
          <label className={styles.label}>Your Phone number</label>
          <input
            type="string"
            placeholder="Phone Number"
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
            className={styles.input}
          />
          <p className={styles.error}>{errors.phoneNumber?.message}</p>
          <label className={styles.label}>Your Description</label>
          <textarea
            placeholder="Your description"
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
            className={styles.input}
          />
          <p className={styles.error}>{errors.description?.message}</p>
          <label className={styles.label}>Your Profile image</label>
          <input
            placeholder="Image"
            type="string"
            {...register("image", { required: true })}
            className={styles.input}
          />
          <p className={styles.error}>{errors.image?.message}</p>
          <button type="submit" className={styles.button}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBarberFormPage;
