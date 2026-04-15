import {
  useForm,
  type SubmitHandler,
  type UseFormRegister,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import { useCategories } from "../../hooks/useCategories";
import { Loading, ErrorComponent } from "../../components";
import type { ListingSearchParams } from "../../types/listing";

type InputFilterProps = {
  labelText: string;
  inputType: string;
  id: Path<ListingSearchParams>;
  register: UseFormRegister<ListingSearchParams>;
};

type SelectFilterProps<T> = {
  id: Path<ListingSearchParams>;
  defaultValue?: string;
  hiddenOptionValue?: string;
  hiddenOptionText?: string;
  options: T[];
  getOptionValue: (item: T) => string | number;
  getOptionLabel: (item: T) => string;
  register: UseFormRegister<ListingSearchParams>;
  registerOptions?: RegisterOptions<ListingSearchParams>;
};

const InputFilter = ({
  labelText,
  inputType = "text",
  id,
  register,
}: InputFilterProps) => {
  return (
    <div className="border border-gray-200 p-2 rounded-md">
      <label htmlFor={id} className="text-gray-400">
        {labelText}
      </label>
      <input
        type={inputType}
        id={id}
        {...register(id, { valueAsNumber: inputType === "number" })}
      />
    </div>
  );
};

const SelectFilter = <T,>({
  id,
  defaultValue = "",
  hiddenOptionValue,
  hiddenOptionText,
  options,
  getOptionLabel,
  getOptionValue,
  register,
  registerOptions,
}: SelectFilterProps<T>) => {
  return (
    <select
      id={id}
      defaultValue={defaultValue}
      className="border border-gray-200 p-2 rounded-md"
      {...register(id, registerOptions)}
    >
      {hiddenOptionText && (
        <option value={hiddenOptionValue} disabled hidden>
          {hiddenOptionText}
        </option>
      )}
      {options?.map((item) => {
        return (
          <option key={getOptionValue(item)} value={getOptionValue(item)}>
            {getOptionLabel(item)}
          </option>
        );
      })}
    </select>
  );
};

type SearchFiltersProps = {
  onSearch: (params: Partial<ListingSearchParams>) => void;
  initialParams?: ListingSearchParams;
};

const SearchFilters = ({ onSearch, initialParams }: SearchFiltersProps) => {
  const { categories, error, isLoading } = useCategories(true);

  const { register, handleSubmit, reset } = useForm<ListingSearchParams>({
    defaultValues: initialParams,
  });

  const onSubmit: SubmitHandler<ListingSearchParams> = (data) => {
    onSearch(data);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <section>
      <form
        className="p-3 border border-gray-200 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputFilter
          labelText="Szukaj ogłoszeń"
          inputType="text"
          id="title"
          register={register}
        />
        <SelectFilter
          id="categoryId"
          options={categories}
          getOptionValue={(cat) => cat.id}
          getOptionLabel={(cat) => cat.name}
          hiddenOptionText="Wszystkie kategorie"
          hiddenOptionValue=""
          register={register}
          registerOptions={{ valueAsNumber: true }}
        />
        <InputFilter
          labelText="Lokalizacja"
          inputType="text"
          id="location"
          register={register}
        />
        <InputFilter
          labelText="Cena od"
          inputType="number"
          id="minPrice"
          register={register}
        />
        <InputFilter
          labelText="Cena do"
          inputType="number"
          id="maxPrice"
          register={register}
        />
        <SelectFilter
          id="sort"
          options={[
            { value: "createdAt,desc", label: "Najnowsze" },
            { value: "createdAt,asc", label: "Najstarsze" },
            { value: "price,asc", label: "Cena rosnąco" },
            { value: "price,desc", label: "Cena malejąco" },
          ]}
          getOptionValue={(opt) => opt.value}
          getOptionLabel={(opt) => opt.label}
          register={register}
        />
        <button type="submit">Szukaj</button>
        <button
          type="button"
          onClick={() => {
            reset();
            onSearch({});
          }}
        >
          Wyczyść
        </button>
      </form>
    </section>
  );
};
export default SearchFilters;
