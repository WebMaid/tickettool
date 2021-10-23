import React from 'react';
import { useDeleteApiKeyMutation } from '../generated/graphql';
import { LocalApiKey } from '../pages/user/settings/token/Index';

interface Props {
    apiKey: LocalApiKey,
    deleteApiKey: Function
}

export const AccessKeyComponent: React.FC<Props> = ({ apiKey, deleteApiKey }) => {
    let expirationDateElement = (<span>
        <i className=""></i>
        <button className="link color-warning">This token has no expiration date.</button>
    </span>);
    if (apiKey.expires) {
        expirationDateElement = (<span>Expires at {apiKey.expires.toDateString()}</span>);
    }
    return (<div>
        <div className="flex flex-gap header">
            <span className="note col-6">
                <a className="link" href={`/user/settings/token/${apiKey.id}`}>{apiKey.note}</a>
                <span className="color-gray"> - </span>
                <ul className="inline">
                    {apiKey.scopes.map((s, i) =>
                        <li key={s.id} className="italic">
                            {`${(s.name)}${apiKey.scopes.length - 1 != i ? ", " : ""}`}
                        </li>
                    )}
                </ul>
            </span>
            <span className="lastUsed color-gray col-3">
                {generateLastUsedString(apiKey.last_use)}
            </span>
            <div className="center-verical col-1">
                <button className="btn btn-error" onClick={async () => await deleteApiKey(apiKey.id)}>Delete</button>
            </div>
        </div>
        <div className="body">
            <span className="regenerate"><i className=""></i><button className="link">Regenerate</button></span>
        </div>
        <div className="footer">
            {expirationDateElement}
        </div>
    </div>)
}

const generateLastUsedString = (date?: Date|null): string => {
    if (!date)
        return `Never used`;
    const now = new Date();
    const prefix = "Last used within the last ";
    const years = now.getFullYear() - date.getFullYear();
    const months = now.getMonth() - date.getMonth();
    const days = now.getDay() - date.getDay();
    let value = "couple hours";
    if (years >= 1)
        value = `${years} year${years === 1 ? "" : "s"}`;
    else if (months >= 1)
        value = `${months} month${months === 1 ? "" : "s"}`;
    else if (days >= 1)
        value = `${days} day${days === 1 ? "" : "s"}`;
    return `${prefix} ${value}`;
}