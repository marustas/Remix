import { Form, redirect } from "react-router";

import { getContact, updateContact } from "../data";
import type { Route } from "./+types/edit-contact";

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);

  return redirect(`/contacts/${params.contactId}`);
}

export async function loader({ params }: Route.LoaderArgs) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return { contact };
}

export default function EditContact({ loaderData }: Route.ComponentProps) {
  const { contact } = loaderData;

  return (
    <Form
      key={contact.id}
      id="contact-form"
      method="post"
      className="flex flex-col gap-4 w-full p-12"
    >
      <p className="flex items-center">
        <span className="items-start w-32">Name</span>
        <input
          aria-label="First name"
          defaultValue={contact.first}
          name="first"
          placeholder="First"
          type="text"
          className="p-2 rounded-md shadow-md bg-white text-gray-400 grow"
        />
        <input
          aria-label="Last name"
          defaultValue={contact.last}
          name="last"
          placeholder="Last"
          type="text"
          className="p-2 rounded-md shadow-md bg-white text-gray-400 grow ml-4"
        />
      </p>
      <label className="flex items-center">
        <span className="w-32">Twitter</span>
        <input
          defaultValue={contact.twitter}
          name="twitter"
          placeholder="@jack"
          type="text"
          className="p-2 rounded-md shadow-md bg-white text-gray-400 grow-2"
        />
      </label>
      <label className="flex items-center">
        <span className="w-32">Avatar URL</span>
        <input
          aria-label="Avatar URL"
          defaultValue={contact.avatar}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
          className="p-2 rounded-md shadow-md bg-white text-gray-400 grow-2"
        />
      </label>
      <label className="flex items-center">
        <span className="w-32">Notes</span>
        <textarea
          defaultValue={contact.notes}
          className="p-2 rounded-md shadow-md bg-white grow-2"
          name="notes"
          rows={6}
        />
      </label>
      <p className="flex gap-1 justify-end">
        <button
          className="rounded-md shadow-md bg-white text-blue-400 p-2 hover:cursor-pointer hover:bg-gray-200 transition-colors transition-duration-150"
          type="submit"
        >
          Save
        </button>
        <button
          className="rounded-md shadow-md bg-white p-2 hover:cursor-pointer"
          type="button"
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
