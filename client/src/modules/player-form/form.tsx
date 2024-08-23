import "./form.scss";
import { Player } from "@prisma/client";
import { Form } from "antd";
import { FormInput } from "../../components/form-input";
import { ErrorMessage } from "../error/error";

type PlayerAddFormProps<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  player?: T;
};

export default function PlayerForm({
  onFinish,
  title,
  btnText,
  error,
  player,
}: PlayerAddFormProps<Player>) {
  return (
    <div className="player-form">
      <h1 className="player-form__title">{title}</h1>
      <div className="player-form__wrapper">
        <Form name="player-form" onFinish={onFinish} initialValues={player}>
          <FormInput type="text" name="firstName" placeholder="First Name" />
          <FormInput
            type="text"
            name="lastName"
            placeholder="Last Name (optional)"
            required={false}
          />
          <FormInput
            type="text"
            name="race"
            placeholder="Race (optional)"
            required={false}
          />
          <FormInput
            type="text"
            name="class"
            placeholder="Class (optional)"
            required={false}
          />
          <FormInput
            type="text"
            name="description"
            placeholder="Description (optional)"
            required={false}
          />
          <FormInput
            type="text"
            name="image"
            placeholder="image url (optional)"
            required={false}
          />
          <ErrorMessage message={error} />
          <button className="player-form__button" type="submit">
            {btnText}
          </button>
        </Form>
      </div>
    </div>
  );
}
