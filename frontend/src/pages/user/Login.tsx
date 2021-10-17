import React, { useState } from 'react';
import { setAccessToken } from '../../accessToken';
import { CurrentUserDocument, CurrentUserQuery, useLoginMutation } from '../../generated/graphql';
import { encrypt_with_rsa_public_key } from '../../helpers/auth';
import {RouteComponentProps} from 'react-router-dom';

interface Props {

}

interface GenerateKeyResult {
        client_id: string;
        public_key: string;
        error: any;
}

export const UserLoginPage: React.FC<RouteComponentProps> = ({history}) => {
        const [mail, setMail] = useState('');
        const [password, setPassword] = useState('');
        const [login] = useLoginMutation();
        return (<form onSubmit={async e => {
                e.preventDefault();
                const client: GenerateKeyResult = (await (await fetch("http://localhost:3001/generate_key", { method: 'POST' })).json());
                if (client.error) {
                        console.log(client.error);
                        return;
                }
                const response = await login({
                    variables: {
                        clientId: client.client_id, 
                        mail: mail,
                        password: encrypt_with_rsa_public_key(password ?? "", client.public_key)
                    },
                    update: (store, {data}) => {
                        if (!data)
                            return null;
                        store.writeQuery<CurrentUserQuery>({
                            query: CurrentUserDocument,
                            data: {
                                currentUser: data.login.user
                            }
                        })
                        
                    }
                });
                if (response && response.data && response.data.login.accessToken) {
                    setAccessToken(response.data.login?.accessToken ?? "");
                    history.push("/");
                }
            }}>
                <div>
                    <input value={mail} placeholder="mail" onChange={e => {
                        setMail(e.target.value);
                    }}/>
                </div>
                <div>
                    <input value={password} type="password" placeholder="password" onChange={e => {
                        setPassword(e.target.value);
                    }}/>
                </div>
                <button type="submit">Login</button>
            </form>);
}