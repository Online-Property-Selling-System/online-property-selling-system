import api from "../../services/api";

/* 🔹 GET ALL USERS (ADMIN) */
export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

/* 🔹 GET ALL PROPERTIES (ADMIN) */
export const getAllProperties = async () => {
  const res = await api.get("/properties");
  return res.data;
};

export const updatePropertyStatus = (propertyId, status) => {
  const token = localStorage.getItem("token");

  return api.put(
    `/properties/${propertyId}/status`,
    null,
    {
      params: { status },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const updateUserStatus = (userId, isActive) => {
  const token = localStorage.getItem("token");

  return api.put(
    `/users/${userId}/isActive`,
    null,
    {
      params: { isActive }, // APPROVED | REJECTED | PENDING
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};


