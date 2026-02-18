import { Form, Outlet, Link, NavLink, useNavigation } from "react-router";
import type { Route } from "./+types/sidebar";
import { getContacts } from "~/data";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export default function SidebarLayout({ loaderData }: Route.ComponentProps) {
  const { contacts } = loaderData;

  const navigation = useNavigation();

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col bg-gray-100 border-r border-gray-300 w-80">
        <div className="flex justify-between gap-1 border-b border-gray-300 p-4 items-center">
          <Form id="search-form" role="search">
            <input
              aria-label="Search contacts"
              id="q"
              name="q"
              placeholder="Search"
              type="search"
              className="p-2 rounded-md shadow-md bg-white"
            />
          </Form>

          <Form
            method="post"
            className="p-2 rounded-md shadow-md bg-white text-blue-400"
          >
            <button type="submit">New</button>
          </Form>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4">
            {contacts?.length === 0 ? (
              <p>
                <i>No contacts</i>
              </p>
            ) : (
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
            )}
          </ul>
        </nav>
        <h1>
          <Link to="about">About</Link>
        </h1>
      </div>

      <div
        className={`flex flex-1 overflow-hidden items-start justify-center w-full ${navigation.state === "loading" ? "opacity-50" : ""}`}
      >
        <Outlet />
      </div>
    </div>
  );
}
