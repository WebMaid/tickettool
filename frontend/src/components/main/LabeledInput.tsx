import { FieldValues, UseFormRegister } from "react-hook-form";
import { TextInput } from "./TextInput";

interface Props {
    register: UseFormRegister<FieldValues>
    name: string;
    label: string;
    validation?: any;
    error?: any;
    required?: boolean;
    changeUseState?: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const LabeledInput: React.FC<Props> = ({register, name, label, validation, error, required, changeUseState, ...additional_params}) => {
    return (<>
        <label className={
            (required ? "required " : "") +
            (error ? "invalid" : "")
        } htmlFor={name}>{label}</label>
        <TextInput register={register} name={name} changeUseState={changeUseState} validation={validation} error={error} {...additional_params}/>
        {validation.required && error?.type == "required" && <span className="color-error input-error">This field is required</span>}
        {validation.minLength && error?.type == "minLength" && <span className="color-error input-error">This value is to short</span>}
        {validation.maxLength  && error?.type == "maxLength" && <span className="color-error input-error">This value is to long</span>}
        {validation.pattern  && error?.type == "pattern" && <span className="color-error input-error">This doesn't match the pattern `{validation.pattern.toString()}`</span>}
    </>);
}