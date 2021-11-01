import { MouseEvent, useEffect, useState, KeyboardEvent } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { InputSizeEnum } from "../../objects/InputSizeEnum";

interface Props {
  register: UseFormRegister<FieldValues>;
  name: string;
  changeUseState: [string, React.Dispatch<React.SetStateAction<string>>];
  label: string;
  placeholder?: string;
  disabled?: boolean;
  validation?: any;
  error?: any;
  size?: InputSizeEnum;
  readonly?: boolean;
  data: string[];
  selectAction?: Function;
  setValue?: Function;
}

export const AutoCompleteTextInput: React.FC<Props> = ({
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
  data,
  selectAction,
  setValue,
}) => {
  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);
  const [state, setState] = changeUseState;

  useEffect(() => {
    if (active >= data.length && data.length !== 0) setActive(data.length - 1);
  }, [data]);

  const clickOnValue = (e: MouseEvent<HTMLElement>) => {
    setShow(false);
    setActive(0);
    const value = e.currentTarget.innerText;
    setState(value);
    if (setValue) setValue(name, value);
    if (selectAction) selectAction(value);
  };

  const pressArrowUp = () => {
    if (active === 0) setActive(data.length - 1);
    else setActive(active - 1);
  };

  const pressArrowDown = () => {
    if (active == data.length - 1) setActive(0);
    else setActive(active + 1);
  };

  const pressEnter = () => {
    setShow(false);
    setActive(0);
    const value = data[active];
    setState(value);
    if (setValue) setValue(name, value);
    if (selectAction) selectAction(value);
  };

  const pressKey = (e: KeyboardEvent<HTMLInputElement>) => {
    //e.preventDefault();
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        pressArrowUp();
        break;
      case "ArrowDown":
        e.preventDefault();
        pressArrowDown();
        break;
      case "Enter":
        e.preventDefault();
        pressEnter();
        break;
      case "Tab":
        pressEnter();
        break;
    }
  };

  return (
    <div className={`form-group col-md-${size ?? 6} position-relative`}>
      <label htmlFor={`inp-${name}`}>{label}</label>
      <input
        type="text"
        className="form-control"
        id={`inp-${name}`}
        {...register(name, validation ?? {})}
        placeholder={placeholder}
        readOnly={readonly ?? false}
        value={state}
        onChange={(e) => {
          setState(e.target.value);
          setShow(e.target.value.length >= 2);
        }}
        onKeyDown={pressKey}
        autoComplete="off"
      />
      {show && (
        <ul className="autocomplete">
          {data.map((d, i) => (
            <li
              key={i}
              onClick={clickOnValue}
              className={i == active ? "active" : ""}
            >
              {d}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/*
import React, {
  Dispatch,
  KeyboardEvent,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface Props {
  data: string[];
  defineValue: Dispatch<SetStateAction<string>>;
  keyPressed: [string, Dispatch<SetStateAction<string>>];
}

export const AutoComplete: React.FC<Props> = ({ data, defineValue, keyPressed }) => {

  const [active, setActive] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active >= data.length) setActive(data.length - 1);
    if (data.length != 0) setShow(true);
    else setShow(false);
  }, [data]);

  const clickOnValue = (e: MouseEvent<HTMLElement>) => {
    setShow(false);
    setActive(0);
    defineValue(e.currentTarget.innerText);
  };

  const pressArrowUp = () => {
    if (active === 0) setActive(data.length - 1);
    else setActive(active + 1);
  };

  const pressArrowDown = () => {
    if (active == data.length - 1) setActive(0);
    else setActive(active - 1);
  };

  const pressEnter = () => {
    setShow(false);
    setActive(0);
    defineValue(data[active]);
  };

  const pressKey = (key: string) => {
    //e.preventDefault();
    switch (key) {
      case "ArrowUp":
        pressArrowUp();
        break;
      case "ArrowDown":
        pressArrowDown();
        break;
      case "Enter":
        pressEnter();
        break;
    }
  };

  return (
    <ul className="autocomplete">
      {data.map((d, i) => {
        <li key={i} onClick={clickOnValue}>
          {d}
        </li>;
      })}
    </ul>
  );
};
*/
