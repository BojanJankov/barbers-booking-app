import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const {
    control,
    handleSubmit,
    formState,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Form Submitted:", data);
    // Handle form submission here (e.g., send data to a server)
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
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  id="name"
                  className={`w-full p-3 rounded-md border-2 border-[var(--color-border)] bg-transparent text-[var(--color-font)] focus:outline-none focus:border-[var(--color-light)] ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  {...field}
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email Address
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  type="email"
                  id="email"
                  className={`w-full p-3 rounded-md border-2 border-[var(--color-border)] bg-transparent text-[var(--color-font)] focus:outline-none focus:border-[var(--color-light)] ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  {...field}
                />
              )}
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
            <Controller
              name="message"
              control={control}
              rules={{ required: "Message is required" }}
              render={({ field }) => (
                <textarea
                  id="message"
                  className={`w-full p-3 rounded-md border-2 border-[var(--color-border)] bg-transparent text-[var(--color-font)] focus:outline-none focus:border-[var(--color-light)] ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  rows={5}
                  {...field}
                />
              )}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

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
