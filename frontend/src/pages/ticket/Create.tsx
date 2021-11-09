import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { getAccessToken } from "../../accessToken";
import { CreateTicketFormComponent } from "../../components/forms/CreateTicket";
import { AutoCompleteTextInput } from "../../components/main/AutoCompleteTextInput";
import { TextInput } from "../../components/main/TextInput";
import { TitleComponent } from "../../components/main/Title";
import {
  useCreateTicketMutation,
  useCurrentUserQuery,
} from "../../generated/graphql";
import { InputSizeEnum } from "../../objects/InputSizeEnum";
import { settings } from "../../Settings";

interface Props {}

export interface ITicketCreateFormInputs {
  type: string;
  service: string;
  short_description: string;
  description: string;
  issuer: string;
  issuer_department: string;
  responsible_user: string;
  responsible_department: string;
  group_id: string;
}

export const TicketCreatePage: React.FC<Props> = () => {
  const navigator = useNavigate();
  const { t, i18n } = useTranslation();
  const [createTicket] = useCreateTicketMutation();

  const submit: SubmitHandler<any> = async (data: ITicketCreateFormInputs) => {
    const response = await createTicket({
      variables: {
        type: data.type,
        service: data.service,
        shortDescription: data.short_description,
        description: data.description,
        issuer: data.issuer,
        issuerDepartment: data.issuer_department,
        groupId: data.group_id == "" ? null : data.group_id,
      },
    });
    if (
      !response.errors &&
      !response.data?.createTicket.errors &&
      !response.data?.createTicket.validation_errors
    ) {
      if (response.data?.createTicket.ticket?.id)
        navigator(`/ticket/${response.data.createTicket.ticket.id}`, {
          replace: true,
        });
      else navigator("/tickets", { replace: true });
    }
  };

  return (
    <div>
      <div className="col-md-4 offset-md-4">
        <TitleComponent content={t("CreateTicket")} />
        <CreateTicketFormComponent submit={submit} />
      </div>
    </div>
  );
};
