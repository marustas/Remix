import {
  Form,
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunction,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { getContacts } from "./data";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function clientLoader() {
  const contacts = await getContacts();
  return { contacts };
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { contacts } = loaderData;

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
              className="p-2 rounded-md shadow-md"
            />
          </Form>

          <Form
            method="post"
            className="p-2 rounded-md shadow-md text-blue-400"
          >
            <button type="submit">New</button>
          </Form>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="py-4">
            {contacts?.length === 0 ? (
              <p>
                <i>No contacts</i>
              </p>
            ) : (
              contacts.map((contact) => (
                <li key={contact.id} className="p-4">
                  <Link to={`/contacts/${contact.id}`}>
                    {contact.first} {contact.last}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

// The Layout component is a special export for the root route.
// It acts as your document's "app shell" for all route components, HydrateFallback, and ErrorBoundary
// For more information, see https://reactrouter.com/explanation/special-files#layout-export
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// The top most error boundary for the app, rendered when your app throws an error
// For more information, see https://reactrouter.com/start/framework/route-module#errorboundary
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main id="error-page">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
