import "./form.scss";
import { Player } from "@prisma/client";
import { Form } from "antd";
import { DescriptionInput, FormInput } from "../../components/form-input";
import { ErrorMessage } from "../error/error";
import { useState } from "react";

type PlayerAddFormProps<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  error?: string;
  player?: T;
};

export default function PlayerForm({
  onFinish,
  btnText,
  error,
  player,
}: PlayerAddFormProps<Player>) {
  const [image, setImage] = useState("");

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
    console.log(image);
  };

  return (
    <div className="player-form">
      <Form name="player-form" onFinish={onFinish} initialValues={player}>
        <div className="player-form__wrapper">
          <div className="player-form__section">
            <FormInput type="text" name="firstName" placeholder="First Name" />
            <FormInput
              type="text"
              name="lastName"
              placeholder="Last Name"
              required={false}
            />
            <FormInput
              type="text"
              name="race"
              placeholder="Race"
              required={false}
            />
            <FormInput
              type="text"
              name="class"
              placeholder="Class"
              required={false}
            />
            <DescriptionInput name="description" placeholder="Description" />
            <button className="player-form__button" type="submit">
              {btnText}
            </button>
          </div>

          <div className="player-form__section">
            <FormInput
              type="text"
              name="image"
              placeholder="image url"
              required={false}
              func={handleInputImage}
            />
            <div className="player-form__image-placeholder">
              <img className="player-form__image" src={image} alt="No image" />
            </div>
          </div>

          <ErrorMessage message={error} />
        </div>
      </Form>
    </div>
  );
}
