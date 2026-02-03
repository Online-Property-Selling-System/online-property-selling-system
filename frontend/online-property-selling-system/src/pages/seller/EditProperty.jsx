import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropertyForm from "./PropertyForm";
import {
  getPropertyById,
  updateProperty,
  updatePropertyImages,
} from "../../services/propertyService";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty({
          listingType: data.listType === "SALE" ? "buy" : "rent",
          title: data.title,
          price: data.price,
          location: data.location,
          type: data.propertyType,
          description: data.description,
          images: data.images || [],
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load property");
      }
    };

    fetchProperty();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      // 🔹 1️⃣ Update PROPERTY INFO
      await updateProperty(id, userId, {
        listType: data.listingType === "buy" ? "SALE" : "RENT", // ✅ FIX
        title: data.title,
        address: data.address,
        location: data.location,
        propertyType: data.type.toUpperCase(),
        description: data.description,
        price: Number(data.price),
      });

      // 🔹 2️⃣ Update IMAGES
      if (data.images && data.images.length > 0) {
        await updatePropertyImages(id, userId, data.images);
      }

      toast.success("Property updated successfully");
      navigate("/seller");
    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data || err.message);
      toast.error("Update failed");
    }
  };

  if (!property) return null;

  return (
    <div style={{ paddingTop: "72px" }}>
      <div className="container mt-4">
        <h5 className="fw-bold mb-3">Edit Property</h5>

        <PropertyForm
          initialData={property}
          onSubmit={handleUpdate}
          buttonText="Update Property"
        />
      </div>
    </div>
  );
}

export default EditProperty;
