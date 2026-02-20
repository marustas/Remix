import {
  Form,
  Outlet,
  Link,
  NavLink,
  useNavigation,
  Await,
} from "react-router";
import type { Route } from "./+types/sidebar";
import { getContacts } from "~/data";
import { Suspense, useEffect, useRef } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  const contacts = getContacts(q);

  return { contacts, query: q };
}

export default function SidebarLayout({ loaderData }: Route.ComponentProps) {
  const { contacts: contactsPromise, query } = loaderData;

  const navigation = useNavigation();

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = query || "";
    }
  }, [query]);

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col bg-gray-100 border-r border-gray-300 w-80">
        <div className="flex justify-between gap-1 border-b border-gray-300 p-4 items-center">
          <Form id="search-form">
            <input
              aria-label="Search contacts"
              id="q"
              name="q"
              placeholder="Search"
              type="search"
              className="p-2 rounded-md shadow-md bg-white"
              ref={searchRef}
              defaultValue={query || ""}
            />
          </Form>

          <Form method="post">
            <button
              className="p-2 rounded-md shadow-md bg-white text-blue-400 hover:cursor-pointer hover:bg-gray-200"
              type="submit"
            >
              New
            </button>
          </Form>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4">
            <Suspense fallback={<p>Loading contacts...</p>}>
              <Await
                resolve={contactsPromise}
                errorElement={<p>Error loading contacts</p>}
                children={(contacts) =>
                  contacts.map((contact) => (
                    <li key={contact.id}>
                      <NavLink
                        className={({ isActive, isPending }) => {
                          return `block w-full px-1 py-2 rounded-md hover:bg-gray-200 ${isActive ? "bg-blue-500" : isPending ? "bg-gray-200" : ""}`;
                        }}
                        to={`/contacts/${contact.id}`}
                      >
                        {contact.first} {contact.last}
                      </NavLink>
                    </li>
                  ))
                }
              />
            </Suspense>
          </ul>
        </nav>
        <h1>
          <Link to="about">About</Link>
        </h1>
      </div>
      <div
        className={`flex flex-1 overflow-y-auto items-start justify-center w-full ${navigation.state === "loading" ? "opacity-50" : ""}`}
      >
        <Outlet />
      </div>
    </div>
  );
}
