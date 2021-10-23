interface Props {
    register: Function,
    name: string;
    label: string;
    bold?: boolean;
    clickEvent?: Function;
}

export const Checkbox: React.FC<Props> = ({register, name, label, bold, clickEvent}) => {
    return (<>
    <input {...register(name)} type="checkbox" onClick={clickEvent} />
    <label className={`checkbox-label${bold ? " bold" : ""}`} htmlFor={name}>{label}</label>
    </>);
}