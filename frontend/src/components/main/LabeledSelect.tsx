import { FieldValues, UseFormRegister } from "react-hook-form";
import { Select, SelectOption } from "./Select";

interface Props {
    register: UseFormRegister<FieldValues>
    name: string;
    label: string;
    options: SelectOption[];
    changeUseState: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const LabeledSelect: React.FC<Props> = ({register, name, label, options, changeUseState, ...additional_params}) => {


    return (<>
        <label className="required" htmlFor={name}>{label}</label>
        <Select register={register} name={name} options={options} changeUseState={changeUseState} {...additional_params}/>
    </>);
}