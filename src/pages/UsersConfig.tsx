import React, { useState, useEffect } from "react";
import fetchWithAuth from "../utils/fetchWithAuth";
import Layout from "../components/Layout";
import { Toggle } from "@fluentui/react";

const UsersConfig = () => {

  type user = {
    id: string;
    email: string;
    isAdmin: boolean;
  };

  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetchWithAuth(`/Auth/GetAllUsers`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle admin status
  const toggleAdmin = async (userId: string, isAdmin: boolean) => {
    try {

      await fetchWithAuth("/Auth/ToggleAdmin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, isAdmin: !isAdmin }),
      });
      fetchUsers();
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="mx-8 py-8">
        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="min-w-full border-2 bg-slate-100">
            <thead className="bg-white border-b-2 border-slate/500">
              <tr>
                <th className="py-2 px-4 text-start">Email</th>
                <th className="py-2 px-4 text-start">Es Admin</th>
                <th className="py-2 px-4 text-start">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className={`${index % 2 !== 0 ? "bg-slate-300" : ""}`}>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.isAdmin ? "Si" : "No"}</td>
                  <td className="py-2 px-4">
                    <Toggle defaultChecked={user.isAdmin} onText="" offText="" onChange={() => toggleAdmin(user.id, user.isAdmin)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default UsersConfig;
