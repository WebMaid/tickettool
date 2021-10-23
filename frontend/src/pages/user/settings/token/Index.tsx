import React, { useEffect, useState } from 'react';
import { getUserId } from '../../../../accessToken';
import { ApiKey, DeleteApiKeyMutation, DeleteKeyResponse, ServerError, useDeleteApiKeyMutation, useGetKeysOfUserQuery } from '../../../../generated/graphql';
import { ICrypticoEncryptedKey } from '../../../../helpers/cryptico/ICrypticoEncryptedKey';
import { Cryptico } from '../../../../helpers/cryptico/Cryptico';
import { settings } from '../../../../Settings';
import { AccessKeyComponent } from '../../../../components/AccessKey';

interface Props {

}

interface GenerateApiKeyResponse {
    api_key: LocalApiKey,
    secret: ICrypticoEncryptedKey,
    error: ServerError | null
}

interface LocalApiScope {
    id: string;
    name: string;
}

export interface LocalApiKey {
    id: string;
    note: string;
    scopes: LocalApiScope[],
    expires: Date|null,
    last_use: Date|null
}

export const UserSettingTokenIndexPage: React.FC<Props> = () => {
    const {data, loading} = useGetKeysOfUserQuery({variables: {userId: getUserId()}});
    const [deleteApiKeyFromDb] = useDeleteApiKeyMutation();
    const db_keys: LocalApiKey[] = []
    const [apiKeys, setApiKeys] = useState(db_keys);


    useEffect(() => {
        if (data?.getKeysOfUser?.keys) {
            let localKeys: LocalApiKey[] = [];
            data.getKeysOfUser.keys.forEach(k => {
                let localScopes: LocalApiScope[] = [];
                k.scopes?.forEach(s => {
                    localScopes.push({
                        id: s.id,
                        name: s.name
                    })
                })
                localKeys.push({
                    id: k.id,
                    note: k.note,
                    scopes: localScopes,
                    expires: k.expires != null ? new Date(k.expires) : null,
                    last_use: k.last_use != null ? new Date(k.last_use) : null
                })
            })
            setApiKeys(localKeys);
        }
    }, [data]);

    const createNewApiKey = async (note: string): Promise<void> => {
        const keys = new Cryptico();
        if (keys.error) {
            return;
        }
        try {
            const response: GenerateApiKeyResponse = await (await fetch(settings.backend.generate_api_key.url, {
                method: settings.backend.generate_api_key.method,
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    user: getUserId(),
                    public_key: keys.public_key,
                    note: note
                })
            })).json();
            if (!response.error) {
                // `${note}: ${keys.decrypt(response.api_key)}`
                setApiKeys([...apiKeys, response.api_key]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteApiKey = async (id: string) => {
        const response = await deleteApiKeyFromDb({
            variables:  {
                deleteApiKeyId: id
            }
        });
        console.log(response);
        if (response.data?.deleteApiKey.error) {
            // Show error
            return;
        }
        const copy = [...apiKeys];
        const index = copy.findIndex(ak => ak.id == id);
        copy.splice(index, 1);
        setApiKeys(copy);        
    }

    return (<div className="user-settings-developer">
        UserSettingsDevelopperPage
        <button onClick={async e => {
            e.preventDefault();
            await createNewApiKey("Note to this key");
        }}>Create Key</button>
        <ul className="api-key-list">
            {apiKeys.map((ak) =>
                <li key={ak.id} className="api-key">
                    <AccessKeyComponent apiKey={ak} deleteApiKey={deleteApiKey} />
                </li>
            )}
        </ul>
    </div>)
}