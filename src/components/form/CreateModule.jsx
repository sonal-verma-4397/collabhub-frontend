import { useRef, useState } from "react";

export function CreateModulePopup({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const modalRef = useRef();

  // Close when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onCancel();
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onCancel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newModule = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      pages: [],
      tasks: [],
    };

    onSubmit(newModule);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-[#1a1a1a] border border-gray-700 p-6 rounded-lg max-w-md w-full"
      >
        <h2 className="text-lg font-semibold mb-4">Create Module</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md outline-none"
              placeholder="Enter module name..."
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 bg-[#2a2a2a] border border-gray-600 rounded-md outline-none resize-none"
              placeholder="Describe the module"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 rounded-md text-sm hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 rounded-md text-sm hover:bg-green-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
