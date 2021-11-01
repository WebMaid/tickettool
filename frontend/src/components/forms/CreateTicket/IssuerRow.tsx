import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getAccessToken } from "../../../accessToken";
import { InputSizeEnum } from "../../../objects/InputSizeEnum";
import { settings } from "../../../Settings";
import { AutoCompleteTextInput } from "../../main/AutoCompleteTextInput";
import { TextInput } from "../../main/TextInput";

interface Props {
  register: UseFormRegister<FieldValues>;
  setValue: Function;
  validation_errors: any; // TODO: Add interface
}

interface IIssuerDataDepartment {
  name: string;
}

interface IIssuerData {
  displayName: string;
  department: IIssuerDataDepartment;
}

export const IssuerRow: React.FC<Props> = ({
  register,
  setValue,
  validation_errors,
}) => {
  const { t, i18n } = useTranslation();

  // Define default values
  const default_issuerData: IIssuerData[] = [];
  const default_issuerDepartmentData: string[] = [];

  // Define states for issuer
  const [issuerData, setIssuerData] = useState(default_issuerData);
  const [issuer, setIssuer] = useState("");

  // Define states for issuer department
  const [issuerDepartmentData, setIssuerDepartmentData] = useState(
    default_issuerDepartmentData
  );
  const [issuerDepartment, setIssuerDepartment] = useState("");

  // Fetch users that match the issuer value to display them
  useEffect(() => {
    async function fetchIssuer() {
      const response: any = await (
        await fetch(settings.backend.api.url, {
          method: "POST",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `bearer ${getAccessToken()}`,
          }),
          body: JSON.stringify({
            operationName: "searchUserByDisplayName",
            variables: {
              search: issuer,
            },
            query: `query searchUserByDisplayName($search: String!, $department: String) {
                  searchUser(search: $search, department: $department) {
                    displayName
                    department {
                      name
                    }
                  }
                }`,
          }),
        })
      ).json();
      const result: any[] = response?.data?.searchUser ?? [];
      setIssuerData(result);
    }
    if (issuer?.length >= 2) {
      fetchIssuer();
    } else {
      setIssuerData([]);
    }
  }, [issuer]);

  // function to declare the department
  const defineIssuerDepartment = (name: string) => {
    const issuer = issuerData.filter((i) => i.displayName === name);
    if (issuer.length !== 0) {
      if (issuer.length >= 2) {
        setIssuerDepartment("");
        setIssuerDepartmentData(
          issuer.map((d) => {
            return d?.department.name;
          })
        );
      } else {
        setIssuerDepartmentData([]);
        setIssuerDepartment(issuer[0].department.name);
        setValue("issuer_department", issuer[0].department.name);
      }
    }
  };

  const issuerStringArray: string[] = issuerData.map((d) => {
    return d?.displayName;
  });

  return (
    <div className="row my-1">
      <AutoCompleteTextInput
        register={register}
        name="issuer"
        label={t("IssuerUser")}
        validation={{}}
        placeholder={t("IssuerUserPlaceholder")}
        size={InputSizeEnum.MEDIUM}
        error={validation_errors.issuer}
        changeUseState={[issuer, setIssuer]}
        data={Array.from(new Set(issuerStringArray))}
        selectAction={defineIssuerDepartment}
        setValue={setValue}
      />
      {issuerDepartmentData.length !== 0 ? (
        <div className="form-group col-md-6">
          <label htmlFor="inp-issuer_department">{t("IssuerDepartment")}</label>
          <select
            {...register("issuer_department")}
            id="inp-issuer_department"
            className="form-control"
          >
            <option value="">{t("PleaseChoose")}</option>
            {issuerDepartmentData.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <TextInput
          register={register}
          name="issuer_department"
          label={t("IssuerDepartment")}
          validation={{}}
          size={InputSizeEnum.MEDIUM}
          error={validation_errors.issuer_department}
          changeUseState={[issuerDepartment, setIssuerDepartment]}
          readonly={true}
        />
      )}
    </div>
  );
};
