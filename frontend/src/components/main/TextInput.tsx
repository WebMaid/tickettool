import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
    register: UseFormRegister<FieldValues>;
    name: string;
    validation?: any;
    changeUseState?: [string, React.Dispatch<React.SetStateAction<string>>];
    error?: any;
}

export const TextInput: React.FC<Props> = ({register, name, validation, error, changeUseState, ...additional_params}) => {
    if (changeUseState) {
        const [value, setValue] = changeUseState;
        return (
            <input className={`form-control${error ? " invalid" : ""}`} type="text" {...register(name, validation)} value={value} onChange={e => setValue(e.target.value)} {...additional_params} />
        );
    }
    return (
        <input className={`form-control${error ? " invalid" : ""}`} type="text" {...register(name, validation)} {...additional_params} />
    );

    
}