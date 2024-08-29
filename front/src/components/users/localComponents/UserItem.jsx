import React from "react";
import "./UserItem.css";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonWithQuestion from "../../buttonWithQuestion/ButtonWithQuestion";
import { useSetUserFetch } from "./functions/useSetUserFetch";
import ReplyIcon from "@mui/icons-material/Reply";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

const UserItem = function ({ userPers, setUsers }) {
  const { user } = useSelector((store) => store.user);

  const setUserOutFetch = useSetUserFetch({ level: 0, setUsers, userPers });
  const setUserInFetch = useSetUserFetch({ level: 1, setUsers, userPers });
  const setUserLevelFetch = useSetUserFetch({
    level: userPers.level === 1 ? 2 : 1,
    setUsers,
    userPers,
  });

  return (
    <div className="user-item">
      <div className="user-item-image-box">
        <img
          className="user-item-image"
          src={userPers.image || "/img.png"}
          alt="img"
        />
      </div>
      <div className="user-item-info">
        <h5 style={{ fontStyle: "italic", color: "rgb(109, 207, 207)" }}>
          {userPers.name}
        </h5>
        <p>{userPers.email}</p>
        {userPers.phone && <p>{userPers.phone}</p>}
        {userPers.tele && <p>{userPers.tele}</p>}
        {userPers.net && <p>{userPers.net}</p>}
        {userPers.admin && (
          <p
            style={{
              color: "orange",
            }}
          >
            Старший администратор
          </p>
        )}
        {!userPers.admin && userPers.level ? (
          <div className="user-level">
            <p
              style={{
                color: "rgb(173, 209, 240)",
                margin: "12px",
              }}
            >
              Доступ:
            </p>
            <p style={{ margin: "12px" }}>{userPers.level}</p>
            {user.admin && (
              <ButtonWithQuestion
                menuPunkt={[
                  { page: "да", color: "red", cb: setUserLevelFetch },
                  {
                    page: "нет",
                    color: "green",
                    cb: (hc) => {
                      hc();
                    },
                  },
                ]}
                buttonContent={() => <ChangeCircleIcon />}
              />
            )}
          </div>
        ) : (
          false
        )}
        {!userPers.admin && userPers.level ? (
          <div style={{ color: "rgb(6, 252, 6)", marginTop: "10px" }}>
            работает
            {user && user.admin && (
              <ButtonWithQuestion
                menuPunkt={[
                  { page: "да", color: "red", cb: setUserOutFetch },
                  {
                    page: "нет",
                    color: "green",
                    cb: (hc) => {
                      hc();
                    },
                  },
                ]}
                buttonContent={() => <DeleteForeverIcon />}
              />
            )}
          </div>
        ) : (
          false
        )}
        {!userPers.admin && !userPers.level && (
          <div style={{ color: "red" }}>
            уволен
            {user && user.admin && (
              <ButtonWithQuestion
                menuPunkt={[
                  { page: "да", color: "red", cb: setUserInFetch },
                  {
                    page: "нет",
                    color: "green",
                    cb: (hc) => {
                      hc();
                    },
                  },
                ]}
                buttonContent={() => <ReplyIcon />}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserItem;
