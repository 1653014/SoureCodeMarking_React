import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRouter({ component: Component, pageTitle, ...rest }) {
  if (pageTitle) {
    window.document.title = pageTitle;
  }
  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("token") ? (
            <>
              <Component {...props} />
            </>
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    </>
  );
}

export default AuthRouter;
