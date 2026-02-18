import { Link } from "react-router";

export default function About() {
  return (
    <div className="w-screen h-screen py-4 px-8 flex flex-col gap-4">
      <Link to="/">← Go to demo</Link>
      <h1 className="font-bold text-3xl">About React Router Contacts</h1>
      <div className="flex flex-col gap-4">
        <p>
          This is a demo application showing off some of the powerful features
          of React Router, including dynamic routing, nested routes, loaders,
          actions, and more.
        </p>

        <h2 className="font-bold text-xl">Features</h2>
        <p>Explore the demo to see how React Router handles:</p>
        <ul>
          <li>Data loading and mutations with loaders and actions</li>
          <li>Nested routing with parent/child relationships</li>
          <li>URL-based routing with dynamic segments</li>
          <li>Pending and optimistic UI</li>
        </ul>

        <h2 className="font-bold text-xl">Learn More</h2>
        <p>
          Check out the official documentation at{" "}
          <a href="https://reactrouter.com">reactrouter.com</a> to learn more
          about building great web applications with React Router.
        </p>
      </div>
    </div>
  );
}
