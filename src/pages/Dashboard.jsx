
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [editCustomer, setEditCustomer] = useState(null);

  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const fetchUser = async () => {
    if (!storedUser || !storedUser.token) {
      navigate("/");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.error(error);
      alert("Unauthorized. Please login again.");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const fetchAllUsers = async () => {
    if (!storedUser || !storedUser.token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/users/all", {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });
      setAllUsers(res.data);
    } catch (error) {
      console.error("Error fetching all users:", error);
      alert("Failed to fetch users.");
    }
  };

  const fetchCustomers = async () => {
    if (!storedUser || !storedUser.token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/customers", {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });
      setCustomers(res.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      alert("Failed to fetch customers.");
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!storedUser || !storedUser.token) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/customers",
        newCustomer,
        {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        }
      );
      alert("Customer added successfully!");
      setNewCustomer({ name: "", email: "", phone: "", notes: "" });
      fetchCustomers(); 
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer.");
    }
  };

  const handleDelete = async (customerId) => {
    if (!storedUser || !storedUser.token) return;

    try {
      await axios.delete(`http://localhost:5000/api/customers/${customerId}`, {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });
      alert("Customer deleted successfully!");
      fetchCustomers(); 
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!storedUser || !storedUser.token || !editCustomer) return;

    try {
      await axios.put(
        `http://localhost:5000/api/customers/${editCustomer._id}`,
        editCustomer,
        {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        }
      );
      alert("Customer updated successfully!");
      setEditCustomer(null); 
      fetchCustomers(); 
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Failed to update customer.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {user ? (
          <>
            <p className="text-lg mb-2">
              Welcome, <strong>{user.name}</strong>!
            </p>
            <p className="text-gray-600 mb-4">Email: {user.email}</p>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
              <button
                onClick={fetchCustomers}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Get Customers
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
  <Link
    to="/campaign-creation"
    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
  >
    Create Campaign
  </Link>
</div>

            
            <form
              onSubmit={handleAddCustomer}
              className="bg-gray-50 p-4 rounded mb-4 shadow"
            >
              <h3 className="text-lg font-semibold mb-2">Add Customer</h3>
              <input
                type="text"
                placeholder="Name"
                value={newCustomer.name}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, name: e.target.value })
                }
                className="block w-full mb-2 p-2 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newCustomer.email}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, email: e.target.value })
                }
                className="block w-full mb-2 p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={newCustomer.phone}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, phone: e.target.value })
                }
                className="block w-full mb-2 p-2 border rounded"
                required
              />
              <textarea
                placeholder="Notes"
                value={newCustomer.notes}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, notes: e.target.value })
                }
                className="block w-full mb-2 p-2 border rounded"
                rows={3}
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Add Customer
              </button>
            </form>

            
            {editCustomer && (
              <form
                onSubmit={handleUpdate}
                className="bg-gray-50 p-4 rounded mb-4 shadow"
              >
                <h3 className="text-lg font-semibold mb-2">Update Customer</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={editCustomer.name}
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, name: e.target.value })
                  }
                  className="block w-full mb-2 p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editCustomer.email}
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, email: e.target.value })
                  }
                  className="block w-full mb-2 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={editCustomer.phone}
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, phone: e.target.value })
                  }
                  className="block w-full mb-2 p-2 border rounded"
                  required
                />
                <textarea
                  placeholder="Notes"
                  value={editCustomer.notes}
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, notes: e.target.value })
                  }
                  className="block w-full mb-2 p-2 border rounded"
                  rows={3}
                />
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Update Customer
                </button>
              </form>
            )}

            
            {customers.length > 0 && (
              <div className="text-left mt-6 overflow-x-auto">
                <h3 className="text-xl font-semibold mb-3">All Customers</h3>
                <table className="min-w-full border text-sm bg-white rounded shadow overflow-hidden">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Email</th>
                      <th className="p-2 border">Phone</th>
                      <th className="p-2 border">Company</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Notes</th>
                      <th className="p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((c) => (
                      <tr key={c._id} className="hover:bg-gray-50">
                        <td className="p-2 border">{c.name || "-"}</td>
                        <td className="p-2 border">{c.email || "-"}</td>
                        <td className="p-2 border">{c.phone || "-"}</td>
                        <td className="p-2 border">{c.company || "-"}</td>
                        <td className="p-2 border">{c.status || "-"}</td>
                        <td className="p-2 border">{c.notes || "-"}</td>
                        <td className="p-2 border">
                          <button
                            onClick={() => setEditCustomer(c)}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(c._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
