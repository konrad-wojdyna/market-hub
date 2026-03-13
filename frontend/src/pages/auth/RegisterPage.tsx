import { RegisterForm } from "../../components";

const RegisterPage = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[80%] max-w-150 mt-5 mb-8 p-7 rounded-md shadow-lg bg-white">
        <header className="flex flex-col items-center justify-center gap-3 mt-5 mb-5">
          <p className="text-3xl font-bold">Create Account</p>
          <p className="text-lg tracking-wide text-gray-500">
            Join MarketHub today!
          </p>
        </header>
        <RegisterForm />
      </div>
    </section>
  );
};
export default RegisterPage;
