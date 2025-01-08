import { Button } from "@nextui-org/button";
import { useEffect } from "react";

type InputButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  buttonKey?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  className?: string;
};

export function InputButton({
  color = "secondary",
  ...props
}: InputButtonProps) {
  const handleKeyUp = (event: KeyboardEvent) => {
    if (props.disabled) return;
    if (event.key == props.buttonKey) {
      props.onPress();
    }
  };

  useEffect(() => {
    if (!props.buttonKey) return;
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [props]);

  return (
    <Button
      className={`flex-1 py-1 ${props.className}`}
      color={color}
      isDisabled={props.disabled}
      onPress={props.onPress}
    >
      {props.children}
    </Button>
  );
}
