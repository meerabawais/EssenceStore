export default function BlogSidebar() {
    const colors = [
  "#ffffff",
  "#b3b3b3",
  "#000000",
  "#001dff",
  "#e40046",
  "#fff56d",
  "#ff6b4a",
  "#b19d8d",
  "#5d8d28",
  "#8360b2",
];
  return (
    <div className="shop_sidebar_area">

      <h4>Categories</h4>

      <p>All</p>

      <p>Clothing</p>

      <p>Shoes</p>

      <p>Accessories</p>
      <h4>Filter By</h4>
      <h6>Colors</h6>
      <div className="color-options">
  {colors.map((color, index) => (
    <button
      key={index}
      className="color-box"
      style={{ backgroundColor: color }}
      aria-label={`Color ${index + 1}`}
    />
  ))}
</div>
<br></br>
<h6>Brands</h6>
<p>Asos</p>
<p>Gucci</p>
<p>Mango</p>
<p>Zara</p>
    </div>
  );
}