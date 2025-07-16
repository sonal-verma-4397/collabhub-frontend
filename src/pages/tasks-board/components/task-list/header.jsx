import Text from "../../../../components/ui/Text";
import Menu from "../../../../components/utility/Menu";
import Circle from "./circle";

export default function Header({
  title = "dummy Title",
  id = 1,
  description = "dummy description",
  color = "red",
}) {
  return (
    <div>
      <h3 className="flex gap-2 items-center px-2">
        <Circle color={color} />
        <Text className={["flex-1", "font-semibold"]}>{title}</Text>
        <Menu />
      </h3>
      <Text html_tag="p" className={["text-sm", "text-gray-500", "px-2"]}>
        {description}
      </Text>
    </div>
  );
}
