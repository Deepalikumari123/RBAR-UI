import React, { useState, useEffect } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "../services/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "", status: "Active" });

  useEffect(() => {
    fetchUsers().then((res) => setUsers(res.data));
  }, []);

  const handleCreate = () => {
    createUser(form).then(() => fetchUsers().then((res) => setUsers(res.data)));
  };

  const handleDelete = (id) => {
    deleteUser(id).then(() => fetchUsers().then((res) => setUsers(res.data)));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 mr-2"
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 mr-2"
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
        </select>
        <button onClick={handleCreate} className="bg-blue-500 text-white p-2">
          Add User
        </button>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">{user.status}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white p-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
