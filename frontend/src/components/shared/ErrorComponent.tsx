interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div>
      <p className="text-2xl font-bold">{message}</p>
    </div>
  );
};
export default Error;
