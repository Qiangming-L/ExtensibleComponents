/**
 * @todo Input Calls the event for Chinese text input
 * @function handleChange Called when the value of input changes
 * @function composition The function is called when a character such as Chinese is entered
 * @function blurFocus Input Loses or gains focus by calling a function
 * @param {Boolean} [disallowChange = false] whether to disable change events
 * @param {Boolean} [disallowComposition = true] whether to disable compositionstart and compositionend events
 * @param {Boolean} [disallowBlurFocus = true] whether to disable blur and focus events
 * @param {string} [placeholder = ""] input placeholder
 *
 */
/**
 * @function handleChange
 * @param {String} [value] The value of the input
 * @event event
 *
 */
/**
 * @function composition
 * @param {String} [value] The value of the input
 * @type {String} [type] The name of the event (compositionstart/compositionend)
 * @event event
 *
 */
/**
 * @function blurFocus
 * @todo Input Loses or gains focus by calling a function
 * @param {String} [value] The value of the input
 * @type {String} [type] The name of the event (blur/focus)
 * @event event
 *
 */
import React, { useState } from "react";

type Props = {
  handleChange?: (
    value?: string,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  composition?: (
    value?: string,
    type?: string,
    event?: React.CompositionEvent<HTMLInputElement>
  ) => void;
  blurFocus?: (
    value?: string,
    type?: string,
    event?: React.ChangeEvent<HTMLInputElement>
  ) => void;
  disallowChange?: boolean;
  disallowComposition?: boolean;
  disallowBlurFocus?: boolean;
  placeholder?: string;
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
