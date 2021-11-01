import { FieldValues, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { InputSizeEnum } from "../../../objects/InputSizeEnum";
import { TextInput } from "../../main/TextInput";

interface Props {
  register: UseFormRegister<FieldValues>;
  validation_errors: any;
}

export const ShortDescriptionRow: React.FC<Props> = ({
  register,
  validation_errors,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="row my-1">
      <TextInput
        register={register}
        name="short_description"
        label={t("ShortDescription")}
        validation={{}}
        placeholder={t("ShortDescriptionPlaceholder")}
        size={InputSizeEnum.BIG}
        error={validation_errors.short_description}
      />
    </div>
  );
};
