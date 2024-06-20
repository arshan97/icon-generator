import { signIn, signOut, useSession } from "next-auth/react";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { api } from "~/utils/api";
import { Button } from "./Button";
import { PrimaryLink } from "./PrimaryLink";

export function Header() {
  const session = useSession();
  const { buyCredits } = useBuyCredits();

  const isLoggedIn = !!session.data;

  const credits = api.user.getCredits.useQuery(undefined, {
    enabled: isLoggedIn,
  });

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <ul className="flex gap-6 items-center">
        <PrimaryLink href="/" className="text-xl font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 40 40"><path fill="currentColor" d="M0 20C0 8.954 8.954 0 20 0c8.121 0 15.112 4.84 18.245 11.794l-26.45 26.45a20 20 0 0 1-3.225-1.83L24.984 20H20L5.858 34.142A19.94 19.94 0 0 1 0 20M39.999 20.007 20.006 40c11.04-.004 19.99-8.953 19.993-19.993"></path></svg> 
        </PrimaryLink>
          {isLoggedIn && (<li>
            <PrimaryLink href="/generate" className="hover:text-gray-400 text-lg">
              Generate
            </PrimaryLink>
          </li>)}
          <li>
            <PrimaryLink href="/community" className="hover:text-gray-400 text-lg">
              Community
            </PrimaryLink>
          </li>
          {isLoggedIn && (
            <li>
              <PrimaryLink href="/collection" className="hover:text-gray-400 text-lg">
                Collection
              </PrimaryLink>
            </li>
          )}
        </ul>
        <ul className="flex gap-4 items-center">
          {isLoggedIn && (
            <>
              <div className="flex items-center text-m">
                Credits remaining: {credits.data}
              </div>
              <li>
                <Button
                  onClick={() => {
                    buyCredits().catch(console.error);
                  }}
                  className="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 text-white py-3 px-6 rounded-lg hover:from-purple-500 hover:via-pink-600 hover:to-orange-600"
                >
                  Buy Credits
                </Button>
              </li>
              <li>
                <Button
                  variant="secondary"
                  onClick={() => {
                    signOut().catch(console.error);
                  }}
                  className="text-lg hover:text-gray-400"
                >
                  Logout
                </Button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <li>
              <button
                onClick={() => {
                  signIn('google').catch(console.error);
                }}
                className="text-white py-2 px-6 rounded-lg border-2 border-gradient hover:border-gradient-hover"
              >
                Sign in
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
