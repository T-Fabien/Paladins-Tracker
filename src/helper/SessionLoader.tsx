// Redux
import { useDispatch, useSelector } from "react-redux";
import { setSessionId } from "../redux/session";

// API
import { ping } from "../api/ping";
import { createSession } from "../api/createSession";
import { testSession } from "../api/testSession";
import { useEffect } from "react";


const SessionLoader = () => {
  const session = useSelector((state: any) => state.session.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (session.id == "") {
      try {
        ping().then((ping) => {
          if (ping) {
            createSession().then((session) => {
              dispatch(setSessionId({ id: session.session_id }));
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    } else {
        testSession(session.id).then((test) => {
          if (test.data !== undefined) {
            createSession().then((session) => {
              dispatch(setSessionId({ id: session.session_id }));
            });
          }
        });
    } 
  }, []);
  return session.id
};

export default SessionLoader;