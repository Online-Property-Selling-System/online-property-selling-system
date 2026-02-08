import api from "./api";

export const bookProperty = async (propertyId, buyerId) => {
  const token = localStorage.getItem("token");

  return api.post(
    "/api/bookings",
    {
      propertyId,
      buyerId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};


export const getBookingsByBuyer = async (buyerId) => {
  const token = localStorage.getItem("token");

  const res = await api.get(`/api/bookings/buyer/${buyerId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};


export const getBookingsBySeller = async (sellerId) => {
  const token = localStorage.getItem("token");

  const res = await api.get(`/api/bookings/seller/${sellerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

  

export const updateBookingStatus = async (bookingId, status) => {
  const token = localStorage.getItem("token");

  return api.put(
    `/api/bookings/${bookingId}/status`,
    { status }, // BOOKED or REJECTED
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};