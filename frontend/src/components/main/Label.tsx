import { FieldValues, UseFormRegister } from "react-hook-form";
import { TextInput } from "./TextInput";

interface Props {
    name: string;
    label: string;
    required?: boolean;
}

export const Label: React.FC<Props> = ({name, label, required}) => {
    return (<>
        <label 
        className={(required ? "required " : "")} 
        htmlFor={name}>
            {label}
        </label>
    </>);
}