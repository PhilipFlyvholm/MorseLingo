import clsx from "clsx";
import { useEffect } from "react";
import { ButtonProps } from "@nextui-org/button";

import Button from "./Button";

type InputButtonProps = ButtonProps & {
  onPress: () => void;
  buttonKey?: string;
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
      {...props}
      className={clsx("py-1", props.className)}
      color={color}
      isDisabled={props.disabled}
      onPress={props.onPress}
    >
      {props.children}
    </Button>
  );
}
