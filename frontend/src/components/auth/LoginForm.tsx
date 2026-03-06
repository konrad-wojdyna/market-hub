import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginData } from "../../types/auth";

const LoginForm = () => {
  const { loginUser } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    await loginUser(data);
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
              required: "Provide you email!",
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
            aria-invalid={errors.password ? "true" : "false"}
            {...register("password", {
              required: "Provide your password!",
            })}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-700 text-white p-3 rounded-lg font-bold tracking-wider
            cursor-pointer transition-all hover:bg-blue-600 ${
              isSubmitting && "opacity-50 cursor-not-allowed"
            }`}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className=" text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-700 font-bold tracking-wide">
          Register
        </Link>
      </p>
    </div>
  );
};
export default LoginForm;
