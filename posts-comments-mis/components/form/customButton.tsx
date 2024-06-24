import React from "react";
import { Button } from "react-native-paper";

export type StaticRoutes = any;

interface CustomButtonProps {
  href?: StaticRoutes;
  buttonText: string;
  className?: string;
  onPress?: () => void;
  isLoading?: boolean;
}

export default function CustomButton({
  href,
  buttonText,
  className,
  onPress,
  isLoading
}: CustomButtonProps) {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={isLoading}
      style={{
        backgroundColor: "#F7951C",
        justifyContent: "center",
        height: 54,
      }}
    >
      {buttonText}
    </Button>
    // <TouchableOpacity
    //   onPress={() => router.push(href)}
    //   className={`flex m-auto items-center w-full rounded-xl bg-[#F7951C] py-5 font-bold mt-5 ${className}`}
    // >
    //   <Text className="text-white font-bold p-auto">{buttonText}</Text>
    // </TouchableOpacity>
  );
}
