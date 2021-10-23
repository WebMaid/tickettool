import React,{ useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useGetAllScopeCategoriesQuery } from "../../generated/graphql";
import { addDateStringToDate } from "../../helpers/DateHelper";
import { generateScopeCategoryFromApiResponse, ScopeCategory } from "../../objects/ScopeCategory";
import { IApiKeyCreateFormInputs } from "../../pages/user/settings/token/Create";
import { ApiScopeComponent } from "../custom/ApiScope";
import { Label } from "../main/Label";
import { LabeledInput } from "../main/LabeledInput";
import { LabeledSelect } from "../main/LabeledSelect";

interface Props {
    submit: SubmitHandler<IApiKeyCreateFormInputs>;
    scopeError: string;
}

export const CreateApiKeyFormComponent: React.FC<Props> = ({submit, scopeError}) => {
    const [expires_in, setExpiresIn] = useState("30d");

    const {data, loading} = useGetAllScopeCategoriesQuery();

    const categories = generateScopeCategoryFromApiResponse(
        data?.getAllScopeCategories.categories ?? []
    );

    const { register, handleSubmit, control, formState: { errors } } = useForm<IApiKeyCreateFormInputs>({
        defaultValues: {
            categories: categories ?? []
        }
    });
    const { fields, update, replace } = useFieldArray({
        control: control,
        name: "categories",
        keyName: "_id",
    });

    useEffect(() => {
        replace(categories ?? []);
    }, [data])

    if (loading) {
        return (<span>Loading...</span>)
    }
    
    //handleSubmit(submit)
    return (<form onSubmit={handleSubmit(submit)}>
    <div>
        <LabeledInput register={register} name="note" label="Note" validation={{required: true, maxLength: 64, pattern: /^[A-Za-z]+$/ }} error={errors.note} />
    </div>
    <LabeledSelect register={register} name="expires_in" label="Expiration" options={[
        {value: "1d", label: "1 Day"},
        {value: "7d", label: "7 Day"},
        {value: "30d", label: "30 Day"},
        {value: "0", label: "Never"}
    ]} changeUseState={[expires_in, setExpiresIn]} />
    <span>{
        expires_in !== "0"  ?
        `The token will expire on ${addDateStringToDate(expires_in, new Date()).toDateString()}` :
        `The token will never expire!`
    }</span>
    {expires_in === "0" && <div>
        <span>Webmaid strongly recommends that you set an expiration date for your token to help keep your information secure. <a className="link">Learn more</a></span>
    </div>}

    <Label name="scopes" label="Select scopes" />
    <span>Scopes define the access for personal tokens. <a href="" className="link">Read more about OAuth scopes.</a></span>
    <span className="color-error">{scopeError}</span>
    <div className="scope-categories">
        {fields.map((s, i) => (
            <div key={s._id}>
                <ApiScopeComponent register={register} control={control} index={i} category={s} />
            </div>
        ))}
    </div>
    <input type="submit"></input>
</form>)
}