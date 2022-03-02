import { GLOBAL_URL } from "../GLOBAL_URL";
import { useDispatch } from "react-redux";
import { ResponseInterface } from "../interface/ResponseInterface";
import { authUserFailed, authUserSuccess } from "../store/reducers/auth";
export const GlobalWatcher = async () => {
  const dispatch = useDispatch();
  try {
    const token: string | null = localStorage.getItem("token");
    const response: Response = await fetch(GLOBAL_URL + "/users/me", {
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data: ResponseInterface = await response.json();
    if (data.statusCode)
      throw new Error(`${data.statusCode} - ${data.error} - ${data.message}`);
    dispatch(authUserSuccess({ token, user: data.user }));
  } catch (error: any) {
    dispatch(authUserFailed());
  }
};
