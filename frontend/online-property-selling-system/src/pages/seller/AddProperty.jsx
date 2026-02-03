import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropertyForm from "./PropertyForm";
import { addProperty, uploadPropertyImages } from "../../services/propertyService";

function AddProperty() {
  const navigate = useNavigate();

  const initialData = {
    listingType: "buy",
    title: "",
    price: "",
    location: "",
    type: "Apartment",
    description: "",
    address: "",
    bhk: "",
    images: []
  };

  const handleAdd = async (data) => {
    try {
      // ✅ Correct payload (NO userId)
      const payload = {
        listType: data.listingType === "buy" ? "SALE" : "RENT",
        title: data.title,
        address: data.address,
        location: data.location,
        propertyType: data.type.toUpperCase(),
        description: data.description,
        price: Number(data.price),
        bhk: data.bhk ? Number(data.bhk) : null,
      };
console.log("FINAL PAYLOAD:", payload);


      // ✅ Step 1: Add property
      const propertyId = await addProperty(payload);

      // ✅ Step 2: Upload images
      if (data.images && data.images.length > 0) {
        await uploadPropertyImages(propertyId, data.images);
      }

      toast.success("Property added successfully 🏠");
      navigate("/seller");

    } catch (error) {
      console.error(error);
      toast.error("Failed to add property");
    }
  };

  return (
    <div style={{ paddingTop: "72px" }}>
      <div className="container mt-4">

        <div
          className="card mb-4 border-0 rounded-4 shadow-sm"
          style={{ backgroundColor: "#dee2e6" }}
        >
          <div className="card-body d-flex align-items-center gap-3">
            <div
              className="text-white d-flex align-items-center justify-content-center"
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "12px",
                background: "#0d1117"
              }}
            >
              <i className="bi bi-house-add fs-5"></i>
            </div>
            <h5 className="mb-0 fw-bold">Add Property</h5>
          </div>
        </div>

        <PropertyForm
          initialData={initialData}
          onSubmit={handleAdd}
          buttonText="Add Property"
        />

      </div>
    </div>
  );
}

export default AddProperty;
