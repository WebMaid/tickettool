import { FieldValues, UseFormRegister } from "react-hook-form";

export interface SelectOption {
    value: string;
    label: string
}

interface Props {
    register: UseFormRegister<FieldValues>;
    name: string;
    options: SelectOption[];
    changeUseState: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const Select: React.FC<Props> = ({register, name, options, changeUseState, ...additional_params}) => {
    const [value, setValue] = changeUseState;


    return (<select className="form-control" {...register(name)} value={value} onChange={e => setValue(e.target.value)} {...additional_params}>
    {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
        ))}
    </select>);
}