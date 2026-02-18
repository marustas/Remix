import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  route("about", "routes/about.tsx"),
  layout("layouts/sidebar.tsx", [
    index("routes/home.tsx"),
    ...prefix("contacts/:contactId", [
      index("routes/contacts.tsx"),
      route("edit", "routes/edit-contact.tsx"),
      route("destroy", "routes/destroy-contact.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
