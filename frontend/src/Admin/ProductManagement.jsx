import React, { useState, useEffect } from "react";
import api from "../utils/api";

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
    discount: 0,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState({ message: "", visible: false });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const prodRes = await api.get("products/?no_pagination=true");
      const productsData =
        prodRes.data.results ||
        (Array.isArray(prodRes.data) ? prodRes.data : []);
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
  // ADD PRODUCT
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
    formData.append("stock", Number(newProduct.stock));
    formData.append("discount", Number(newProduct.discount));
    formData.append("category", Number(newProduct.category));

    if (newProduct.image instanceof File) {
      formData.append("image", newProduct.image);
    } else if (typeof newProduct.image === 'string' && newProduct.image !== "") {
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
      console.error(err.response?.data);
      showToast("Failed to add product");
    }
  };

  // =========================
  // UPDATE PRODUCT
  // =========================
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", Number(newProduct.price));
    formData.append("stock", Number(newProduct.stock));
    formData.append("discount", Number(newProduct.discount));
    formData.append("category", Number(newProduct.category));

    if (newProduct.image instanceof File) {
      formData.append("image", newProduct.image);
    } else if (typeof newProduct.image === 'string' && newProduct.image !== "") {
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
      console.error(err.response?.data);
      showToast("Failed to update product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`products/${id}/`);
        fetchData();
        showToast("Product deleted successfully!");
      } catch (err) {
        console.error(err);
        showToast("Failed to delete product");
      }
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

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-widest border-b border-gray-100">
              <th className="px-6 py-4 font-semibold">Image</th>
              <th className="px-6 py-4 font-semibold">Product</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Stock</th>
              <th className="px-6 py-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-400 italic">
                  No products found. Start by adding your first masterpiece.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <img
                      src={product.image || "https://placehold.co/150?text=Loreez"}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded shadow-sm bg-stone-50"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/150?text=Missing";
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-[10px] text-gray-400 truncate max-w-[200px]">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {product.category_name}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ₹ {Number(product.price).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      product.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
              <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-1">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    image: e.target.files[0],
                  })
                }
                className="border px-3 py-2 rounded text-xs bg-stone-50"
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

              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="border px-3 py-2 rounded h-24 resize-none"
              />

              <div className="grid grid-cols-2 gap-3">
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
              </div>

              <div className="grid grid-cols-2 gap-3">
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
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={editingProduct ? handleUpdate : handleAdd}
                  className="flex-1 bg-purple-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition shadow-md"
                >
                   {editingProduct ? "Update Product" : "Create Product"}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition font-medium"
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