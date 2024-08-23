import "./error.scss";

type ErrorProps = {
  message?: string;
};

export function ErrorMessage({ message }: ErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="error">
      <p className="error__message">{message}</p>
    </div>
  )
}
