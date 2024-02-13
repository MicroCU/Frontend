"use client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";

export enum ToastTypeEnum {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  INFO = "INFO"
}
export interface ToastProps {
  title?: string;
  message: string;
  type: ToastTypeEnum;
  buttonTitle: string;
}

export default function Toast({
  title,
  message,
  type,
  buttonTitle
}: ToastProps) {
  const { toast } = useToast();
  return (
    <Button
      onClick={() => {
        toast({
          variant:
            type === ToastTypeEnum.INFO
              ? "info"
              : type === ToastTypeEnum.SUCCESS
              ? "success"
              : "destructive",
          title: title ? title : "",
          description: message
        });
      }}
    >
      {buttonTitle}
    </Button>
  );
}
