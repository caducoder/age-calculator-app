import { FormEvent } from 'react'

interface Props {
  id: string;
  action?: string;
  children: React.ReactNode;
  className?: string;
  onSubmit: (data: FormData) => void;
}

const Form = ({ id, children, className, onSubmit }: Props) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formElement = e.target as HTMLFormElement
    const isValid = formElement.checkValidity()

    formElement.classList.add("submitted")

    // focus no primeiro campo inválido
    const firstInvalidField = formElement.querySelector(":invalid") as HTMLInputElement

    firstInvalidField?.focus()

    // envia os dados se isValid === true
    if (isValid) {
      const dataObject = new FormData(formElement)
      onSubmit(dataObject)
    }

  }

  return (
    <form
      onSubmit={handleSubmit}
      id={id}
      noValidate
      className={className}
    >
      <div>{children}</div>
    </form>
  );
}

export default Form;