import { useAuth } from "../../../context/AuthContext";
import { useApi } from "../../../hooks/useApi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export function Header() {
  const { setUser } = useAuth();
  const [_, setUserToken] = useLocalStorage({
    keyName: "@fbc:token",
    defaultValue: null,
  });

  const { api } = useApi();

  const logout = async () => {
    const response = await api.post("/auth/logout");
    setUser(null);
    setUserToken(null);
  };

  return <></>;
}
