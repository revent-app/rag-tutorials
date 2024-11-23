"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider
      domain="dev-n3ly2f5b21ec12b8.us.auth0.com"
      clientId="VTHLAkGG6t3uM4x1Ldeo3r35MTNUCQcv"
      authorizationParams={{
        redirect_uri: "http://localhost:3000",
      }}
    >
      {children}
    </Auth0Provider>
  );
};
