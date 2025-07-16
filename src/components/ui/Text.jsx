import cn from "../../utils/cn";

export default function Text({
  className = [],
  children,
  html_tag = "span",
  ...props
}) {
  const Tag = html_tag;
  return (
    <Tag {...props} className={cn(...className)}>
      {children}
    </Tag>
  );
}
