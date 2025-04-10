import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../../services/api";

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const [alert, setAlert] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await api.post("contact", data);

      console.log("Form Submitted:", response);
      setAlert("Thank you for your message, your message will be reviewed.");
    } catch (error) {
      console.log(error);
      setAlert("Something went wrong, try again!");
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: "", email: "", message: "" });
    }
  }, [formState, reset]);

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-[var(--color-font)] flex items-center justify-center py-8">
      <div className="max-w-4xl w-full bg-[var(--color-mid)] p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Full Name
            </label>
            <input
              className={`w-full p-3 rounded-md border-2 border-[var(--color-border)] bg-transparent text-[var(--color-font)] focus:outline-none focus:border-[var(--color-light)] ${
                errors.name ? "border-red-500" : ""
              }`}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`w-full p-3 rounded-md border-2 border-[var(--color-border)] bg-transparent text-[var(--color-font)] focus:outline-none focus:border-[var(--color-light)] ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-lg font-medium mb-2">
              Your Message
            </label>
            <textarea
              rows={5}
              id="message"
              className={`w-full p-3 rounded-md border-2 border-[var(--color-border)] bg-transparent text-[var(--color-font)] focus:outline-none focus:border-[var(--color-light)] ${
                errors.message ? "border-red-500" : ""
              }`}
              {...register("message", { required: true })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          <p>{alert ? alert : ""}</p>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[var(--color-light)] text-[var(--color-dark)] font-bold py-2 px-6 rounded-lg hover:bg-[var(--color-mid)] transition-colors cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
