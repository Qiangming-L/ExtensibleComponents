import React, { useState } from "react";

type Props = {
  handleChange?: (
    value?: string,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  composition?: (
    value?: string,
    type?: string, // value => compositionstart/compositionend
    event?: React.CompositionEvent<HTMLInputElement>
  ) => void;
  blurFocus?: (
    value?: string,
    type?: string, // value => blur/focus
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  disallowChange?: boolean; // default => false
  disallowComposition?: boolean; // default => true
  disallowBlurFocus?: boolean; // default => true
  placeholder?: string; // default => ""
};

const CompositionInput: React.FC<Props> = (props) => {
  const {
    disallowChange = false,
    disallowComposition = true,
    disallowBlurFocus = true,
    placeholder = "",
  } = props;
  const [inputValue, setInputValue] = useState<string>("");

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (disallowChange) return;
    if (props.handleChange) {
      props.handleChange(event.target.value, event);
    }
  };
  const onComposition = (event: React.CompositionEvent<HTMLInputElement>) => {
    if (disallowComposition) return;
    if (props.composition) {
      props.composition(
        (event.target as HTMLInputElement).value,
        event.type,
        event
      );
    }
  };
  const onBlurFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disallowBlurFocus) return;
    if (props.blurFocus) {
      props.blurFocus(event.target.value, event.type, event);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={change}
        onCompositionStart={onComposition}
        onCompositionEnd={onComposition}
        onBlur={onBlurFocus}
        onFocus={onBlurFocus}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CompositionInput;
