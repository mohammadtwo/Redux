import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser } from "../../store/auth/authSlice";

type UserForm = {
  username: string;
  password: string;
};

export function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const onSubmit = async (data: UserForm) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();

      toast.success(`Welcome ${result.user.username}`, {
        position: "top-right",
      });

      navigate("/");
    } catch (error) {
      toast.error(error as string || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-[400px]">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
