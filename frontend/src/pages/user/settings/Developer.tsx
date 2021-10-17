import React, { useState } from 'react';
import { getUserId } from '../../../accessToken';
import { ServerError } from '../../../generated/graphql';
import { generateRsaKeys } from '../../../helpers/auth';
const cryptico = require('cryptico-js');

interface Props {

}

interface EncryptedKeyProps {
    status: string,
    cipher: string
}

interface DecryptedKeyProps {
    status: string,
    plaintext: string,
    signature: string
}

interface GenerateApiKeyResponse {
    api_key: EncryptedKeyProps,
    error: ServerError | null
}

export const UserSettingsDeveloperPage: React.FC<Props> = () => {
    const db_keys: string[] = []
    const [apiKeys, setApiKeys] = useState(db_keys);

    const createNewApiKey = async (): Promise<void> => {
        const keys = generateRsaKeys();
        if (!keys.private_key || !keys.public_key) {
            return;
        }
        try {
            const encrypted_key: GenerateApiKeyResponse = await (await fetch('http://localhost:3001/generate_api_key', {
                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    user: getUserId(),
                    public_key: keys.public_key
                })
            })).json();
            const key: DecryptedKeyProps = cryptico.decrypt(encrypted_key.api_key.cipher, keys.private_key);
            setApiKeys([...apiKeys, key.plaintext]);
        } catch (err) {
            console.log(err);
        }
    }

    return (<div>
        UserSettingsDevelopperPage
        <button onClick={async e => {
            e.preventDefault();
            await createNewApiKey();
        }}>Create Key</button>
        <ul>
            {apiKeys.map((ak) =>
                <li>{ak}</li>
            )}
        </ul>
    </div>)
}

