import React, { useState } from 'react';
import { getUserId } from '../../../accessToken';
import { ApiKey, ServerError, useGetKeysOfUserQuery } from '../../../generated/graphql';
import { ICrypticoEncryptedKey } from '../../../helpers/cryptico/ICrypticoEncryptedKey';
import { Cryptico } from '../../../helpers/cryptico/Cryptico';
import { settings } from '../../../Settings';

interface Props {

}

// TODO: Change backend, that this gets responded!
interface GenerateApiKeyResponse {
    api_key: LocalApiKey,
    secret: ICrypticoEncryptedKey,
    error: ServerError | null
}

interface LocalApiScope {
    id: string;
    entity: string;
    type: string;
}

interface LocalApiKey {
    id: string;
    note: string;
    scopes: LocalApiScope[],
    expires?: Date,
    last_use?: Date
}

export const UserSettingsDeveloperPage: React.FC<Props> = () => {
    const {data, loading} = useGetKeysOfUserQuery({variables: {userId: getUserId()}});
    const db_keys: LocalApiKey[] = []
    const [apiKeys, setApiKeys] = useState(db_keys);

    if (data?.getKeysOfUser?.keys) {
        setApiKeys(data.getKeysOfUser.keys);
    }

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

    return (<div>
        UserSettingsDevelopperPage
        <button onClick={async e => {
            e.preventDefault();
            await createNewApiKey("Note to this key");
        }}>Create Key</button>
        <ul>
            {apiKeys.map((ak) =>
                <li className="api-key">{ak}</li>
            )}
        </ul>
    </div>)
}

