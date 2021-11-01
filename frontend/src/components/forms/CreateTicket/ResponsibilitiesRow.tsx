import { FieldValues, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputSizeEnum } from "../../../objects/InputSizeEnum";
import { TextInput } from "../../main/TextInput";

interface Props {
  register: UseFormRegister<FieldValues>;
  validation_errors: any; // TODO: Add interface
}

export const ResponsibilitiesRow: React.FC<Props> = ({
  register,
  validation_errors,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="row my-1">
      <TextInput
        register={register}
        name="responsible_user"
        label={t("ResponsibleUser")}
        validation={{}}
        size={InputSizeEnum.MEDIUM}
        error={validation_errors.responsible_user}
        readonly={true}
      />
      <TextInput
        register={register}
        name="responsible_department"
        label={t("ResponsibleDepartment")}
        validation={{}}
        size={InputSizeEnum.MEDIUM}
        error={validation_errors.responsible_department}
        readonly={true}
      />
    </div>
  );
};
