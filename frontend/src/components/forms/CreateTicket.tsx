import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCurrentUserQuery } from "../../generated/graphql";
import { ITicketCreateFormInputs } from "../../pages/ticket/Create";
import { MainSection } from "./CreateTicket/MainSection";

interface Props {
  submit: SubmitHandler<ITicketCreateFormInputs>;
}

export const CreateTicketFormComponent: React.FC<Props> = ({ submit }) => {
  const { t, i18n } = useTranslation();

  // Define group_id
  const [groupId, setGroupId] = useState("");

  // Query current user to declare responsibility
  const { data, loading } = useCurrentUserQuery();

  // Use React hook useForm for ticket creation form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ITicketCreateFormInputs>({
    defaultValues: {
      responsible_user: data?.currentUser?.displayName,
      responsible_department: data?.currentUser?.department.name,
    },
  });

  return (
    <form onSubmit={handleSubmit(submit)}>
      <MainSection
        register={register}
        validation_errors={errors}
        setValue={setValue}
      />
      <div>
        <input
          type="hidden"
          {...register("group_id")}
          value={groupId}
          id="inp-group_id"
        />
      </div>
      <div className="d-flex justify-content-end mt-2">
        <a href="" className="btn btn-danger">
          {t("CancelAction")}
        </a>
        <button
          type="button"
          className="btn btn-secondary mx-2"
          data-toggle="modal"
          data-target="#addTicketToGroupModal"
        >
          {t("AddTicketToGroup")}
        </button>
        <button type="submit" className="btn btn-success">
          {t("CreateTicket")}
        </button>
      </div>
    </form>
  );
};
