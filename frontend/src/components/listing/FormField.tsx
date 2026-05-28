import type { FieldErrors, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  children?: React.ReactNode;
  errors: FieldErrors<T>;
}

const FormField = <T extends FieldValues>({
  label,
  name,
  children,
  errors,
}: FormFieldProps<T>) => {
  const error = errors[name];

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-bold tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{String(error.message)}</p>}
    </div>
  );
};
export default FormField;
