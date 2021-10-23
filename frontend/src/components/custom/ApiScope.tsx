import { useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { ApiScope } from "../../generated/graphql";
import { ScopeCategory } from "../../objects/ScopeCategory";
import { IApiKeyCreateFormInputs } from "../../pages/user/settings/token/Create";
import { Checkbox } from "../main/Checkbox";

interface Props {
    register: Function;
    control: Control<IApiKeyCreateFormInputs, object>;
    index: number;
    category: ScopeCategory;
}

export const ApiScopeComponent: React.FC<Props> = ({register, control, index, category}) => {
    const [selectAll, setSelectAll] = useState(false);

    const changeSelectAll = () => {
        setSelectAll(!selectAll);
        /*const scopes = [...fields];
        scopes.forEach(s => {
            s.selected = selectAll
        });
        replace(scopes);*/
    };

    const { fields, update, replace } = useFieldArray({
        control: control,
        name: `categories.${index}.scopes`,
        keyName: "_id",
    });

    return (<div className="scope-category">
        <div className="scope">
            <div className="col-5">
                <Checkbox register={register} name={`categories.${index}.selected`}  label={category.name} bold={true} clickEvent={changeSelectAll} />
            </div>
            <span className="col-5">{category.description}</span>
        </div>
        <ul className="scopes">{fields.map((s, i) => (
            <li key={s._id}>
                <div className="scope">
                    <div className="col-5">
                        <Checkbox register={register} name={`categories.${index}.scopes.${i}.selected`} label={s.name} clickEvent={undefined} />
                    </div>
                    <span className="col-5">{s.description}</span>
                </div>
            </li>
        ))}</ul>
    </div>);
}