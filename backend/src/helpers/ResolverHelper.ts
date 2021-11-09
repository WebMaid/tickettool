import { ILike } from "typeorm";
import { Filter } from "../resolvers/filters";
import { FilterType } from "../resolvers/filters/types/FilterType";
import { SearchArgument } from "../resolvers/search";

const recursiveGernerationOfSearchWhereObject = (
  include: Object,
  path: String,
  available_relations: string[]
): string[] => {
  let list: string[] = [];
  Object.keys(include).forEach((i) => {
    if (include[i] == null) {
    } else if (typeof include[i] == "boolean" && include[i]) {
      list.push(`"${path}"."${i}"`);
    } else if (typeof include[i] == "object") {
      const child_available_relations = available_relations
        .filter((ar) => ar == i || ar.startsWith(`${i}.`))
        .map((ar) => {
          const arNew = ar.replace(`${i}`, "");
          return arNew.startsWith(".") ? arNew.substring(1) : arNew;
        });
      if (child_available_relations.length >= 1) {
        const childs = recursiveGernerationOfSearchWhereObject(
          include[i],
          `${path}__${i}`,
          child_available_relations
        );
        list = [...list, ...childs];
      }
    }
  });
  return list;
};

const generateSearchCheckProps = (
  search: SearchArgument,
  available_relations: string[],
  entity: string
): string[] => {
  return recursiveGernerationOfSearchWhereObject(
    search.include,
    entity,
    available_relations
  );
};

const recursiveGenerationOfFilterWhereObject = (
  nested_filter: Filter,
  path: String,
  available_relations: string[]
) => {
  let list: string[] = [];
  Object.keys(nested_filter).forEach((f) => {
    if (nested_filter[f] == null) {
    } else if (nested_filter[f] instanceof Filter) {
      const child_available_relations = available_relations
        .filter((ar) => ar == f || ar.startsWith(`${f}.`))
        .map((ar) => {
          const arNew = ar.replace(`${f}`, "");
          return arNew.startsWith(".") ? arNew.substring(1) : arNew;
        });
      if (child_available_relations.length >= 1) {
        const childs = recursiveGernerationOfSearchWhereObject(
          nested_filter[f],
          `${path}__${f}`,
          child_available_relations
        );
        list = [...list, ...childs];
      }
    } else if (Array.isArray(nested_filter[f])) {
      nested_filter[f].forEach((fil) => {
        switch (fil.comparasion) {
        }
      });
    }
  });
  return list;
};

const generateFilterCheckProps = (
  filter: Filter,
  entity: string,
  available_relations: string[]
): string[] => {
  if (!filter) return [];
  return recursiveGenerationOfFilterWhereObject(
    filter,
    entity,
    available_relations
  );
};

// "Entity__relationName__relationName"."propertyName"
export const generateWhereFromSearch_FiltersAndRelations = (
  search: SearchArgument,
  filter: Filter,
  available_relations: string[],
  entity: string
): string => {
  const where: string[] = [];

  entity =
    entity.substring(0, 1).toUpperCase() + entity.substring(1, entity.length);

  // define searchProps
  const searchCheckProps = generateSearchCheckProps(
    search,
    available_relations,
    entity
  );
  const searchWhereString = searchCheckProps
    .map((scp) => `${scp} ILIKE '%${search.value}%'`)
    .join(" OR ");
  if (searchWhereString.length >= 1) {
    where.push(searchWhereString);
  }

  // define filterProps
  const filterCheckProps = generateFilterCheckProps(
    filter,
    entity,
    available_relations
  );
  console.log(filterCheckProps);
  // const filterCheckProps = [];
  // const filterWhereString =

  return `(${where.join(") AND (")})`;
};
