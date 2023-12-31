import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, deleteUser, addUser } from "../apis";
import AddUserModal from "./AddUserModal";

interface IUser {
  id: string;
  name: string;
  created: string;
}

export default function UserList() {
  const [showUserModal, setShowUserModal] = React.useState<boolean>(false);
  const { data: users, refetch} = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);

    setShowUserModal(false);
    refetch();
  }

  const handleAddUser = async (payload: { name: string }) => {
    await addUser(payload);

    setShowUserModal(false);
    refetch();
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their id, name and created date.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button onClick={() => setShowUserModal(true)} type="button" className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                  ID
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Created
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody className="bg-white">
              <tr></tr>
              {users?.data?.length > 0 && users?.data.map((user: IUser) => (
                <tr key={user.id} className="even:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                    {user.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(user.created).toLocaleDateString()}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                    <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              )) }
              </tbody>
            </table>
            {!users?.data?.length && <div className={"py-4 font-medium text-gray-700 text-center"}>There is no record yet...</div>}
          </div>
        </div>
      </div>
      {showUserModal && <AddUserModal close={() => setShowUserModal(false)} submit={handleAddUser} />}
    </div>
  )
}
