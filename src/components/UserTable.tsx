import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchUsers } from "../store/usersSlice";
import useDebounce from "../utils/debounce";

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const status = useSelector((state: RootState) => state.users.status);
  const error = useSelector((state: RootState) => state.users.error);

  const [nameFilter, setNameFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");

  const debouncedNameFilter = useDebounce(nameFilter, 300);
  const debouncedUsernameFilter = useDebounce(usernameFilter, 300);
  const debouncedEmailFilter = useDebounce(emailFilter, 300);
  const debouncedPhoneFilter = useDebounce(phoneFilter, 300);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(debouncedNameFilter.toLowerCase()) &&
        user.username
          .toLowerCase()
          .includes(debouncedUsernameFilter.toLowerCase()) &&
        user.email.toLowerCase().includes(debouncedEmailFilter.toLowerCase()) &&
        user.phone.toLowerCase().includes(debouncedPhoneFilter.toLowerCase())
    );
  }, [
    debouncedNameFilter,
    debouncedUsernameFilter,
    debouncedEmailFilter,
    debouncedPhoneFilter,
    users,
  ]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;

    const regex = new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-700">
        User Management Table
      </h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
              />
              {nameFilter && (
                <button
                  type="button"
                  onClick={() => setNameFilter('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by username"
                value={usernameFilter}
                onChange={(e) => setUsernameFilter(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
              />
              {usernameFilter && (
                <button
                  type="button"
                  onClick={() => setUsernameFilter('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by email"
                value={emailFilter}
                onChange={(e) => setEmailFilter(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
              />
              {emailFilter && (
                <button
                  type="button"
                  onClick={() => setEmailFilter('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by phone"
                value={phoneFilter}
                onChange={(e) => setPhoneFilter(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
              />
              {phoneFilter && (
                <button
                  type="button"
                  onClick={() => setPhoneFilter('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 shadow-md">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Username
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-700">
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    className="hover:bg-gray-100 transition-colors duration-300"
                    key={user.id}
                  >
                    <td className="py-3 px-4 border-b border-gray-200">
                      {highlightText(user.name, nameFilter)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {highlightText(user.username, usernameFilter)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {highlightText(user.email, emailFilter)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200">
                      {highlightText(user.phone, phoneFilter)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default UserTable;
