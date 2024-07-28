import React from "react";
import { useState, FormEvent } from 'react'

interface Props extends React.HTMLProps<HTMLInputElement> {
  id: string;
  name: string;
  className?: string;
  label?: string;
  errorText?: string;
}

const TextInput = React.memo(
  ({ className, label, errorText, id, ...rest }: Props) => {
    const [validationMessage, setValidationMessage] = useState<string>("");

    const onInvalid = (e: FormEvent) => {
      const target = e.target as HTMLInputElement
      setValidationMessage(target.validationMessage)
    }

    const onBlur = (e: FormEvent) => {
      const target = e.target as HTMLInputElement

      if (validationMessage) {
        setValidationMessage(target.validationMessage)
      }
    }

    return (
      <div className={className}>
        <div >
          {label && (
            <div className='label'>
              <label htmlFor={id}>{label}</label>
            </div>
          )}
        </div>
        <div>
          <input
            id={id}
            className='input'
            onInvalid={onInvalid}
            onBlur={onBlur}
            {...rest}
          />
        </div>

        {!!validationMessage && (
          <div className='validationMessage'>
            {errorText || validationMessage}
          </div>
        )}
      </div>
    )
  }
)

TextInput.displayName = "TextInput"

export default TextInput;