import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import z from "zod";
import { useAuth } from "../../context/AuthContext";
import { useApi } from "../../hooks/useApi";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { TUserJwt } from "../../types/user.types";

type LoginProps = {
  email: string;
  password: string;
  channel: "ui";
};

type NewLoginFormInputs = z.infer<typeof newLoginFormSchema>;

const newLoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function Login() {
  const [_, setUserToken] = useLocalStorage({
    keyName: "@fbc:token",
    defaultValue: null,
  });
  const { api } = useApi();
  const { setUser } = useAuth();
  const { register, handleSubmit, reset } = useForm<NewLoginFormInputs>({
    resolver: zodResolver(newLoginFormSchema),
  });

  async function handleMakeLogin(data: NewLoginFormInputs) {
    const { email, password } = data;
    login({ email, password, channel: "ui" });
    reset();
  }

  const login = async (data: LoginProps) => {
    const response = await api.post("/auth/login", data);
    setUserToken(response.data.token);

    try {
      const decodedData = jwtDecode(response.data.token) as TUserJwt;
      console.log(decodedData);
      setUser(decodedData);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  return (
    <>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(handleMakeLogin)}>
        <div>
          <p>Email: </p>
          <input
            type="email"
            placeholder="jhondoe@gmail.com"
            {...register("email")}
          />
        </div>
        <div>
          <p>Password:</p>
          <input placeholder="*******" {...register("password")} />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
