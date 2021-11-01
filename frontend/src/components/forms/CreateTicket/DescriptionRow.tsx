import { FieldValues, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
  register: UseFormRegister<FieldValues>;
  validation_errors: any; // TODO: Add interface
}

export const DescriptionRow: React.FC<Props> = ({
  register,
  validation_errors,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="form-group my-1">
      <label htmlFor="inp-description">{t("Description")}</label>
      <textarea
        className="form-control"
        placeholder={t("DescriptionPlaceholder")}
        {...register("description")}
        id="inp-description"
        rows={7}
      ></textarea>
    </div>
  );
};
