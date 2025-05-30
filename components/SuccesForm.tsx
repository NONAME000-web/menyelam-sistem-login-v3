import { CheckCircledIcon } from "@radix-ui/react-icons"

interface SuccessProp{
    message?: string
}

export const SuccessForm = ({message}: SuccessProp) => {
    return(
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
            <CheckCircledIcon className="h-4 w-4"/>
            <p>{message}</p>
        </div>
    )
}