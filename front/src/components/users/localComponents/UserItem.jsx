import React from "react";
import "./UserItem.css";
import { useSelector } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonWithQuestion from "../../buttonWithQuestion/ButtonWithQuestion";
import { useSetUserFetch } from "./functions/useSetUserFetch";
import ReplyIcon from "@mui/icons-material/Reply";

const UserItem = function ({ userPers, setUsers }) {
  const { user } = useSelector((store) => store.user);

  const setUserOutFetch = useSetUserFetch({ level: 0, setUsers, userPers });
  const setUserInFetch = useSetUserFetch({ level: 2, setUsers, userPers });

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
          <div style={{ color: "rgb(6, 252, 6)" }}>
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
