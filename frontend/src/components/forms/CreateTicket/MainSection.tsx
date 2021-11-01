import { FieldValues, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DescriptionRow } from "./DescriptionRow";
import { IssuerRow } from "./IssuerRow";
import { ResponsibilitiesRow } from "./ResponsibilitiesRow";
import { ShortDescriptionRow } from "./ShortDescriptionRow";
import { TypeAndServiceRow } from "./TypeAndServiceRow";

interface Props {
  register: UseFormRegister<FieldValues>;
  setValue: Function;
  validation_errors: any; // TODO: Add interface
}

export const MainSection: React.FC<Props> = ({
  register,
  setValue,
  validation_errors,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <h5>{t("Main")}</h5>
      <TypeAndServiceRow
        register={register}
        validation_errors={validation_errors}
        setValue={setValue}
      />
      <ShortDescriptionRow
        register={register}
        validation_errors={validation_errors}
      />
      <DescriptionRow
        register={register}
        validation_errors={validation_errors}
      />
      <ResponsibilitiesRow
        register={register}
        validation_errors={validation_errors}
      />
      <IssuerRow
        register={register}
        validation_errors={validation_errors}
        setValue={setValue}
      />
    </>
  );
};
