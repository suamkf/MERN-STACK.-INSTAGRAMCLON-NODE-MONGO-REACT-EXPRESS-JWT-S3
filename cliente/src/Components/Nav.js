import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCompass,
  faUser,
  faHeart as regularHart,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Axios from "axios";
import Loading from "./loading";
import Main from "./Main"
export default function Nav({ user, getNotificatins }) {
  const [hartState, setHartState] = useState(true);
  const [notifiactions, setNotifiactions] = useState([]);

  var result = null;

  async function setSTate() {
    if (user) {
      setNotifiactions(await Axios.get(`api/notifications/${user._id}/all`));
    }
  }

  result = setTimeout(setSTate, 10000);

  async function checkNotifications(e) {
    e.preventDefault();
    await Axios.post(`api/notifications/${user._id}`);
    clearTimeout(result);
    setHartState(true);
  }

  function checkLengthNotitications() {
    /*
    returnState = 1 = empyArray
    returnState = 2 = notEmptyArrayNotNewNotifications
    returnState = 3 = notEmptyArrayNewNotifications*/

    let returnState = 1;

    if (notifiactions.data != undefined) {
      if (notifiactions.data.length > 0) {
        returnState = 2;
        notifiactions.data.forEach((notification) => {
          if (!notification.check) {
            returnState = 3;
            return returnState;
          }
        });
      }
    }
    return returnState;
  }

  return (
    <nav className="Nav">
      <ul className="Nav__links">
        <li>
          <Link to="/" className="Nav__link">
            Intercambiagram
          </Link>
        </li>
        {user && (
          <AddLoginIcons
            user={user}
            checkNotifications={checkNotifications}
            checkLengthNotitications={checkLengthNotitications}
            allNotications={notifiactions}
            getNotificatins={getNotificatins}
          />
        )}
      </ul>
    </nav>
  );
}

function AddLoginIcons({
  user,

  checkNotifications,
  checkLengthNotitications,
  allNotications,
  getNotificatins,
}) {
  return (
    <>
      <li className="Nav__link-push">
        <Link to="/upload" className="Nav__link">
          <FontAwesomeIcon icon={faCameraRetro}></FontAwesomeIcon>
        </Link>
      </li>
      <li className="Nav__link-margin-left">
        <Link to="/explore" className="Nav__link">
          <FontAwesomeIcon icon={faCompass}></FontAwesomeIcon>
        </Link>
      </li>
      <li className="Nav__link-margin-left">
        <Link className="Nav__link" to={`/showProfile/${user.username}`}>
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </li>
      <li className="Nav__link-margin-left">
        <Popup
          trigger={
            <button>
              {" "}
              <Link className="Nav__link" to="" onClick={checkNotifications}>
                <FontAwesomeIcon
                  className={"text-red-dark"}
                  icon={
                    checkLengthNotitications() === 3 ? solidHeart : regularHart
                  }
                />
              </Link>
            </button>
          }
          position="bottom center"
        >
          <div>
            <ul>
              {checkLengthNotitications() > 1 ? (
                <GetLink notifiactions={allNotications} />
              ) : (
                <GetLink getNotificatins={getNotificatins()} />
              )}
            </ul>
          </div>
        </Popup>
      </li>
    </>
  );
}

function GetLink({ notifiactions, getNotificatins }) {
  console.log("notifiactions", notifiactions);
  if (!notifiactions) {
    Promise.all(getNotificatins)
      .then((newNotifications) => {
        console.log("newNotifications", newNotifications);
        return newNotifications.data.map((notification) => (
          <MakeNotificationList
            key={notification._id}
            notification={notification}
          />
        ));
      })
      .catch((err) => {});
  } else {
    return notifiactions.data.map((notification) => (
      <MakeNotificationList
        key={notification._id}
        notification={notification}
      />
    ));
  }
  return <Main center ><Loading /></Main>;
}

function MakeNotificationList({ notification }) {
  return (
    <li>
      {!notification.postId ? (
        <Link to={`/showProfile/${notification.userActionUserName}`}>
          <b>{`${notification.userActionUserName}`}</b>{" "}
        </Link>
      ) : (
        <b>{notification.userActionUserName}</b>
      )}{" "}
      {notification.postId ? (
        <Link to={`/post/${notification.postId}`}>
          {`${notification.event}`}{" "}
        </Link>
      ) : (
        `${notification.event}`
      )}
    </li>
  );
}
