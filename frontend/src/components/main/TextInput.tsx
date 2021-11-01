import { ReactElement, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { InputSizeEnum } from "../../objects/InputSizeEnum";

interface Props {
  register: UseFormRegister<FieldValues>;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  validation?: any;
  changeUseState?: [string, React.Dispatch<React.SetStateAction<string>>];
  error?: any;
  size?: InputSizeEnum;
  readonly?: boolean;
}

export const TextInput: React.FC<Props> = ({
  register,
  name,
  label,
  placeholder,
  disabled,
  validation,
  changeUseState,
  error,
  size,
  readonly,
}) => {
  if (!changeUseState) {
    return (
      <div className={`form-group col-md-${size ?? 6}`}>
        <label htmlFor={`inp-${name}`}>{label}</label>
        <input
          type="text"
          className="form-control"
          id={`inp-${name}`}
          {...register(name, validation ?? {})}
          placeholder={placeholder}
          readOnly={readonly ?? false}
        />
      </div>
    );
  }
  const [state, setState] = changeUseState;
  return (
    <div className={`form-group col-md-${size ?? 6}`}>
      <label htmlFor={`inp-${name}`}>{label}</label>
      <input
        type="text"
        className="form-control"
        id={`inp-${name}`}
        {...register(name, validation ?? {})}
        placeholder={placeholder}
        readOnly={readonly ?? false}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
};
