import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ApiKey = {
  __typename?: 'ApiKey';
  created_at: Scalars['DateTime'];
  expires?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  key: Scalars['String'];
  last_use?: Maybe<Scalars['DateTime']>;
  note: Scalars['String'];
  owner?: Maybe<User>;
  owner_id: Scalars['ID'];
  scopes?: Maybe<Array<ApiScope>>;
  updated_at: Scalars['DateTime'];
};

export type ApiScope = {
  __typename?: 'ApiScope';
  category?: Maybe<ApiScopeCategory>;
  category_id?: Maybe<Scalars['ID']>;
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ApiScopeCategory = {
  __typename?: 'ApiScopeCategory';
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  scopes: Array<ApiScope>;
};

export type ApiScopeInput = {
  id: Scalars['ID'];
};

export type BooleanFilter = {
  comparasion: Scalars['String'];
  value: Scalars['Boolean'];
};

export type CreateKeyResponse = {
  __typename?: 'CreateKeyResponse';
  api_key?: Maybe<ApiKey>;
  error?: Maybe<ServerError>;
  secret?: Maybe<CrypticoEncryptedKey>;
  validation_errors?: Maybe<Array<ValidationError>>;
};

export type CrypticoEncryptedKey = {
  __typename?: 'CrypticoEncryptedKey';
  cipher: Scalars['String'];
  status: Scalars['String'];
};

export type DateBeween = {
  max?: Maybe<Scalars['String']>;
  min?: Maybe<Scalars['String']>;
};

export type DateFilter = {
  between: DateBeween;
  comparasion: Scalars['String'];
  value: Scalars['String'];
};

export type DeleteKeyResponse = {
  __typename?: 'DeleteKeyResponse';
  error?: Maybe<ServerError>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Department = {
  __typename?: 'Department';
  history_responsibilities: Array<TicketHistory>;
  id: Scalars['String'];
  issued: Array<Ticket>;
  name: Scalars['String'];
  previous_ticket_responsibilities: Array<Ticket>;
  roles: Array<Role>;
  template_responsibilities: Array<TicketTemplate>;
  ticket_responsibilities: Array<Ticket>;
  users: Array<User>;
};

export type DepartmentFilter = {
  history_responsibilities?: Maybe<TicketHistoryFilter>;
  id?: Maybe<Array<IdFilter>>;
  issued?: Maybe<TicketFilter>;
  name?: Maybe<Array<StringFilter>>;
  previous_ticket_responsibilities?: Maybe<TicketFilter>;
  roles?: Maybe<RoleFilter>;
  template_responsibilities?: Maybe<TicketTemplateFilter>;
  ticket_responsiblities?: Maybe<TicketFilter>;
  users?: Maybe<UserFilter>;
};

export type DepartmentInclude = {
  history_responsiblities?: Maybe<TicketHistoryInclude>;
  id?: Maybe<Scalars['Boolean']>;
  issued?: Maybe<TicketInclude>;
  name?: Maybe<Scalars['Boolean']>;
  previous_ticket_responsibilities?: Maybe<TicketInclude>;
  roles?: Maybe<RoleInclude>;
  template_responsibilities?: Maybe<TicketTemplateInclude>;
  ticket_responsibilities?: Maybe<TicketInclude>;
  users?: Maybe<UserInclude>;
};

export type EnumArrayFilter = {
  comparasion: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type EnumFilter = {
  comparasion: Scalars['String'];
  value: Scalars['String'];
};

export type GetCategoriesResponse = {
  __typename?: 'GetCategoriesResponse';
  categories?: Maybe<Array<ApiScopeCategory>>;
  error?: Maybe<ServerError>;
};

export type GetKeysResponse = {
  __typename?: 'GetKeysResponse';
  errors?: Maybe<Array<ServerError>>;
  keys?: Maybe<Array<ApiKey>>;
  validation_errors?: Maybe<Array<ValidationError>>;
};

export type IdFilter = {
  value: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<ServerError>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createApiKey: CreateKeyResponse;
  createTicket: TicketCreateResponse;
  deleteApiKey: DeleteKeyResponse;
  findTickets: TicketQueryAllResponse;
  login: LoginResponse;
};


export type MutationCreateApiKeyArgs = {
  expires_in: Scalars['String'];
  note: Scalars['String'];
  public_key: Scalars['String'];
  scopes: Array<ApiScopeInput>;
};


export type MutationCreateTicketArgs = {
  description: Scalars['String'];
  group_id?: Maybe<Scalars['String']>;
  issuer?: Maybe<Scalars['String']>;
  issuer_department: Scalars['String'];
  service: Scalars['String'];
  short_description: Scalars['String'];
  type: Scalars['String'];
};


export type MutationDeleteApiKeyArgs = {
  id: Scalars['String'];
};


export type MutationFindTicketsArgs = {
  count?: Maybe<Scalars['Float']>;
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  search?: Maybe<TicketSearchArgument>;
};


export type MutationLoginArgs = {
  client_id: Scalars['String'];
  mail: Scalars['String'];
  password: Scalars['String'];
};

export type NullableDateFilter = {
  between: DateBeween;
  comparasion: Scalars['String'];
  value: Scalars['String'];
};

export type NullableEnumFilter = {
  comparasion: Scalars['String'];
  value: Scalars['String'];
};

export type NullableStringFilter = {
  comparasion: Scalars['String'];
  value: Scalars['String'];
};

export type Order = {
  direction: Scalars['String'];
  position: Scalars['Int'];
};

export type Permission = {
  __typename?: 'Permission';
  id: Scalars['String'];
  name: Scalars['String'];
  roles: Array<Role>;
  users: Array<User>;
};

export type PermissionFilter = {
  id?: Maybe<Array<IdFilter>>;
  name?: Maybe<Array<StringFilter>>;
  roles?: Maybe<RoleFilter>;
  users?: Maybe<UserFilter>;
};

export type PermissionInclude = {
  id?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['Boolean']>;
  roles?: Maybe<RoleInclude>;
  users?: Maybe<UserInclude>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  getAllScopeCategories: GetCategoriesResponse;
  getKeysOfUser: GetKeysResponse;
  hi: Scalars['String'];
  searchService?: Maybe<Array<Service>>;
  searchUser?: Maybe<Array<User>>;
};


export type QueryGetKeysOfUserArgs = {
  user_id: Scalars['String'];
};


export type QuerySearchServiceArgs = {
  name: Scalars['String'];
};


export type QuerySearchUserArgs = {
  department?: Maybe<Scalars['String']>;
  search: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  departments: Array<Department>;
  id: Scalars['String'];
  name: Scalars['String'];
  permissions: Array<Permission>;
  users: Array<User>;
};

export type RoleFilter = {
  departments?: Maybe<DepartmentFilter>;
  id?: Maybe<Array<IdFilter>>;
  name?: Maybe<Array<StringFilter>>;
  permissions?: Maybe<PermissionFilter>;
  users?: Maybe<UserFilter>;
};

export type RoleInclude = {
  departments?: Maybe<DepartmentInclude>;
  id?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['Boolean']>;
  permissions?: Maybe<PermissionInclude>;
  user?: Maybe<UserInclude>;
};

export type ServerError = {
  __typename?: 'ServerError';
  message: Scalars['String'];
  name: Scalars['String'];
};

export type Service = {
  __typename?: 'Service';
  histories: Array<ServiceHistory>;
  id: Scalars['ID'];
  name: Scalars['String'];
  service_id: Scalars['String'];
  tickets: Array<Ticket>;
};

export type ServiceFilter = {
  histories?: Maybe<ServiceHistoryFilter>;
  id?: Maybe<Array<IdFilter>>;
  name?: Maybe<Array<StringFilter>>;
  service_id?: Maybe<Array<StringFilter>>;
  tickets?: Maybe<TicketFilter>;
};

export type ServiceHistory = {
  __typename?: 'ServiceHistory';
  action: ServiceHistoryAction;
  action_id: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  responsible_user: User;
  responsible_user_id: Scalars['String'];
  service: Service;
  service_id: Scalars['String'];
};

export type ServiceHistoryAction = {
  __typename?: 'ServiceHistoryAction';
  histories: Array<ServiceHistory>;
  id: Scalars['ID'];
  type: Scalars['String'];
  value1: Scalars['String'];
  value2: Scalars['String'];
  value3: Scalars['String'];
};

export type ServiceHistoryActionFilter = {
  histories?: Maybe<ServiceHistoryFilter>;
  id?: Maybe<Array<IdFilter>>;
  type?: Maybe<Array<EnumFilter>>;
  value1?: Maybe<Array<NullableStringFilter>>;
  value2?: Maybe<Array<NullableStringFilter>>;
  value3?: Maybe<Array<NullableStringFilter>>;
};

export type ServiceHistoryActionInclude = {
  histories?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['Boolean']>;
  value1?: Maybe<Scalars['Boolean']>;
  value2?: Maybe<Scalars['Boolean']>;
  value3?: Maybe<Scalars['Boolean']>;
};

export type ServiceHistoryFilter = {
  action?: Maybe<ServiceHistoryActionFilter>;
  created_at?: Maybe<Array<DateFilter>>;
  id?: Maybe<Array<IdFilter>>;
  responsible_user?: Maybe<UserFilter>;
  service?: Maybe<ServiceFilter>;
};

export type ServiceHistoryInclude = {
  action?: Maybe<ServiceHistoryActionInclude>;
  action_id?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Boolean']>;
  responsible_user?: Maybe<UserInclude>;
  responsible_user_id?: Maybe<Scalars['Boolean']>;
  service?: Maybe<ServiceInclude>;
  service_id?: Maybe<Scalars['Boolean']>;
};

export type ServiceInclude = {
  histories?: Maybe<ServiceHistoryInclude>;
  id?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['Boolean']>;
  service_id?: Maybe<Scalars['Boolean']>;
  tickets?: Maybe<TicketInclude>;
};

export type ServiceOrder = {
  histories?: Maybe<TicketOrder>;
  id?: Maybe<Order>;
  name?: Maybe<Order>;
  service_id?: Maybe<Order>;
};

export type StringFilter = {
  comparasion: Scalars['String'];
  value: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  ticketCreated?: Maybe<Ticket>;
  ticketUpdated: Ticket;
};


export type SubscriptionTicketUpdatedArgs = {
  id: Scalars['String'];
};

export type Ticket = {
  __typename?: 'Ticket';
  closed_at?: Maybe<Scalars['DateTime']>;
  created_at: Scalars['DateTime'];
  description: Scalars['String'];
  group?: Maybe<TicketGroup>;
  group_id?: Maybe<Scalars['ID']>;
  histories: Array<TicketHistory>;
  id: Scalars['ID'];
  issuer?: Maybe<User>;
  issuer_department: Department;
  issuer_department_id: Scalars['ID'];
  issuer_id: Scalars['ID'];
  owner_group?: Maybe<TicketGroup>;
  owner_group_id: Scalars['String'];
  previous_responsible_department: Department;
  previous_responsible_department_id: Scalars['ID'];
  responsible_department: Department;
  responsible_department_id: Scalars['ID'];
  responsible_user?: Maybe<User>;
  responsible_user_id: Scalars['ID'];
  service: Service;
  service_id: Scalars['ID'];
  short_description: Scalars['String'];
  status: Scalars['String'];
  ticket_id: Scalars['String'];
  type: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type TicketComment = {
  __typename?: 'TicketComment';
  content: Scalars['String'];
  created_at: Scalars['DateTime'];
  creator: User;
  creator_id: Scalars['String'];
  id: Scalars['ID'];
};

export type TicketCommentFilter = {
  content?: Maybe<Array<StringFilter>>;
  created_at?: Maybe<Array<DateFilter>>;
  creator?: Maybe<UserFilter>;
  id?: Maybe<Array<IdFilter>>;
};

export type TicketCommentInclude = {
  content?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['Boolean']>;
  creator?: Maybe<UserInclude>;
  creator_id?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Boolean']>;
};

export type TicketCreateResponse = {
  __typename?: 'TicketCreateResponse';
  errors?: Maybe<Array<ServerError>>;
  ticket?: Maybe<Ticket>;
  validation_errors?: Maybe<Array<ValidationError>>;
};

export type TicketFilter = {
  closed_at?: Maybe<Array<NullableDateFilter>>;
  created_at?: Maybe<Array<DateFilter>>;
  description?: Maybe<Array<StringFilter>>;
  group?: Maybe<TicketGroupFilter>;
  id?: Maybe<Array<IdFilter>>;
  issuer?: Maybe<UserFilter>;
  issuer_department?: Maybe<DepartmentFilter>;
  owner_group?: Maybe<TicketGroupFilter>;
  previous_responsible_department?: Maybe<DepartmentFilter>;
  responsible_department?: Maybe<DepartmentFilter>;
  responsible_user?: Maybe<UserFilter>;
  service?: Maybe<ServiceFilter>;
  short_description?: Maybe<Array<StringFilter>>;
  status?: Maybe<Array<EnumFilter>>;
  ticket_id?: Maybe<Array<StringFilter>>;
  type?: Maybe<Array<EnumFilter>>;
  updated_at?: Maybe<Array<DateFilter>>;
};

export type TicketGroup = {
  __typename?: 'TicketGroup';
  id: Scalars['ID'];
  members: Array<Ticket>;
  owner: Ticket;
};

export type TicketGroupFilter = {
  id?: Maybe<Array<IdFilter>>;
  members?: Maybe<TicketFilter>;
  owner?: Maybe<TicketFilter>;
};

export type TicketGroupInclude = {
  id?: Maybe<Scalars['Boolean']>;
  members?: Maybe<TicketInclude>;
  owner?: Maybe<TicketInclude>;
};

export type TicketHistory = {
  __typename?: 'TicketHistory';
  actions: Array<TicketHistoryAction>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  responsible_department: Department;
  responsible_department_id: Scalars['String'];
  responsible_user: User;
  responsible_user_id: Scalars['String'];
  ticket: Ticket;
  ticket_id: Scalars['String'];
};

export type TicketHistoryAction = {
  __typename?: 'TicketHistoryAction';
  history: TicketHistory;
  history_id: Scalars['String'];
  id: Scalars['ID'];
  type: Scalars['String'];
  value1: Scalars['String'];
  value2: Scalars['String'];
  value3: Scalars['String'];
};

export type TicketHistoryActionFilter = {
  history?: Maybe<TicketHistoryFilter>;
  id?: Maybe<Array<IdFilter>>;
  type?: Maybe<Array<NullableEnumFilter>>;
  value1?: Maybe<Array<NullableStringFilter>>;
  value2?: Maybe<Array<NullableStringFilter>>;
  value3?: Maybe<Array<NullableStringFilter>>;
};

export type TicketHistoryActionInclude = {
  history?: Maybe<TicketHistoryInclude>;
  history_id?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['Boolean']>;
  value1?: Maybe<Scalars['Boolean']>;
  value2?: Maybe<Scalars['Boolean']>;
  value3?: Maybe<Scalars['Boolean']>;
};

export type TicketHistoryFilter = {
  actions?: Maybe<TicketHistoryActionFilter>;
  created_at?: Maybe<Array<DateFilter>>;
  id?: Maybe<Array<IdFilter>>;
  responsible_department?: Maybe<DepartmentFilter>;
  responsible_user?: Maybe<UserFilter>;
  ticket?: Maybe<TicketFilter>;
};

export type TicketHistoryInclude = {
  actions?: Maybe<TicketHistoryActionInclude>;
  created_at?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Boolean']>;
  responsible_department?: Maybe<DepartmentInclude>;
  responsible_department_id?: Maybe<Scalars['Boolean']>;
  responsible_user?: Maybe<UserInclude>;
  responsible_user_id?: Maybe<Scalars['Boolean']>;
  ticket?: Maybe<TicketInclude>;
  ticket_id?: Maybe<Scalars['Boolean']>;
};

export type TicketInclude = {
  closed_at?: Maybe<Scalars['Boolean']>;
  created_at?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['Boolean']>;
  group?: Maybe<TicketGroupInclude>;
  id?: Maybe<Scalars['Boolean']>;
  issuer?: Maybe<UserInclude>;
  issuer_department?: Maybe<DepartmentInclude>;
  owner_group?: Maybe<TicketGroupInclude>;
  previous_responsible_department?: Maybe<DepartmentInclude>;
  responsible_department?: Maybe<DepartmentInclude>;
  responsible_user?: Maybe<UserInclude>;
  service?: Maybe<ServiceInclude>;
  short_description?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['Boolean']>;
  ticket_id?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['Boolean']>;
  updated_at?: Maybe<Scalars['Boolean']>;
};

export type TicketOrder = {
  closed_at?: Maybe<Order>;
  created_at?: Maybe<Order>;
  description?: Maybe<Order>;
  id?: Maybe<Order>;
  service?: Maybe<ServiceOrder>;
  short_description?: Maybe<Order>;
  status?: Maybe<Order>;
  ticket_id?: Maybe<Order>;
  type?: Maybe<Order>;
  updated_at?: Maybe<Order>;
};

export type TicketQueryAllResponse = {
  __typename?: 'TicketQueryAllResponse';
  error?: Maybe<ServerError>;
  tickets?: Maybe<Array<Ticket>>;
};

export type TicketSearchArgument = {
  include?: Maybe<TicketInclude>;
  value: Scalars['String'];
};

export type TicketTemplate = {
  __typename?: 'TicketTemplate';
  create_group: Scalars['Boolean'];
  description: Scalars['String'];
  group: TicketGroup;
  group_id: Scalars['String'];
  id: Scalars['ID'];
  issuer_department: Department;
  issuer_department_id: Scalars['ID'];
  responsible_department: Department;
  responsible_department_id: Scalars['String'];
  responsible_user: User;
  responsible_user_id: Scalars['String'];
  service: Service;
  service_id: Scalars['ID'];
  short_description: Scalars['String'];
  type: Scalars['String'];
};

export type TicketTemplateFilter = {
  create_group?: Maybe<Array<BooleanFilter>>;
  description?: Maybe<Array<NullableStringFilter>>;
  group?: Maybe<TicketGroupFilter>;
  id?: Maybe<Array<IdFilter>>;
  issuer_department?: Maybe<UserFilter>;
  responsible_department?: Maybe<DepartmentFilter>;
  responsible_user?: Maybe<UserFilter>;
  service?: Maybe<ServiceFilter>;
  short_description?: Maybe<Array<NullableStringFilter>>;
  type?: Maybe<Array<NullableEnumFilter>>;
};

export type TicketTemplateInclude = {
  create_group?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['Boolean']>;
  group?: Maybe<TicketGroupInclude>;
  group_id?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Boolean']>;
  issuer_department?: Maybe<DepartmentInclude>;
  issuer_department_id?: Maybe<Scalars['Boolean']>;
  responsible_department?: Maybe<DepartmentInclude>;
  responsible_department_id?: Maybe<Scalars['Boolean']>;
  responsible_user?: Maybe<UserInclude>;
  responsible_user_id?: Maybe<Scalars['Boolean']>;
  service?: Maybe<ServiceInclude>;
  service_id?: Maybe<Scalars['Boolean']>;
  short_description?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  api_keys?: Maybe<Array<ApiKey>>;
  department: Department;
  department_id: Scalars['String'];
  displayName: Scalars['String'];
  id: Scalars['String'];
  issued: Array<Ticket>;
  mail: Scalars['String'];
  permissions: Array<Permission>;
  phoneNumber: Scalars['String'];
  roles: Array<Role>;
  service_history_responsibilities: Array<ServiceHistory>;
  settings: UserSetting;
  settings_id: Scalars['String'];
  template_responsibilities: Array<TicketTemplate>;
  ticket_comment_responsibilities: Array<TicketComment>;
  ticket_history_responsibilities: Array<TicketHistory>;
  ticket_responsibilities: Array<Ticket>;
  username: Scalars['String'];
};

export type UserFilter = {
  department?: Maybe<DepartmentFilter>;
  displayName?: Maybe<Array<NullableStringFilter>>;
  id?: Maybe<Array<IdFilter>>;
  issued?: Maybe<TicketFilter>;
  mail?: Maybe<Array<StringFilter>>;
  permissions?: Maybe<PermissionFilter>;
  phoneNumber?: Maybe<Array<NullableStringFilter>>;
  roles?: Maybe<RoleFilter>;
  service_history_responsibilities?: Maybe<ServiceHistoryFilter>;
  settings?: Maybe<UserSettingFilter>;
  template_responsibilities?: Maybe<TicketTemplateFilter>;
  ticket_comment_responsibilities?: Maybe<TicketCommentFilter>;
  ticket_history_responsibilities?: Maybe<TicketHistoryFilter>;
  ticket_responsibilities?: Maybe<TicketFilter>;
  username?: Maybe<Array<StringFilter>>;
};

export type UserInclude = {
  api_keys?: Maybe<Scalars['Boolean']>;
  department?: Maybe<DepartmentInclude>;
  department_id?: Maybe<Scalars['Boolean']>;
  displayName?: Maybe<Scalars['Boolean']>;
  history_responsibilities?: Maybe<TicketHistoryInclude>;
  id?: Maybe<Scalars['Boolean']>;
  issued?: Maybe<Scalars['Boolean']>;
  mail?: Maybe<Scalars['Boolean']>;
  permissions?: Maybe<PermissionInclude>;
  phoneNumber?: Maybe<Scalars['Boolean']>;
  roles?: Maybe<RoleInclude>;
  settings?: Maybe<UserSettingInclude>;
  settings_id?: Maybe<Scalars['Boolean']>;
  template_responsibilities?: Maybe<TicketTemplateInclude>;
  ticket_comment_responsibilities?: Maybe<TicketCommentInclude>;
  ticket_responsibilities?: Maybe<TicketInclude>;
  username?: Maybe<Scalars['Boolean']>;
};

export type UserSetting = {
  __typename?: 'UserSetting';
  day_theme: Scalars['String'];
  id: Scalars['String'];
  night_theme: Scalars['String'];
  notification_assign_ticket: Array<Scalars['String']>;
  notification_assigned_ticket_change: Array<Scalars['String']>;
  notification_watching_ticket_change: Array<Scalars['String']>;
  public_profile: Scalars['Boolean'];
  user: User;
};

export type UserSettingFilter = {
  day_theme?: Maybe<Array<EnumFilter>>;
  id?: Maybe<Array<IdFilter>>;
  night_theme?: Maybe<Array<EnumFilter>>;
  notification_assign_ticket?: Maybe<Array<EnumArrayFilter>>;
  notification_assigned_ticket_change?: Maybe<Array<EnumArrayFilter>>;
  notification_watching_ticket_change?: Maybe<Array<EnumArrayFilter>>;
  public_profile?: Maybe<Array<BooleanFilter>>;
  user?: Maybe<UserFilter>;
};

export type UserSettingInclude = {
  day_theme?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Boolean']>;
  night_theme?: Maybe<Scalars['Boolean']>;
  notification_assign_ticket?: Maybe<Scalars['Boolean']>;
  notification_assigned_ticket_change?: Maybe<Scalars['Boolean']>;
  notification_watching_ticket_change?: Maybe<Scalars['Boolean']>;
  public_profile?: Maybe<Scalars['Boolean']>;
  user?: Maybe<UserInclude>;
};

export type ValidationError = {
  __typename?: 'ValidationError';
  field: Scalars['String'];
  long_message?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type CreateApiKeyMutationVariables = Exact<{
  scopes: Array<ApiScopeInput> | ApiScopeInput;
  publicKey: Scalars['String'];
  expiresIn: Scalars['String'];
  note: Scalars['String'];
}>;


export type CreateApiKeyMutation = { __typename?: 'Mutation', createApiKey: { __typename?: 'CreateKeyResponse', secret?: { __typename?: 'CrypticoEncryptedKey', cipher: string, status: string } | null | undefined, error?: { __typename?: 'ServerError', name: string, message: string } | null | undefined, validation_errors?: Array<{ __typename?: 'ValidationError', field: string, message: string }> | null | undefined } };

export type CreateTicketMutationVariables = Exact<{
  service: Scalars['String'];
  issuerDepartment: Scalars['String'];
  type: Scalars['String'];
  description: Scalars['String'];
  shortDescription: Scalars['String'];
  issuer?: Maybe<Scalars['String']>;
  groupId?: Maybe<Scalars['String']>;
}>;


export type CreateTicketMutation = { __typename?: 'Mutation', createTicket: { __typename?: 'TicketCreateResponse', validation_errors?: Array<{ __typename?: 'ValidationError', field: string, message: string }> | null | undefined, errors?: Array<{ __typename?: 'ServerError', name: string, message: string }> | null | undefined, ticket?: { __typename?: 'Ticket', id: string, ticket_id: string, short_description: string, description: string, type: string, status: string, issuer_id: string, responsible_department_id: string, responsible_user_id: string, issuer_department_id: string, service_id: string, group_id?: string | null | undefined, created_at: any, updated_at: any } | null | undefined } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, username: string, displayName: string, mail: string, department: { __typename?: 'Department', id: string, name: string } } | null | undefined };

export type DeleteApiKeyMutationVariables = Exact<{
  deleteApiKeyId: Scalars['String'];
}>;


export type DeleteApiKeyMutation = { __typename?: 'Mutation', deleteApiKey: { __typename?: 'DeleteKeyResponse', success?: boolean | null | undefined, error?: { __typename?: 'ServerError', name: string, message: string } | null | undefined } };

export type FindTicketsMutationVariables = Exact<{
  filter?: Maybe<TicketFilter>;
  search?: Maybe<TicketSearchArgument>;
  count?: Maybe<Scalars['Float']>;
}>;


export type FindTicketsMutation = { __typename?: 'Mutation', findTickets: { __typename?: 'TicketQueryAllResponse', tickets?: Array<{ __typename?: 'Ticket', id: string, ticket_id: string, short_description: string, type: string, status: string, created_at: any, updated_at: any, closed_at?: any | null | undefined, responsible_user?: { __typename?: 'User', id: string, username: string, displayName: string, mail: string } | null | undefined, responsible_department: { __typename?: 'Department', id: string, name: string }, issuer?: { __typename?: 'User', id: string, username: string, displayName: string, mail: string } | null | undefined, issuer_department: { __typename?: 'Department', id: string, name: string }, service: { __typename?: 'Service', id: string, service_id: string, name: string }, group?: { __typename?: 'TicketGroup', id: string } | null | undefined }> | null | undefined } };

export type GetAllScopeCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllScopeCategoriesQuery = { __typename?: 'Query', getAllScopeCategories: { __typename?: 'GetCategoriesResponse', categories?: Array<{ __typename?: 'ApiScopeCategory', id: string, name: string, description: string, scopes: Array<{ __typename?: 'ApiScope', id: string, name: string, description: string }> }> | null | undefined, error?: { __typename?: 'ServerError', name: string, message: string } | null | undefined } };

export type GetKeysOfUserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetKeysOfUserQuery = { __typename?: 'Query', getKeysOfUser: { __typename?: 'GetKeysResponse', keys?: Array<{ __typename?: 'ApiKey', id: string, note: string, expires?: any | null | undefined, last_use?: any | null | undefined, scopes?: Array<{ __typename?: 'ApiScope', id: string, name: string }> | null | undefined }> | null | undefined } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  mail: Scalars['String'];
  clientId: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken?: string | null | undefined, user?: { __typename?: 'User', id: string, username: string, displayName: string, mail: string, department: { __typename?: 'Department', id: string, name: string } } | null | undefined, error?: { __typename?: 'ServerError', name: string, message: string } | null | undefined } };

export type SearchUserByDisplayNameQueryVariables = Exact<{
  search: Scalars['String'];
  department?: Maybe<Scalars['String']>;
}>;


export type SearchUserByDisplayNameQuery = { __typename?: 'Query', searchUser?: Array<{ __typename?: 'User', displayName: string, department: { __typename?: 'Department', name: string } }> | null | undefined };

export type NewTicketCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewTicketCreatedSubscription = { __typename?: 'Subscription', ticketCreated?: { __typename?: 'Ticket', id: string, ticket_id: string, short_description: string, description: string, type: string, status: string, created_at: any, updated_at: any, responsible_user?: { __typename?: 'User', id: string, displayName: string } | null | undefined, responsible_department: { __typename?: 'Department', name: string }, issuer?: { __typename?: 'User', id: string, displayName: string } | null | undefined, issuer_department: { __typename?: 'Department', name: string }, service: { __typename?: 'Service', id: string, service_id: string, name: string }, group?: { __typename?: 'TicketGroup', id: string } | null | undefined } | null | undefined };


export const CreateApiKeyDocument = gql`
    mutation createApiKey($scopes: [ApiScopeInput!]!, $publicKey: String!, $expiresIn: String!, $note: String!) {
  createApiKey(
    public_key: $publicKey
    expires_in: $expiresIn
    note: $note
    scopes: $scopes
  ) {
    secret {
      cipher
      status
    }
    error {
      name
      message
    }
    validation_errors {
      field
      message
    }
  }
}
    `;
export type CreateApiKeyMutationFn = Apollo.MutationFunction<CreateApiKeyMutation, CreateApiKeyMutationVariables>;

/**
 * __useCreateApiKeyMutation__
 *
 * To run a mutation, you first call `useCreateApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApiKeyMutation, { data, loading, error }] = useCreateApiKeyMutation({
 *   variables: {
 *      scopes: // value for 'scopes'
 *      publicKey: // value for 'publicKey'
 *      expiresIn: // value for 'expiresIn'
 *      note: // value for 'note'
 *   },
 * });
 */
export function useCreateApiKeyMutation(baseOptions?: Apollo.MutationHookOptions<CreateApiKeyMutation, CreateApiKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateApiKeyMutation, CreateApiKeyMutationVariables>(CreateApiKeyDocument, options);
      }
export type CreateApiKeyMutationHookResult = ReturnType<typeof useCreateApiKeyMutation>;
export type CreateApiKeyMutationResult = Apollo.MutationResult<CreateApiKeyMutation>;
export type CreateApiKeyMutationOptions = Apollo.BaseMutationOptions<CreateApiKeyMutation, CreateApiKeyMutationVariables>;
export const CreateTicketDocument = gql`
    mutation createTicket($service: String!, $issuerDepartment: String!, $type: String!, $description: String!, $shortDescription: String!, $issuer: String, $groupId: String) {
  createTicket(
    service: $service
    issuer_department: $issuerDepartment
    type: $type
    description: $description
    short_description: $shortDescription
    issuer: $issuer
    group_id: $groupId
  ) {
    validation_errors {
      field
      message
    }
    errors {
      name
      message
    }
    ticket {
      id
      ticket_id
      short_description
      description
      type
      status
      issuer_id
      responsible_department_id
      responsible_user_id
      issuer_department_id
      service_id
      group_id
      created_at
      updated_at
    }
  }
}
    `;
export type CreateTicketMutationFn = Apollo.MutationFunction<CreateTicketMutation, CreateTicketMutationVariables>;

/**
 * __useCreateTicketMutation__
 *
 * To run a mutation, you first call `useCreateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTicketMutation, { data, loading, error }] = useCreateTicketMutation({
 *   variables: {
 *      service: // value for 'service'
 *      issuerDepartment: // value for 'issuerDepartment'
 *      type: // value for 'type'
 *      description: // value for 'description'
 *      shortDescription: // value for 'shortDescription'
 *      issuer: // value for 'issuer'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useCreateTicketMutation(baseOptions?: Apollo.MutationHookOptions<CreateTicketMutation, CreateTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTicketMutation, CreateTicketMutationVariables>(CreateTicketDocument, options);
      }
export type CreateTicketMutationHookResult = ReturnType<typeof useCreateTicketMutation>;
export type CreateTicketMutationResult = Apollo.MutationResult<CreateTicketMutation>;
export type CreateTicketMutationOptions = Apollo.BaseMutationOptions<CreateTicketMutation, CreateTicketMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    username
    displayName
    mail
    department {
      id
      name
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const DeleteApiKeyDocument = gql`
    mutation deleteApiKey($deleteApiKeyId: String!) {
  deleteApiKey(id: $deleteApiKeyId) {
    success
    error {
      name
      message
    }
  }
}
    `;
export type DeleteApiKeyMutationFn = Apollo.MutationFunction<DeleteApiKeyMutation, DeleteApiKeyMutationVariables>;

/**
 * __useDeleteApiKeyMutation__
 *
 * To run a mutation, you first call `useDeleteApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteApiKeyMutation, { data, loading, error }] = useDeleteApiKeyMutation({
 *   variables: {
 *      deleteApiKeyId: // value for 'deleteApiKeyId'
 *   },
 * });
 */
export function useDeleteApiKeyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteApiKeyMutation, DeleteApiKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteApiKeyMutation, DeleteApiKeyMutationVariables>(DeleteApiKeyDocument, options);
      }
export type DeleteApiKeyMutationHookResult = ReturnType<typeof useDeleteApiKeyMutation>;
export type DeleteApiKeyMutationResult = Apollo.MutationResult<DeleteApiKeyMutation>;
export type DeleteApiKeyMutationOptions = Apollo.BaseMutationOptions<DeleteApiKeyMutation, DeleteApiKeyMutationVariables>;
export const FindTicketsDocument = gql`
    mutation FindTickets($filter: TicketFilter, $search: TicketSearchArgument, $count: Float) {
  findTickets(filter: $filter, search: $search, count: $count) {
    tickets {
      id
      ticket_id
      short_description
      type
      status
      responsible_user {
        id
        username
        displayName
        mail
      }
      responsible_department {
        id
        name
      }
      issuer {
        id
        username
        displayName
        mail
      }
      issuer_department {
        id
        name
      }
      service {
        id
        service_id
        name
      }
      group {
        id
      }
      created_at
      updated_at
      closed_at
    }
  }
}
    `;
export type FindTicketsMutationFn = Apollo.MutationFunction<FindTicketsMutation, FindTicketsMutationVariables>;

/**
 * __useFindTicketsMutation__
 *
 * To run a mutation, you first call `useFindTicketsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindTicketsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findTicketsMutation, { data, loading, error }] = useFindTicketsMutation({
 *   variables: {
 *      filter: // value for 'filter'
 *      search: // value for 'search'
 *      count: // value for 'count'
 *   },
 * });
 */
export function useFindTicketsMutation(baseOptions?: Apollo.MutationHookOptions<FindTicketsMutation, FindTicketsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FindTicketsMutation, FindTicketsMutationVariables>(FindTicketsDocument, options);
      }
export type FindTicketsMutationHookResult = ReturnType<typeof useFindTicketsMutation>;
export type FindTicketsMutationResult = Apollo.MutationResult<FindTicketsMutation>;
export type FindTicketsMutationOptions = Apollo.BaseMutationOptions<FindTicketsMutation, FindTicketsMutationVariables>;
export const GetAllScopeCategoriesDocument = gql`
    query getAllScopeCategories {
  getAllScopeCategories {
    categories {
      id
      name
      description
      scopes {
        id
        name
        description
      }
    }
    error {
      name
      message
    }
  }
}
    `;

/**
 * __useGetAllScopeCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllScopeCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllScopeCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllScopeCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllScopeCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllScopeCategoriesQuery, GetAllScopeCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllScopeCategoriesQuery, GetAllScopeCategoriesQueryVariables>(GetAllScopeCategoriesDocument, options);
      }
export function useGetAllScopeCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllScopeCategoriesQuery, GetAllScopeCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllScopeCategoriesQuery, GetAllScopeCategoriesQueryVariables>(GetAllScopeCategoriesDocument, options);
        }
export type GetAllScopeCategoriesQueryHookResult = ReturnType<typeof useGetAllScopeCategoriesQuery>;
export type GetAllScopeCategoriesLazyQueryHookResult = ReturnType<typeof useGetAllScopeCategoriesLazyQuery>;
export type GetAllScopeCategoriesQueryResult = Apollo.QueryResult<GetAllScopeCategoriesQuery, GetAllScopeCategoriesQueryVariables>;
export const GetKeysOfUserDocument = gql`
    query getKeysOfUser($userId: String!) {
  getKeysOfUser(user_id: $userId) {
    keys {
      id
      note
      scopes {
        id
        name
      }
      expires
      last_use
    }
  }
}
    `;

/**
 * __useGetKeysOfUserQuery__
 *
 * To run a query within a React component, call `useGetKeysOfUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetKeysOfUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetKeysOfUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetKeysOfUserQuery(baseOptions: Apollo.QueryHookOptions<GetKeysOfUserQuery, GetKeysOfUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetKeysOfUserQuery, GetKeysOfUserQueryVariables>(GetKeysOfUserDocument, options);
      }
export function useGetKeysOfUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetKeysOfUserQuery, GetKeysOfUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetKeysOfUserQuery, GetKeysOfUserQueryVariables>(GetKeysOfUserDocument, options);
        }
export type GetKeysOfUserQueryHookResult = ReturnType<typeof useGetKeysOfUserQuery>;
export type GetKeysOfUserLazyQueryHookResult = ReturnType<typeof useGetKeysOfUserLazyQuery>;
export type GetKeysOfUserQueryResult = Apollo.QueryResult<GetKeysOfUserQuery, GetKeysOfUserQueryVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $mail: String!, $clientId: String!) {
  login(password: $password, mail: $mail, client_id: $clientId) {
    user {
      id
      username
      displayName
      mail
      department {
        id
        name
      }
    }
    accessToken
    error {
      name
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      mail: // value for 'mail'
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SearchUserByDisplayNameDocument = gql`
    query searchUserByDisplayName($search: String!, $department: String) {
  searchUser(search: $search, department: $department) {
    displayName
    department {
      name
    }
  }
}
    `;

/**
 * __useSearchUserByDisplayNameQuery__
 *
 * To run a query within a React component, call `useSearchUserByDisplayNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserByDisplayNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserByDisplayNameQuery({
 *   variables: {
 *      search: // value for 'search'
 *      department: // value for 'department'
 *   },
 * });
 */
export function useSearchUserByDisplayNameQuery(baseOptions: Apollo.QueryHookOptions<SearchUserByDisplayNameQuery, SearchUserByDisplayNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUserByDisplayNameQuery, SearchUserByDisplayNameQueryVariables>(SearchUserByDisplayNameDocument, options);
      }
export function useSearchUserByDisplayNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUserByDisplayNameQuery, SearchUserByDisplayNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUserByDisplayNameQuery, SearchUserByDisplayNameQueryVariables>(SearchUserByDisplayNameDocument, options);
        }
export type SearchUserByDisplayNameQueryHookResult = ReturnType<typeof useSearchUserByDisplayNameQuery>;
export type SearchUserByDisplayNameLazyQueryHookResult = ReturnType<typeof useSearchUserByDisplayNameLazyQuery>;
export type SearchUserByDisplayNameQueryResult = Apollo.QueryResult<SearchUserByDisplayNameQuery, SearchUserByDisplayNameQueryVariables>;
export const NewTicketCreatedDocument = gql`
    subscription NewTicketCreated {
  ticketCreated {
    id
    ticket_id
    short_description
    description
    type
    status
    responsible_user {
      id
      displayName
    }
    responsible_department {
      name
    }
    issuer {
      id
      displayName
    }
    issuer_department {
      name
    }
    service {
      id
      service_id
      name
    }
    group {
      id
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useNewTicketCreatedSubscription__
 *
 * To run a query within a React component, call `useNewTicketCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewTicketCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewTicketCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewTicketCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewTicketCreatedSubscription, NewTicketCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewTicketCreatedSubscription, NewTicketCreatedSubscriptionVariables>(NewTicketCreatedDocument, options);
      }
export type NewTicketCreatedSubscriptionHookResult = ReturnType<typeof useNewTicketCreatedSubscription>;
export type NewTicketCreatedSubscriptionResult = Apollo.SubscriptionResult<NewTicketCreatedSubscription>;