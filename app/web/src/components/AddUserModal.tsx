import { useState } from "react";

interface IAddUserModal {
  close: () => void;
  submit: (payload: { name: string }) => void;
}

export default function AddUserModal(props: IAddUserModal) {
  const [name, setName] = useState<string>("");

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
            <button className={"ml-auto text-right block"} onClick={props.close}>X</button>
            <h3 className="text-center font-semibold leading-6 text-gray-900" id="modal-title">Add User</h3>
            <label htmlFor="name" className="block mt-4 text-sm font-medium leading-6 text-gray-900">Name</label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                maxLength={40}
                onChange={(event) => setName(event.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                onClick={() => props.submit({ name })}
                disabled={!name}
                className={`inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${name ? "bg-indigo-600 hover:bg-indigo-500" : "cursor-not-allowed bg-gray-400 hover:bg-gray-400"}`}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
