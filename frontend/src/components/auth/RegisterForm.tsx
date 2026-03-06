import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginData, RegisterData } from "../../types/auth";
import useRegister from "../../hooks/useRegister";

const RegisterForm = () => {
  const { registerUser } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>();

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    await registerUser(data);
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-bold text-lg">
            Email *
          </label>
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            className="border p-2 rounded-md border-gray-200"
            aria-invalid={errors.email ? "true" : "false"}
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-bold text-lg">
            Password *
          </label>
          <input
            type="password"
            id="password"
            placeholder="******"
            className="border p-2 rounded-md border-gray-200"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                message:
                  "Password must contain uppercase, lowercase and number",
              },
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
          <small className="text-gray-700">
            Min 8 characters, uppercase, lowercase and number
          </small>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-bold text-lg">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="John"
            className="border p-2 rounded-md border-gray-200"
            {...register("firstName", {
              required: "First name is required",
            })}
          />
          {errors.firstName && (
            <p className="text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="font-bold text-lg">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Doe"
            className="border p-2 rounded-md border-gray-200"
            {...register("lastName")}
          />
          <small className="text-gray-700">Optional</small>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="font-bold text-lg">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="+48 123 456 789"
            className="border p-2 rounded-md border-gray-200"
            {...register("phone")}
          />
          <small className="text-gray-700">Optional</small>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-700 text-white p-3 rounded-lg font-bold tracking-wider
            cursor-pointer transition-all hover:bg-blue-600 ${
              isSubmitting && "opacity-50 cursor-not-allowed"
            }`}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      <p className=" text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-700 font-bold tracking-wide">
          Login
        </Link>
      </p>
    </div>
  );
};
export default RegisterForm;
