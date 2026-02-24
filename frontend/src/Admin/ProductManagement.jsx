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
      const productsData = prodRes.data.results || (Array.isArray(prodRes.data) ? prodRes.data : []);
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

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
        showToast("Please fill Name, Price and Category");
        return;
    }
    api
      .post("products/", {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        discount: Number(newProduct.discount),
      })
      .then(() => {
        setNewProduct({ name: "", description: "", price: "", image: "", category: "", stock: 0, discount: 0 });
        fetchData();
        showToast("Product added successfully!");
        setIsModalOpen(false);
      })
      .catch(err => {
          console.error(err);
          showToast(err.response?.data?.detail || "Failed to add product");
      });
  };

  const handleUpdate = () => {
    api
      .patch(`products/${editingProduct.id}/`, {
        name: newProduct.name,
        description: newProduct.description,
        price: Number(newProduct.price),
        image: newProduct.image,
        category: newProduct.category,
        stock: Number(newProduct.stock),
        discount: Number(newProduct.discount)
      })
      .then(() => {
        setEditingProduct(null);
        setNewProduct({ name: "", description: "", price: "", image: "", category: "", stock: 0, discount: 0 });
        fetchData();
        showToast("Product updated successfully!");
        setIsModalOpen(false);
      })
      .catch(err => {
          console.error(err);
          showToast("Failed to update product");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      api.delete(`products/${id}/`).then(() => {
        fetchData();
        showToast("Product deleted successfully!");
      }).catch(err => {
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
      discount: product.discount
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setNewProduct({ name: "", description: "", price: "", image: "", category: "", stock: 0, discount: 0 });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 relative">
      {/* Toast */}
      {toast.visible && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {toast.message}
        </div>
      )}

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Product Management
      </h1>

      {/* Add Button on the left */}
      <div className="flex justify-start mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          + Add New Product
        </button>
      </div>

      {/* Modal */}
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
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                placeholder="Discount (%)"
                value={newProduct.discount}
                onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                className="border px-3 py-2 rounded"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="border px-3 py-2 rounded"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
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

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Existing Products</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead className="bg-purple-50">
            <tr>
              <th className="py-3 px-4 border-b text-purple-700 font-semibold">Name</th>
              <th className="py-3 px-4 border-b text-purple-700 font-semibold text-center">Category</th>
              <th className="py-3 px-4 border-b text-purple-700 font-semibold text-center">Price</th>
              <th className="py-3 px-4 border-b text-purple-700 font-semibold text-center">Stock</th>
              <th className="py-3 px-4 border-b text-purple-700 font-semibold text-center">Image</th>
              <th className="py-3 px-4 border-b text-purple-700 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-purple-50 transition-colors">
                <td className="py-3 px-4 text-gray-700 font-medium">{p.name}</td>
                <td className="py-3 px-4 text-center text-gray-600">{p.category_name}</td>
                <td className="py-3 px-4 text-center text-gray-900 font-semibold">₹{Number(p.price).toLocaleString()}</td>
                <td className="py-3 px-4 text-center text-gray-600">{p.stock}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-center">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover shadow-sm border" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-[10px]">No Img</div>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
