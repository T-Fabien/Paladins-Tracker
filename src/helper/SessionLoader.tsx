// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "../redux/session";

// API
import { ping } from "../api/ping";
import { createSession } from "../api/createSession";
import { testSession } from "../api/testSession";
import { useEffect } from "react";


const SessionLoader = () => {
  const session = useSelector((state: any) => state.session.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!session.isSessionCreated) {
      try {
        ping().then((ping) => {
          if (ping) {
            createSession().then(() => {
              dispatch(setSession({ isSessionCreated: true }));    
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
        testSession().then((test) => {
          if (test.data.includes("Exception - Timestamp")) {
            dispatch(setSession({ isSessionCreated: false }));
            createSession().then(() => {
              dispatch(setSession({ isSessionCreated: true }));
            });
          }
        });
    } 
  }, []);

  return session.isSessionCreated;
};

export default SessionLoader;