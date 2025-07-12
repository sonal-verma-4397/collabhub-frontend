import { useRef, useState } from "react";
import { createAndValidate } from "../../../entities/utils/createAndValidate";
import { ModuleSchema } from "../../../entities/schema/module.schema";

export default function useIndex({ onSubmit, onCancel }) {
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

    const newModule = createAndValidate(ModuleSchema, (newModule) => {
      newModule.name = formData.name.trim();
      newModule.description = formData.description.trim();
      return newModule;
    });

    onSubmit(newModule);
  };
  return { formData, handleChange, handleSubmit, modalRef };
}
