import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  const { data: sessionData } = useSession();
  return (
    <div>
      <header className="">
        <div className="flex justify-between">
          <p className="text-center text-2xl">
            {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
          </p>
          <Button
            onClick={sessionData ? () => void signOut() : () => void signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </Button>
        </div>
      </header>
    </div>
  );
};

export default Header;
