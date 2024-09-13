import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Provider } from "@supabase/supabase-js";
import { ReactElement } from "react";

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
        >
          {provider.icon}
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  );
}
