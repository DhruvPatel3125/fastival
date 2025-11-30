import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // ✅ New states for cart item management
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemForm, setItemForm] = useState({
    userEmail: "",
    name: "",
    price: "",
    quantity: "",
    image: ""
  });

  // ✅ get logged in user from localStorage
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  // ✅ attach admin auth header
  const headers = {};
  if (user && user.email) headers["x-user-email"] = user.email;

  // ✅ axios instance
  const api = axios.create({
    baseURL: "http://localhost:5000/api/admin",
    headers,
  });

  // ✅ fetch all admin data
  const fetchAll = async () => {
    if (!user || user.email !== "admin@gmail.com") {
      setError("You must be logged in as admin to access this page.");
      return;
    }

    setLoading(true);
    try {
      const [uRes, iRes, lRes] = await Promise.all([
        api.get("/users"), // ✅ users
        api.get("/carts"), // ✅ cart
        api.get("/logs"),  // ✅ login logs
      ]);

      // ✅ Save data into states
      setUsers(uRes.data.users || []);
      setItems(iRes.data.items || []);
      setLogs(lRes.data.logs || []);
    } catch (err) {
      console.error("Admin fetch error:", err?.response?.data || err.message);
      setError("Failed to fetch admin data. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, []);

  // ✅ delete user + related cart items
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user and all their cart items?")) return;
    try {
      const userToDelete = users.find((u) => u._id === id);
      await api.delete(`/user/${id}`);

      setUsers((prev) => prev.filter((u) => u._id !== id));
      if (userToDelete) {
        setItems((prev) => prev.filter((it) => it.userEmail !== userToDelete.email));
      }
      alert("User deleted");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  // ✅ delete individual cart item
  const handleDeleteItem = async (id) => {
    if (!window.confirm("Delete this cart item?")) return;
    try {
      await api.delete(`/cart/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
      alert("Item deleted");
    } catch (err) {
      console.error(err);
      alert("Failed to delete item");
    }
  };

  // ✅ NEW: Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ NEW: Reset form
  const resetForm = () => {
    setItemForm({
      userEmail: "",
      name: "",
      price: "",
      quantity: "",
      image: ""
    });
    setEditingItem(null);
    setShowItemForm(false);
  };

  // ✅ NEW: Create new cart item
  const handleCreateItem = async (e) => {
    e.preventDefault();
    
    if (!itemForm.userEmail || !itemForm.name || !itemForm.price || !itemForm.quantity) {
      alert("Please fill in all required fields (User Email, Name, Price, Quantity)");
      return;
    }

    try {
      const response = await api.post("/cart", itemForm);
      setItems(prev => [...prev, response.data.item]);
      resetForm();
      alert("Cart item created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create cart item: " + (err.response?.data?.message || err.message));
    }
  };

  // ✅ NEW: Update existing cart item
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    
    if (!itemForm.userEmail || !itemForm.name || !itemForm.price || !itemForm.quantity) {
      alert("Please fill in all required fields (User Email, Name, Price, Quantity)");
      return;
    }

    try {
      const response = await api.put(`/cart/${editingItem._id}`, itemForm);
      setItems(prev => prev.map(item => 
        item._id === editingItem._id ? response.data.item : item
      ));
      resetForm();
      alert("Cart item updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update cart item: " + (err.response?.data?.message || err.message));
    }
  };

  // ✅ NEW: Edit cart item
  const handleEditItem = (item) => {
    setEditingItem(item);
    setItemForm({
      userEmail: item.userEmail,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image || ""
    });
    setShowItemForm(true);
  };

  // ✅ NEW: Add new item button handler
  const handleAddNewItem = () => {
    resetForm();
    setShowItemForm(true);
  };

  // 🚨 non-admin message
  if (error) {
    return (
      <div className="admin-wrap">
        <h2>Admin Dashboard</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="admin-wrap">

      {/* Tabs */}
      <div className="admin-tabs">
        <button className={tab === "users" ? "active" : ""} onClick={() => setTab("users")}>
          Users
        </button>
        <button className={tab === "items" ? "active" : ""} onClick={() => setTab("items")}>
          Cart
        </button>
        <button className={tab === "logs" ? "active" : ""} onClick={() => setTab("logs")}>
          Login Logs
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {/* ✅ Users Table */}
      {tab === "users" && (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role || "user"}</td>
                    <td>{new Date(u.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="danger" onClick={() => handleDeleteUser(u._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Cart Table */}
      {tab === "items" && (
        <div className="admin-table">
          {/* NEW: Add Item Button */}
          <div className="admin-actions">
            <button className="btn-primary" onClick={handleAddNewItem}>
              + Add New Cart Item
            </button>
          </div>

          {/* NEW: Cart Item Form */}
          {showItemForm && (
            <div className="admin-form">
              <h3>{editingItem ? "Edit Cart Item" : "Add New Cart Item"}</h3>
              <form onSubmit={editingItem ? handleUpdateItem : handleCreateItem}>
                <div className="form-group">
                  <label>User Email *</label>
                  <input
                    type="email"
                    name="userEmail"
                    value={itemForm.userEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Item Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={itemForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    value={itemForm.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    name="quantity"
                    value={itemForm.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={itemForm.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingItem ? "Update Item" : "Create Item"}
                  </button>
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <table>
            <thead>
              <tr>
                <th>User Email</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((it) => (
                  <tr key={it._id}>
                    <td>{it.userEmail}</td>
                    <td>{it.name}</td>
                    <td>${it.price}</td>
                    <td>{it.quantity}</td>
                    <td>
                      {it.image ? (
                        <img 
                          src={it.image} 
                          alt={it.name} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td>{new Date(it.createdAt).toLocaleString()}</td>
                    <td>
                      <button 
                        className="btn-edit" 
                        onClick={() => handleEditItem(it)}
                        style={{marginRight: '8px'}}
                      >
                        Edit
                      </button>
                      <button 
                        className="danger" 
                        onClick={() => handleDeleteItem(it._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No cart items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Logs Table */}
      {tab === "logs" && (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Success</th>
                <th>IP</th>
                <th>User Agent</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((l) => (
                  <tr key={l._id}>
                    <td>{l.email}</td>
                    <td>{l.success ? "✅" : "❌"}</td>
                    <td>{l.ip || "-"}</td>
                    <td className="ua">{l.userAgent}</td>
                    <td>{new Date(l.timestamp).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No login logs found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;