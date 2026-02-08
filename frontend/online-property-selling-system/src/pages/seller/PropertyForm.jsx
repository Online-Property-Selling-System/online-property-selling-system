import { useState } from "react";

function PropertyForm({ initialData, onSubmit, buttonText }) {
  const [property, setProperty] = useState(initialData);

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProperty({ ...property, images: files });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(property);
  };

  return (
    <div
      className="card p-4 shadow-sm border-0 rounded-4"
      style={{ backgroundColor: "#e9ecef" }}
    >
      <form onSubmit={submitHandler}>
        <div className="row">

          {/* BUY / RENT */}
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Listing Type</label>
            <select
              name="listingType"
              className="form-select bg-white"
              value={property.listingType}
              onChange={handleChange}
              required
            >
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>

            </select>
          </div>

          {/* PROPERTY TITLE */}
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Property Title</label>
            <input
              type="text"
              name="title"
              className="form-control bg-white"
              value={property.title}
              onChange={handleChange}
              required
            />
          </div>




          {/* PRICE */}
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">
              {property.listingType === "rent" ? "Monthly Rent" : "Price"}
            </label>
            <input
              type="number"
              name="price"
              className="form-control bg-white"
              value={property.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* LOCATION */}
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Location</label>
            <select
              name="location"
              className="form-select bg-white"
              value={property.location}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              <option>Pune</option>
              <option>Mumbai</option>
              <option>Karad</option>
              <option>Bangalore</option>
            </select>
          </div>
          {/* ADDRESS */}
          <div className="col-md-12 mb-3">
            <label className="form-label fw-semibold">Full Address</label>
            <textarea
              name="address"
              className="form-control bg-white"
              rows="2"
              placeholder="Enter full property address"
              value={property.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* PROPERTY TYPE */}
          <div className="col-md-6 mb-3">
            <label className="form-label fw-semibold">Property Type</label>
            <select
              name="type"
              className="form-select bg-white"
              value={property.type}
              onChange={handleChange}
            >
              <option>Apartment</option>
              <option>House</option>
              <option>Commercial</option>
              <option>Land</option>
            </select>
          </div>

          {/* BHK (Only for Apartment & House) */}
          {(property.type === "Apartment" || property.type === "House") && (
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">BHK</label>
              <select
                name="bhk"
                className="form-select bg-white"
                value={property.bhk}
                onChange={handleChange}
                required
              >
                <option value="">Select BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5+ BHK</option>
              </select>
            </div>
          )}




          {/* DESCRIPTION */}
          <div className="col-md-12 mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              name="description"
              className="form-control bg-white"
              rows="3"
              value={property.description}
              onChange={handleChange}
            />
          </div>

          {/* IMAGES */}
          <div className="col-md-12 mb-3">
            <label className="form-label fw-semibold">Property Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="form-control bg-white"
              onChange={handleImageChange}
            />
          </div>

          {/* IMAGE PREVIEW */}
          {property.images.length > 0 && (
            <div className="col-md-12 mb-3 d-flex gap-2 flex-wrap">
              {property.images.map((img, index) => (
                <img
                  key={index}
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt="preview"
                  width="110"
                  height="85"
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #adb5bd",
                  }}
                />
              ))}
            </div>
          )}

          {/* SUBMIT */}
          <div className="col-md-12">
            <button type="submit" className="btn btn-dark px-4">
              {buttonText}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default PropertyForm;
