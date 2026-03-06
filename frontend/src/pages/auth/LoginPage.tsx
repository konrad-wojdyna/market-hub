import { LoginForm } from "../../components";

const LoginPage = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[80%] max-w-150 p-7 rounded-md shadow-lg bg-white">
        <header className="flex flex-col items-center justify-center gap-3 mt-5 mb-5">
          <p className="text-3xl font-bold">Welcome Back!</p>
          <p className="text-lg tracking-wide text-gray-500">
            Login to your MarketHub account
          </p>
        </header>
        <LoginForm />
      </div>
    </section>
  );
};
export default LoginPage;
