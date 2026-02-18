import { getContact, updateContact, type ContactRecord } from "~/data";
import type { Route } from "./+types/contacts";
import { data, Form, useFetcher } from "react-router";

export async function action({ request, params }: Route.ActionArgs) {
  const { contactId } = params;

  const formData = await request.formData();

  return updateContact(contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export async function loader({ params }: Route.LoaderArgs) {
  const { contactId } = params;

  const contact = await getContact(contactId);

  if (!contact) {
    throw data(
      {
        message: "Contact not found",
      },
      {
        status: 404,
      },
    );
  }

  return { contact };
}

export default function Contacts({ loaderData }: Route.ComponentProps) {
  const { contact } = loaderData;

  return (
    <div className="flex items-center justify-center max-w-2xl">
      <div className="p-4">
        <img
          alt={`${contact.first} ${contact.last} avatar`}
          key={contact.avatar}
          src={contact.avatar}
          className="rounded-md w-48 h-48 object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <h1 className="font-bold text-2xl flex flex-row gap-2">
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter ? (
          <p>
            <a
              className="text-blue-500 hover:underline"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div className="flex gap-2">
          <Form action="edit">
            <button
              className="p-2 rounded-md shadow-md bg-white text-blue-400"
              type="submit"
            >
              Edit
            </button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record.",
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button
              className="p-2 rounded-md shadow-md bg-white text-red-400"
              type="submit"
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: { contact: Pick<ContactRecord, "favorite"> }) {
  const fetcher = useFetcher();
  const favorite =
    fetcher.formData?.get("favorite") === "true" || contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite ? "false" : "true"}
        className="text-amber-300"
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
