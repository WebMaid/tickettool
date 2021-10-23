import { ApiScope, ApiScopeCategory, ApiScopeInput } from "../generated/graphql";
import { Scope } from "./Scope";

interface CategorySelected {
    id: string;
    _id?: string;
    count: number;
    selected: number;
}

export interface ScopeCategory {
    id: string;
    _id?: string;
    name: string;
    description: string;
    selected: boolean;
    scopes: Scope[];
}

export const generateScopeCategoryFromApiResponse = (categories: ApiScopeCategory[], values?: ApiScope[]) => {
    let scopeCategories: ScopeCategory[] = [];
    if (!categories || categories.length == 0)
        return scopeCategories;

    categories.forEach(c => {
        let scopes: Scope[] = [];
        c.scopes.forEach(s => {
            scopes.push({
                id: s.id,
                name: s.name,
                description: s.description,
                selected: false
            });
        });
        scopeCategories.push({
            id: c.id,
            name: c.name,
            description: c.description,
            selected: false,
            scopes: scopes
        });
    });
    if (!values || values.length == 0)
        return scopeCategories;
    
    let categorySelectedHelper: CategorySelected[];
    
    categories.forEach(c => {
        categorySelectedHelper.push({
            id: c.id,
            count: c.scopes.length,
            selected: 0
        })
    })
    
    values.forEach(v => {
        const cIndex = scopeCategories.findIndex(sc => sc.id == v.category_id);
        const sIndex = scopeCategories[cIndex].scopes.findIndex(s => s.id == v.id);
        scopeCategories[cIndex].scopes[sIndex].selected = true;
        const scIndex = categorySelectedHelper.findIndex(csh => csh.id == v.category_id);
        categorySelectedHelper[scIndex].selected += 1;
        const helper = categorySelectedHelper[scIndex];
        if (helper.count == helper.selected)
            scopeCategories[cIndex].selected = true;
    });
}
export const getScopesInputOfScopeCategory = (categories: ScopeCategory[]): ApiScopeInput[] => {
    let scopes: ApiScopeInput[] = [];
    categories.forEach(c => {
        c.scopes.forEach(s => {
            if (s.selected) {
                scopes.push({
                    id: s.id 
                });
            }
        });
    });
    return scopes;
}