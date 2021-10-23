import { FormEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateApiKeyFormComponent } from "../../../../components/forms/CreateApiKey";
import { useCreateApiKeyMutation } from "../../../../generated/graphql";
import { Cryptico } from "../../../../helpers/cryptico/Cryptico";
import { addDateStringToDate } from "../../../../helpers/DateHelper";
import { SelectOption } from "../../../../helpers/SelectOption";
import { getScopesInputOfScopeCategory, ScopeCategory } from "../../../../objects/ScopeCategory";

interface Props {

}

export interface IApiKeyCreateFormInputs {
    note: string;
    expires_in: string;
    categories: ScopeCategory[];
}

export const UserSettingTokenCreatePage: React.FC<Props> = () => {
    const [createKey] = useCreateApiKeyMutation();
    const [key, setKey] = useState('');
    const [scopeError, setScopeError] = useState('');

    const createApiKey: SubmitHandler<IApiKeyCreateFormInputs> = async data => {
        const keys = new Cryptico();
        if (keys.error) {
            // Display error
            return;
        }
        if (!data.categories.find(c => c.scopes.find(s => s.selected))) {
            setScopeError("A minimum of one scope must be selected!")
            return;
        }
        setScopeError('');

        try {
            let scopes = getScopesInputOfScopeCategory(data.categories);

            const createdKey = await createKey({variables: {
                publicKey: keys.public_key ?? "",
                note: data.note,
                expiresIn: data.expires_in,
                scopes: scopes
            }});
            setKey(keys.decrypt(createdKey.data?.createApiKey.secret))
        } catch (e) {
            console.log(e);
        }
    }

    return (<div>
        <h1>New personal access token</h1>
        <hr />
        <p>Personal access tokens are used to authenticate on the API.</p>
        <CreateApiKeyFormComponent submit={createApiKey} scopeError={scopeError} />
        <p>{key}</p>
    </div>)
}