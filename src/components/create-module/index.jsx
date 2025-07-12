import { useRef, useState } from "react";
import useIndex from "./hooks/useIndex";

export function CreateModulePopup({ onSubmit, onCancel }) {
  const { formData, handleChange, handleSubmit, modalRef } = useIndex({
    onSubmit,
    onCancel,
  });

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
