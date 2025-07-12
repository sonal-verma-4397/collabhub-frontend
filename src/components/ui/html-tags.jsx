import React from "react";
import cn from "../../utils/cn";

/** @type {React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>} */
export const Button = ({ className = [], children, ...props }) => (
  <button {...props} className={cn(...className, "cursor-pointer w-full")}>
    {children}
  </button>
);

/** @type {React.FC<React.NavHTMLAttributes<HTMLNavElement>>} */
export function Navigations({ className = [], children }) {
  return <nav className={cn(...className)}>{children}</nav>;
}

/** @type {React.FC<React.ImgHTMLAttributes<HTMLImageElement>>} */
export function Image({ className = [], children, ...props }) {
  return (
    <img {...props} className={cn(...className, "select-none")}>
      {children}
    </img>
  );
}

/** @type {React.FC<React.SectionHTMLAttributes<HTMLSectionElement>>} */
export function Section({ className = [], children, ...props }) {
  return (
    <section {...props} className={cn(...className)}>
      {children}
    </section>
  );
}

// Form Components

/** @type {React.FC<React.InputHTMLAttributes<HTMLInputElement>>} */
export const Input = ({ className = [], children, ...props }) => (
  <input
    {...props}
    className={cn(
      ...className,
      "w-full px-3 py-2 rounded-md bg-[#2a2a2a]",
      "border border-gray-600",
      "outline-none"
    )}
  >
    {children}
  </input>
);

/** @type {React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>>} */
export function Textarea({ className = [], children, ...props }) {
  return (
    <textarea {...props} className={cn(...className)}>
      {children}
    </textarea>
  );
}

/** @type {React.FC<React.LabelHTMLAttributes<HTMLLabelElement>>} */
export function Label({ className = [], children, ...props }) {
  return (
    <label {...props} className={cn(...className)}>
      {children}
    </label>
  );
}

/** @type {React.FC<React.SelectHTMLAttributes<HTMLSelectElement>>} */
export function Select({ className = [], children, ...props }) {
  return (
    <select {...props} className={cn(...className)}>
      {children}
    </select>
  );
}

/** @type {React.FC<React.OptionHTMLAttributes<HTMLOptionElement>>} */
export function Option({ className = [], children, ...props }) {
  return (
    <option {...props} className={cn(...className)}>
      {children}
    </option>
  );
}

/** @type {React.FC<React.OptgroupHTMLAttributes<HTMLOptGroupElement>>} */
export function OptionGroup({ className = [], children, ...props }) {
  return (
    <optgroup {...props} className={cn(...className)}>
      {children}
    </optgroup>
  );
}
