import PropertyListing from "./PropertyListing";


function Buy() {
  return (
    <>
      {/* Buy Hero UI */}
      <PropertyListing
        type="SALE"
        title="Properties for Sale"
        subtitle="Explore verified properties to buy"
      />
    </>
  );
}

export default Buy;
