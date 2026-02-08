import api from "./api";

/* 🔹 ADD PROPERTY */
export const addProperty = async (property) => {
  const response = await api.post("/properties/add", property);
  return response.data;
};

/* 🔹 UPLOAD PROPERTY IMAGES */
export const uploadPropertyImages = async (propertyId, images) => {
  const formData = new FormData();
  images.forEach((file) => formData.append("images", file));

  const response = await api.post(
    `/properties/${propertyId}/images`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response.data;
};

/* 🔹 GET SELLER PROPERTIES */
export const getSellerProperties = async (userId) => {
  const response = await api.get(`/properties/user/${userId}`);
  return response.data;
};

/* 🔹 DELETE PROPERTY */
export const deleteProperty = async (propertyId) => {
  const response = await api.delete(`/properties/${propertyId}`);
  return response.data;
};

/* 🔹 GET PROPERTY BY ID */
export const getPropertyById = async (propertyId) => {
  const response = await api.get(`/properties/${propertyId}`);
  return response.data;
};

/* 🔹 UPDATE PROPERTY INFO ✅ FIXED */
export const updateProperty = async (propertyId, userId, data) => {
  return api.put(
    `/properties/${propertyId}`,
    data,
    { params: { userId } }
  );
};

/* 🔹 UPDATE PROPERTY IMAGES ✅ FIXED */
export const updatePropertyImages = async (propertyId, userId, images) => {
  const formData = new FormData();
  images.forEach(img => formData.append("images", img));

  return api.put(
    `/properties/${propertyId}/images`,
    formData,
    {
      params: { userId },
      headers: { "Content-Type": "multipart/form-data" }
    }
  );
};


// ✅ CORRECT
export const getApprovedProperties = async (type) => {
  const res = await api.get("/properties/approved", {
    params: { type }
  });
  return res.data;
};




/* 🔹 GET FILTERED APPROVED PROPERTIES (RENT / SALE) */
export const getFilteredApprovedProperties = async (params) => {
  const response = await api.get("/properties/approved/filter", {
    params
  });
  return response.data;
};




export const getPropertyDetails = async (propertyId) => {
  const response = await api.get(`/properties/${propertyId}`);
  return response.data;
};


export const getAllProperties = async () => {
  const res = await api.get("/properties");
  return res.data;
};