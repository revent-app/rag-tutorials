"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticatedConnectUser, paragon } from "@useparagon/connect";
import React, { useEffect, useState } from "react";

interface ChildProps {
  setUser: (user: AuthenticatedConnectUser) => void;
}

export const Login: React.FC<ChildProps> = (props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { loginWithRedirect, isAuthenticated, getIdTokenClaims, isLoading } =
    useAuth0();

  const handleAuthentication = async () => {
    try {
      const claims = await getIdTokenClaims();
      if (claims) {
        paragon.authenticate(
          process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID ?? "",
          claims.__raw,
        );
        sessionStorage.setItem("jwt", claims.__raw);
        const usr = paragon.getUser();
        if (usr.authenticated) {
          props.setUser(usr);
        }
      } else {
        setErrorMessage("Login Unsuccessful");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setErrorMessage("Login Unsuccessful");
    }
  };

  useEffect(() => {
    // Only attempt authentication if we're authenticated and not loading
    if (isAuthenticated && !isLoading) {
      handleAuthentication();
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="w-2/3 p-4 px-10 text-center flex flex-col space-y-2 bg-white shadow-2xl rounded-2xl">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-2/3 p-4 px-10 text-center flex flex-col space-y-2 bg-white shadow-2xl rounded-2xl">
      <h2 className="font-sans font-bold mb-2 text-lg">Log In</h2>
      <p className="mb-2 max-2-sm font-sans font-light text-gray-600">
        Log in to your account to access your Paragon integrations
      </p>
      <button
        onClick={() => loginWithRedirect()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Log In
      </button>
      {errorMessage && <div className="text-red-700 my-2">{errorMessage}</div>}
    </div>
  );
};

export default Login;
