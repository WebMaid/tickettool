import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getAccessToken } from "../../../accessToken";
import { InputSizeEnum } from "../../../objects/InputSizeEnum";
import { TicketTypeEnum } from "../../../objects/TicketTypeEnum";
import { settings } from "../../../Settings";
import { AutoCompleteTextInput } from "../../main/AutoCompleteTextInput";
import { TextInput } from "../../main/TextInput";

interface Props {
  register: UseFormRegister<FieldValues>;
  setValue: Function;
  validation_errors: any; // TODO: Add interface
}

export const TypeAndServiceRow: React.FC<Props> = ({
  register,
  setValue,
  validation_errors,
}) => {
  const { t, i18n } = useTranslation();

  // Define default values
  const default_serviceData: string[] = [];

  const [service, setService] = useState("");
  const [serviceData, setServiceData] = useState(default_serviceData);

  // Fetch services that match the service value to display them
  useEffect(() => {
    async function fetchService() {
      const response: any = await (
        await fetch(settings.backend.api.url, {
          method: "POST",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `bearer ${getAccessToken()}`,
          }),
          body: JSON.stringify({
            operationName: "searchServiceByName",
            variables: {
              name: service,
            },
            query: `query searchServiceByName($name: String!) {
              searchService(name: $name) {
                name
              }
            }`,
          }),
        })
      ).json();
      const result: any[] = response?.data?.searchService ?? [];
      setServiceData(
        result.map((s) => {
          return s.name;
        })
      );
    }
    if (service?.length >= 2) {
      fetchService();
    } else {
      setServiceData([]);
    }
  }, [service]);

  // Define possible types
  const types = Object.values(TicketTypeEnum);

  return (
    <div className="row my-1">
      <div className="form-group col-md-6">
        <label htmlFor="inp-type">{t("Type")}</label>
        <select
          {...register("type")}
          id="inp-type"
          className="form-control"
          defaultValue={types[0]}
        >
          {types.map((t, i) => (
            <option key={i} value={t}>
              {t.replaceAll("-", " ")}
            </option>
          ))}
        </select>
      </div>
      <AutoCompleteTextInput
        register={register}
        name="service"
        label={t("Service")}
        validation={{}}
        placeholder={t("ServicePlaceholder")}
        size={InputSizeEnum.MEDIUM}
        error={validation_errors.service}
        changeUseState={[service, setService]}
        data={Array.from(new Set(serviceData))}
        setValue={setValue}
      />
    </div>
  );
};
