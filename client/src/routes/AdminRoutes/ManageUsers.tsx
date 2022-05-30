import AdminContainer from "../../admin-components/AdminContainer";
import { useState } from "react";
import { UserInterface } from "../../interface/UserInterface";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUserFailed } from "../../store/reducers/auth";
import { setError } from "../../store/reducers/errorReducer";
import { GLOBAL_URL } from "../../GLOBAL_URL";
const AdminPanel = () => {
  const dispatch = useDispatch();
  let user: UserInterface = useSelector((data: any) => {
    return data.auth.user;
  });
  const [listenForChange, setListenForChange] = useState<boolean>(false);
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listenForChange]);
  //Fetch all users - Admin required
  const getAllUsers = async () => {
    try {
      const token: string | null = localStorage.getItem("token");
      const response: Response = await fetch(GLOBAL_URL + "/users/all", {
        method: "get",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data: any = await response.json();
      if (data.statusCode === 401) {
        dispatch(authUserFailed());
      }
      setUsers(data);
    } catch (error: any) {
      if (error) {
        dispatch(setError(error.message));
      }
    }
  };

  const updateUser = async (index: number, action: boolean) => {
    const token: string | null = localStorage.getItem("token");
    try {
      const response: Response = await fetch(
        GLOBAL_URL + `/users/update/${users[index]._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isUserApproved: action,
          }),
        }
      );
      const data: any = await response.json();
      if (!data) throw new Error("User could not be updated");
      setListenForChange(!listenForChange);
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
  const deleteUser = async (index: number) => {
    const conf = window.confirm(
      `Do you really want to delete ${users[index].email}`
    );
    if (conf) {
      const token: string | null = localStorage.getItem("token");
      try {
        const response: Response = await fetch(
          GLOBAL_URL + `/users/delete/${users[index]._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data: any = await response.json();
        if (data.error) throw new Error(data.message);
        setListenForChange(!listenForChange);
      } catch (error: any) {
        dispatch(setError(error.message));
      }
    }
  };

  return (
    <AdminContainer>
      <div
        className="listOfUsers"
        style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {users.map((userRegular: UserInterface, index) => (
          <div
            key={index}
            className="card text-center"
            style={{ width: "23rem", margin: 10 }}
          >
            <div className="card-body">
              <h5 className="card-header">
                {userRegular.name} {userRegular.surname}
              </h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">@ {userRegular.email}</li>
                <li className="list-group-item" style={{ fontSize: 11 }}>
                  {new Date(userRegular.lastLoggedIn).toLocaleString()}
                </li>
                <li className="list-group-item">
                  Approved:{" "}
                  <span
                    style={
                      userRegular.isUserApproved
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    {userRegular.isUserApproved ? "Approved" : "Not approved"}
                  </span>
                </li>
                <li className="list-group-item">
                  Auth Level:{" "}
                  <span
                    style={
                      userRegular.authLevel === "iotadmin"
                        ? { color: "#ff8227", fontWeight: "bold" }
                        : { color: "green" }
                    }
                  >
                    {userRegular.authLevel === "iotadmin"
                      ? "Administrator"
                      : "Regular user"}
                  </span>
                </li>
              </ul>
              <br />
              <div className="row">
                {user.email !== userRegular.email && (
                  <>
                    {!userRegular.isUserApproved && (
                      <div className="col-sm-4">
                        <div
                          className="btn btn-primary btn-success"
                          onClick={() => {
                            updateUser(index, true);
                          }}
                        >
                          Approve
                        </div>
                      </div>
                    )}
                    {userRegular.isUserApproved && (
                      <div className="col-sm-4">
                        <div
                          className="btn btn-primary btn-warning"
                          onClick={() => {
                            updateUser(index, false);
                          }}
                        >
                          Disapprove
                        </div>
                      </div>
                    )}
                  </>
                )}
                {user.email === userRegular.email && (
                  <div>
                    <ul className="list-group list-group-flush">
                      <li
                        className="list-group-item"
                        onClick={() => {
                          dispatch(authUserFailed());
                        }}
                      >
                        <span
                          style={{ color: "red" }}
                          className="nav-link btn btn-sm btn-outline-secondary"
                        >
                          Log-out
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
                {user.email !== userRegular.email && (
                  <div className="col-sm-4">
                    <div
                      className="btn btn-primary btn-danger"
                      onClick={() => {
                        deleteUser(index);
                      }}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminContainer>
  );
};

export default AdminPanel;
