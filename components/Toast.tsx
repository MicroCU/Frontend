"use client"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "./ui/button"

export enum ToastTypeEnum {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
    INFO = "INFO",
}
export interface IToastProps {
    title?: string
    message: string
    type: ToastTypeEnum
    className?: string
}

export default function Toast({ title, message, type, className }: IToastProps) {
    const { toast } = useToast()
    return (
        <Button
            onClick={() => {
                toast({
                    variant: type === ToastTypeEnum.INFO ? 'info' : type === ToastTypeEnum.SUCCESS ? 'success' : 'destructive' ,
                    title: title ? title : "",
                    description: message,
                })
            }}
        >
            Show Toast
        </Button>
        // <div className={`${className} ${type === ToastTypeEnum.INFO ? 'bg-white' : type === ToastTypeEnum.SUCCESS ? 'bg-success' : 'bg-danger'} 
        //     p-4 rounded-md ${type === ToastTypeEnum.INFO ? 'text-black' :'text-white'} shadow-lg`}>
        //         { type === ToastTypeEnum.ERROR && <p className="Bold16"> {title} </p> }
        //         <p className="Reg12"> {message} </p>
        // </div>
    )
}