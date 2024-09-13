"use client";

import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Provider } from "@supabase/supabase-js";
import { ReactElement } from "react";
import { oAuthSingIn } from "./actions";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: ReactElement;
};

export function OAuthButtons() {
  const oAuthProviders: OAuthProvider[] = [
    { name: "github", displayName: "Github", icon: <GitHubLogoIcon /> },
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <Button
          key={provider.name}
          variant="outline"
          className="flex items-center justify-center gap-2 w-full py-2 mt-4"
          onClick={async () => await oAuthSingIn(provider.name)}
        >
          {provider.icon}
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  );
}
