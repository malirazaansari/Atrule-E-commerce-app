import { useEffect, useState } from "react";
import { api } from "../api"; // Axios instance for API calls

const Cart = () => {
  const [cart, setCart] = useState([]); // State to store cart items
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage

        if (!token) {
          setError("User is not logged in. Please log in to view the cart.");
          setLoading(false);
          return;
        }

        // Send GET request with Authorization header
        const response = await api.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the JWT token
          },
        });

        setCart(response.data.products); // Update the cart state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError(
          error.response?.data || "Failed to fetch cart. Please try again."
        );
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Loading state
  if (loading) {
    return <p>Loading your cart...</p>;
  }

  // Error state
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Render the cart
  return (
    <div>
      <h1 className="mb-4 font-bold text-2xl">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="shadow p-4 border rounded"
            >
              <h2 className="font-bold">{item.product.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p className="font-bold text-blue-500">
                Price: ${item.product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
