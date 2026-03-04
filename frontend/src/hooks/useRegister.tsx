import { useNavigate } from "react-router-dom";
import type { RegisterData } from "../types/auth";
import authService from "../services/authService";
import { toast } from "react-toastify";
import axios from "axios";

const useRegister = () => {
  const navigate = useNavigate();

  const registerUser = async (data: RegisterData) => {
    try {
      await authService.register(data);
      toast.success("Register successfully!");
      navigate("/login");
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

  return { registerUser };
};
export default useRegister;
