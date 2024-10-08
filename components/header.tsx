import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="z-10 sticky top-0 w-full border-b  items-center justify-center bg-red-500 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">SupaTodo</span>
          </a>
          <Link href="/todos">Todos</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user !== null ? (
            <form className="flex items-center gap-x-4" action={signOut}>
              <p>{user.email}</p>

              <Button>Sign out</Button>
            </form>
          ) : (
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}{" "}
        </div>
      </div>
    </header>
  );
}
