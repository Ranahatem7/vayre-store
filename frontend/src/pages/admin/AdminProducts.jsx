import { useState, useEffect } from "react";
import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const CATEGORIES = ["men", "women", "unisex"];
const SUBCATEGORIES = [
  "t-shirts",
  "hoodies",
  "shirts",
  "pants",
  "jackets",
  "accessories",
];

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  price: "",
  category: CATEGORIES[0],
  subcategory: SUBCATEGORIES[0],
  imagesText: "",
  isFeatured: false,
  isActive: true,
  variants: [],
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [formOpen, setFormOpen] = useState(false);
  const [formError, setFormError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAdminProducts();
        setProducts(data);
      } catch (err) {
        setError("Could not load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setFormError(null);
    setFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory,
      imagesText: product.images.join(", "),
      isFeatured: product.isFeatured,
      isActive: product.isActive,
      // Each row is edited by its position in this array — see the
      // variant handlers below for why index is used instead of an id.
      variants: product.variants.map((v) => ({ ...v })),
    });
    setFormError(null);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Variants are plain objects with no id of their own (the backend
  // stores them as `{ _id: false }` subdocuments), so the only thing
  // that identifies a row on this screen is its position in the array.
  // Every handler below therefore addresses a row by index, and the
  // table renders with `key={index}` to match — that's normally a React
  // anti-pattern because reordering would scramble which DOM node holds
  // which input, but there's no reordering here, only append/remove at
  // the end, so the index stays a stable, correct identity for each row.
  const addVariantRow = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { size: SIZES[0], color: "", stock: 0 }],
    }));
  };

  const updateVariantField = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const removeVariantRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (formData.variants.length === 0) {
      setFormError("Add at least one size/color variant.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        subcategory: formData.subcategory,
        images: formData.imagesText
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean),
        isFeatured: formData.isFeatured,
        isActive: formData.isActive,
        variants: formData.variants.map((v) => ({
          size: v.size,
          color: v.color,
          stock: Number(v.stock),
        })),
      };

      if (editingId) {
        const updated = await updateProduct(editingId, payload);
        setProducts((prev) =>
          prev.map((p) => (p._id === editingId ? updated : p))
        );
      } else {
        const created = await createProduct(payload);
        setProducts((prev) => [created, ...prev]);
      }

      closeForm();
    } catch (err) {
      setFormError(err.response?.data?.message || "Could not save product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Deactivate "${product.name}"?`)) return;

    try {
      await deleteProduct(product._id);
      setProducts((prev) =>
        prev.map((p) => (p._id === product._id ? { ...p, isActive: false } : p))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete product.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Products</h1>

      {!formOpen && (
        <button onClick={openCreateForm}>+ New product</button>
      )}

      {formOpen && (
        <form onSubmit={handleSubmit}>
          <h3>{editingId ? "Edit product" : "New product"}</h3>

          {formError && <p>{formError}</p>}

          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="slug">Slug</label>
            <input
              id="slug"
              type="text"
              value={formData.slug}
              onChange={(e) => handleFieldChange("slug", e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                handleFieldChange("description", e.target.value)
              }
              required
            />
          </div>

          <div>
            <label htmlFor="price">Price (EGP)</label>
            <input
              id="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => handleFieldChange("price", e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleFieldChange("category", e.target.value)}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="subcategory">Subcategory</label>
            <select
              id="subcategory"
              value={formData.subcategory}
              onChange={(e) =>
                handleFieldChange("subcategory", e.target.value)
              }
            >
              {SUBCATEGORIES.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="images">Image URLs (comma-separated)</label>
            <input
              id="images"
              type="text"
              value={formData.imagesText}
              onChange={(e) =>
                handleFieldChange("imagesText", e.target.value)
              }
            />
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) =>
                  handleFieldChange("isFeatured", e.target.checked)
                }
              />
              Featured
            </label>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  handleFieldChange("isActive", e.target.checked)
                }
              />
              Active
            </label>
          </div>

          <h4>Variants</h4>
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Color</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {formData.variants.map((variant, index) => (
                <tr key={index}>
                  <td>
                    <select
                      value={variant.size}
                      onChange={(e) =>
                        updateVariantField(index, "size", e.target.value)
                      }
                    >
                      {SIZES.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) =>
                        updateVariantField(index, "color", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={variant.stock}
                      onChange={(e) =>
                        updateVariantField(index, "stock", e.target.value)
                      }
                      required
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => removeVariantRow(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={addVariantRow}>
            + Add variant
          </button>

          <div>
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save product"}
            </button>
            <button type="button" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Variants</th>
            <th>Active</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                {product.category} / {product.subcategory}
              </td>
              <td>{product.price} EGP</td>
              <td>{product.variants.length}</td>
              <td>{product.isActive ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => openEditForm(product)}>Edit</button>
                <button onClick={() => handleDelete(product)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
