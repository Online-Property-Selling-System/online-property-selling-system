import { useState } from "react";
import { useEffect } from "react";
import {
  getAllUsers,
  getAllProperties,
  updatePropertyStatus,
  updateUserStatus   
} from "./adminService";



function AdminDashboard() {
  const [managementMode, setManagementMode] = useState("properties");
  const [activeTab, setActiveTab] = useState("pending");
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const [usersRes, propertiesRes] = await Promise.all([
        getAllUsers(),
        getAllProperties()
      ]);

      /* ================= USERS ================= */
      setUsers(
        usersRes
          .filter(u => u.role !== "ADMIN")
          .map(u => ({
            id: u.userId,

            // ✅ FIXED FIELD NAMES
            name: `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim() || "N/A",
            email: u.email,
            role: u.role,
            status:
              u.isActive === "APPROVED"
                ? "approved"
                : u.isActive === "REJECTED"
                  ? "rejected"
                  : "pending",
            phoneNumber: u.phone_number,
            regDate: u.reg_date,
            isActive: u.is_active
          }))
      );



      /* ================= PROPERTIES ================= */
      setProperties(
        propertiesRes.map(p => ({
          id: p.propertyId,
          title: p.title,

          // ✅ FIXED FIELD NAMES
          seller: p.user_id ?? "N/A",
          city: p.location,
          price: p.price,
          status: p.status?.toLowerCase(),

          propertyType: p.property_type,
          bhk: p.bhk,
          registerDate: p.register_date
        }))
      );


    } catch (err) {
      console.error("Admin data load failed", err);
    }
  };


  useEffect(() => {
    // Disable back navigation cache
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      navigate("/login", { replace: true });
    };
  }, []);

  /* ---------- DERIVED STATS (AUTO UPDATE) ---------- */

  const totalProperties = properties.length;
  const pendingProperties = properties.filter(p => p.status === "pending").length;
  const approvedProperties = properties.filter(p => p.status === "approved").length;
  const totalUsers = users.length;

  return (
    <div style={{ paddingTop: "72px" }}>
      <div className="container mb-5">

        {/* HEADER */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            className="d-flex align-items-center justify-content-center text-white"
            style={{ width: 48, height: 48, borderRadius: 12, background: "#0d1117" }}
          >
            <i className="bi bi-speedometer2"></i>
          </div>
          <div>
            <h5 className="fw-bold mb-0">Admin Dashboard</h5>
            <small className="text-muted"></small>
          </div>
        </div>

        {/* STATS */}
        <div className="row g-3 mb-4">
          <StatCard title="Total Properties" value={totalProperties} icon="house" />
          <StatCard title="Pending Properties" value={pendingProperties} icon="clipboard" color="warning" />
          <StatCard title="Approved Properties" value={approvedProperties} icon="check-circle" color="success" />
          <StatCard title="Total Users" value={totalUsers} icon="people" color="primary" />
        </div>

        {/* TOGGLE BUTTON */}
        <div className="row g-3" >
          <ToggleCard
            icon={managementMode === "properties" ? "people" : "house"}
            title={managementMode === "properties" ? "Manage Users" : "Manage Properties"}
            desc="Switch management view"
            onClick={() => {
              setActiveTab("pending");
              setManagementMode(
                managementMode === "properties" ? "users" : "properties"
              );
            }}
          />
        </div>
        <div style={{ paddingTop: "12px" }}>
          {/* MANAGEMENT SECTION */}
          {managementMode === "properties" ? (
            <PropertyManagement
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              properties={properties}
              setProperties={setProperties}
            />
          ) : (
            <UserManagement
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              users={users}
              setUsers={setUsers}
            />
          )}
        </div>


      </div>
    </div>
  );
}

/* ================= PROPERTY MANAGEMENT ================= */

function PropertyManagement({ activeTab, setActiveTab, properties, setProperties }) {
  const filtered = filterByStatus(properties, activeTab);

  return (
    <ManagementCard title="Property Management" activeTab={activeTab} setActiveTab={setActiveTab} counts={[
      properties.filter(p => p.status === "pending").length,
      properties.filter(p => p.status === "approved").length,
      properties.filter(p => p.status === "rejected").length,
    ]}>
      <table className="table align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Seller ID</th>
            <th>City</th>
            <th>Type</th>
            <th>BHK</th>
            <th>Price</th>
            <th>Status</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.title}</td>
              <td>{p.seller}</td>
              <td>{p.city}</td>
              <td>{p.propertyType}</td>
              <td>{p.bhk ?? "-"}</td>
              <td>₹{p.price.toLocaleString()}</td>
              <td><StatusBadge status={p.status} /></td>
              <td>{p.registerDate ?? "-"}</td>
              <td>
                <ActionButtons
                  onApprove={async () => {
                    try {
                      await updatePropertyStatus(p.id, "APPROVED");
                      updateStatus(setProperties, p.id, "approved"); // UI sync
                    } catch (e) {
                      alert("Failed to approve property");
                    }
                  }}
                  onReject={async () => {
                    try {
                      await updatePropertyStatus(p.id, "REJECTED");
                      updateStatus(setProperties, p.id, "rejected"); // UI sync
                    } catch (e) {
                      alert("Failed to reject property");
                    }
                  }}
                />

              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </ManagementCard>
  );
}

/* ================= USER MANAGEMENT ================= */

function UserManagement({ activeTab, setActiveTab, users, setUsers }) {
  const filtered = filterByStatus(users, activeTab);

  const handleUserApprove = async (userId) => {
    await updateUserStatus(userId, "APPROVED");
    updateStatus(setUsers, userId, "approved");
  };

  const handleUserReject = async (userId) => {
    await updateUserStatus(userId, "REJECTED");
    updateStatus(setUsers, userId, "rejected");
  };
  return (
    <ManagementCard title="User Management" activeTab={activeTab} setActiveTab={setActiveTab} counts={[
      users.filter(u => u.status === "pending").length,
      users.filter(u => u.status === "approved").length,
      users.filter(u => u.status === "rejected").length,
    ]}>
      <table className="table align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th>Registered</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phoneNumber ?? "-"}</td>
              <td>{u.role}</td>
              <td><StatusBadge status={u.status} /></td>
              <td>{u.regDate ?? "-"}</td>
              <td>
                <ActionButtons
                  onApprove={() => handleUserApprove(u.id)}
                  onReject={() => handleUserReject(u.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </ManagementCard>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

const filterByStatus = (data, status) =>
  data.filter(item => item.status === status);

const updateStatus = (setFn, id, status) => {
  setFn(prev =>
    prev.map(item =>
      item.id === id ? { ...item, status } : item
    )
  );
};

function ManagementCard({ title, children, activeTab, setActiveTab, counts }) {
  return (
    <div className="card shadow-sm p-4 mb-4">
      <h6 className="fw-bold mb-3">{title}</h6>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} counts={counts} />
      <div className="table-responsive">{children}</div>
    </div>
  );
}

function Tabs({ activeTab, setActiveTab, counts }) {
  const labels = ["pending", "approved", "rejected"];
  return (
    <div className="d-flex gap-2 mb-3 bg-light rounded-pill p-1">
      {labels.map((l, i) => (
        <button
          key={l}
          className={`btn rounded-pill px-4 ${activeTab === l ? "btn-white shadow-sm" : "btn-light"}`}
          onClick={() => setActiveTab(l)}
        >
          {l.charAt(0).toUpperCase() + l.slice(1)} ({counts[i]})
        </button>
      ))}
    </div>
  );
}

function ActionButtons({ onApprove, onReject }) {
  return (
    <>
      <button className="btn btn-success btn-sm me-2" onClick={onApprove}>
        <i className="bi bi-check"></i> Approve
      </button>
      <button className="btn btn-danger btn-sm" onClick={onReject}>
        <i className="bi bi-x"></i> Reject
      </button>
    </>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: "warning",
    approved: "success",
    rejected: "danger",
  };
  return (
    <span className={`badge bg-${map[status]}`}>
      {status.toUpperCase()}
    </span>
  );
}

function StatCard({ title, value, icon, color = "secondary" }) {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm p-3 h-100">
        <div className="d-flex justify-content-between">
          <div>
            <small className="text-muted">{title}</small>
            <h4 className="fw-bold">{value}</h4>
          </div>
          <div className={`rounded-circle bg-${color}-subtle text-${color} d-flex align-items-center justify-content-center`}
            style={{ width: 44, height: 44 }}>
            <i className={`bi bi-${icon}`}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleCard({ icon, title, desc, onClick }) {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm p-3 d-flex flex-row gap-3 align-items-center"
        style={{ cursor: "pointer" }} onClick={onClick}>
        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center"
          style={{ width: 44, height: 44 }}>
          <i className={`bi bi-${icon}`}></i>
        </div>
        <div>
          <h6 className="fw-semibold mb-1">{title}</h6>
          <small className="text-muted">{desc}</small>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
