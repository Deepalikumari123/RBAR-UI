import React, { useState, useEffect } from "react";
import axios from "axios";

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then((res) => setRoles(res.data));
    axios.get("http://localhost:5000/permissions").then((res) => setPermissions(res.data));
  }, []);

  const addRole = () => {
    axios.post("http://localhost:5000/roles", newRole).then((res) => {
      setRoles([...roles, res.data]);
      setNewRole({ name: "", permissions: [] });
    });
  };

  return (
    <div>
      <h1>Role Management</h1>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Permissions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New Role</h3>
      <input
        type="text"
        placeholder="Role Name"
        value={newRole.name}
        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
      />
      <select
        multiple
        value={newRole.permissions}
        onChange={(e) =>
          setNewRole({
            ...newRole,
            permissions: Array.from(e.target.selectedOptions, (opt) => opt.value),
          })
        }
      >
        {permissions.map((perm) => (
          <option key={perm.id} value={perm.name}>
            {perm.name}
          </option>
        ))}
      </select>
      <button onClick={addRole}>Add Role</button>
    </div>
  );
}

export default RoleManagement;
