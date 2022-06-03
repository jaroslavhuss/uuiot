import { useDispatch } from "react-redux";
import { authUserFailed, authUserSuccess } from "../store/reducers/auth";
import { fetchAPI } from "./FetchAPI";
import { FetchMethods } from "../interface/methods.enum";
import { UserInterface } from "../interface/UserInterface";
export const GlobalWatcher = async () => {
  const dispatch = useDispatch();
  try {
    const data: UserInterface = await fetchAPI("/users/me", FetchMethods.GET, {})
    if (data.statusCode)
      throw new Error(`${data.statusCode} - ${data.error} - ${data.message}`);

      if(!data.isUserApproved)throw new Error("User is not approved yet!")
    dispatch(authUserSuccess({ data:data.tokens.access_token, user: data.user }));
  } catch (error: any) {
    dispatch(authUserFailed());
  }
};
