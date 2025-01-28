import { useEffect, useState } from "react";
import { api } from "../api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartMessage, setCartMessage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCartMessage("Please log in to add items to the cart.");
        return;
      }

      await api.post(
        "/cart",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartMessage("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      setCartMessage("Failed to add product to the cart.");
    }

    setTimeout(() => setCartMessage(null), 3000);
  };

  return (
    <div>
      <h1 className="mb-4 font-bold text-2xl">Products</h1>

      {cartMessage && (
        <p className="mb-4 font-semibold text-center text-red-500">
          {cartMessage}
        </p>
      )}

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="shadow p-4 border rounded"
          >
            <h2 className="font-bold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="font-bold text-blue-500">${product.price}</p>

            <div className="flex items-center mt-4">
              <label
                htmlFor={`quantity-${product._id}`}
                className="mr-2"
              >
                Quantity:
              </label>
              <input
                type="number"
                id={`quantity-${product._id}`}
                className="p-1 border rounded w-16 text-center"
                min="1"
                defaultValue="1"
              />
            </div>

            <button
              onClick={() => {
                const quantity = parseInt(
                  document.getElementById(`quantity-${product._id}`).value
                );
                if (quantity > 0) {
                  addToCart(product._id, quantity);
                } else {
                  setCartMessage("Please select a valid quantity.");
                }
              }}
              className="bg-blue-500 hover:bg-blue-600 mt-4 px-4 py-2 rounded text-white"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
