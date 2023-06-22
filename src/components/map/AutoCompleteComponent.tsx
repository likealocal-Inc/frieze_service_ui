import usePlacesAutocomplete from "use-places-autocomplete";

export const AutoCompleteComponent = ({
  onAddressSelect,
}: {
  onAddressSelect?: (address: string) => void;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: "ko" } },
    debounce: 300,
    cache: 86400,
  });

  const renderSuggestions = () => {
    return data.map((suggestion: any) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
            const input = document.getElementById("googleMap");
            input!.style.display = "block";
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  return (
    <div className=''>
      <input
        value={value}
        className='px-4 py-2 mb-4 rounded-md w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100'
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder='검색어 입력'
      />
      {status === "OK" && (
        <ul className='text-slate-600'>{renderSuggestions()}</ul>
      )}
    </div>
  );
};
