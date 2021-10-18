import React, { useState } from 'react';
import { getUserId } from '../../../accessToken';
import { ServerError } from '../../../generated/graphql';
import { ICrypticoEncryptedKey } from '../../../helpers/cryptico/ICrypticoEncryptedKey';
import { Cryptico } from '../../../helpers/cryptico/Cryptico';
import { settings } from '../../../Settings';

interface Props {

}

interface GenerateApiKeyResponse {
    api_key: ICrypticoEncryptedKey,
    error: ServerError | null
}

export const UserSettingsDeveloperPage: React.FC<Props> = () => {
    const db_keys: string[] = []
    const [apiKeys, setApiKeys] = useState(db_keys);

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
                setApiKeys([...apiKeys, `${note}: ${keys.decrypt(response.api_key)}`]);
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

