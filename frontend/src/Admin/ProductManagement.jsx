import React, { useState, useEffect } from "react";
import api from "../api/api";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: 0,
    discount: 0
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const prodRes = await api.get("products/?no_pagination=true");
      const productsData =
        prodRes.data.results || (Array.isArray(prodRes.data) ? prodRes.data : []);
      setProducts(productsData);

      const catRes = await api.get("categories/");
      setCategories(catRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  };

  // =========================
  // ADD PRODUCT (UPDATED)
  // =========================
  const handleAdd = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      showToast("Please fill Name, Price and Category");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", Number(newProduct.price));
    formData.append("category", newProduct.category);
    formData.append("stock", Number(newProduct.stock));
    formData.append("discount", Number(newProduct.discount));

    if (newProduct.image instanceof File) {
      formData.append("image", newProduct.image);
    }

    try {
      await api.post("products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: 0,
        discount: 0,
      });

      fetchData();
      showToast("Product added successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      showToast("Failed to add product");
    }
  };

  // =========================
  // UPDATE PRODUCT (UPDATED)
  // =========================
  const handleUpdate = async () => {
    const formData = new FormData();

    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", Number(newProduct.price));
    formData.append("category", newProduct.category);
    formData.append("stock", Number(newProduct.stock));
    formData.append("discount", Number(newProduct.discount));

    if (newProduct.image instanceof File) {
      formData.append("image", newProduct.image);
    }

    try {
      await api.patch(`products/${editingProduct.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setEditingProduct(null);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: 0,
        discount: 0,
      });

      fetchData();
      showToast("Product updated successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      showToast("Failed to update product");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      api
        .delete(`products/${id}/`)
        .then(() => {
          fetchData();
          showToast("Product deleted successfully!");
        })
        .catch((err) => {
          console.error(err);
          showToast("Failed to delete product");
        });
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image || "",
      category: product.category,
      stock: product.stock,
      discount: product.discount,
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      stock: 0,
      discount: 0,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 relative">
      {toast.visible && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {toast.message}
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Product Management
      </h1>

      <div className="flex justify-start mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          + Add New Product
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={handleCancel}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="flex flex-col gap-3">
              {/* UPDATED IMAGE INPUT */}
              <input
                type="file"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    image: e.target.files[0],
                  })
                }
                className="border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />

              <input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />

              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />

              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />

              <input
                type="number"
                placeholder="Discount (%)"
                value={newProduct.discount}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, discount: e.target.value })
                }
                className="border px-3 py-2 rounded"
              />

              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="border px-3 py-2 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div className="flex gap-3 mt-3 justify-center">
                <button
                  onClick={editingProduct ? handleUpdate : handleAdd}
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                >
                  {editingProduct ? "Update" : "Submit"}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductManagement;