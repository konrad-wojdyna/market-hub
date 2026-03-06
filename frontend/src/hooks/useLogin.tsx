import { useNavigate } from "react-router-dom";
import type { LoginData } from "../types/auth";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const loginUser = async (data: LoginData) => {
    try {
      await login(data);
      navigate("/listings");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message;
        toast.error(
          backendMessage ?? "Something went wrong. Please try again!",
        );
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  return { loginUser };
};

export default useLogin;
