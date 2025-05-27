import { useContext } from "react";
import { toasterContext } from "../../context/Toaster";

export function Toast() {
  const { toasts } = useContext(toasterContext);
  return (
    <div style={{ position: "fixed", bottom: 10, right: 10 }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            marginBottom: "10px",
            padding: "10px 20px",
            borderRadius: "4px",
            backgroundColor: toast.type === "success" ? "#4caf50" : "#f44336",
            color: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
