import { Button as NextUIButton, ButtonProps } from "@nextui-org/button";
import clsx from "clsx";

export default function CustomButton({
  color = "secondary",
  children,
  style,
  ...props
}: ButtonProps) {
  const shadowColor = `hsl(var(--nextui-${color}-400) / var(--nextui-${color}-400-opacity, 1))`;

  return (
    <NextUIButton
      {...props}
      aria-label="button"
      className={clsx(
        props.className,
        "shadow-[0px_4px_0px]",
        "active:shadow-[0px_2px_0px]",
      )}
      color={color}
      style={
        {
          ...style,
          "--tw-shadow-color": shadowColor,
          "--tw-shadow": "var(--tw-shadow-colored)",
        } as React.CSSProperties
      }
    >
      {children}
    </NextUIButton>
  );
}
