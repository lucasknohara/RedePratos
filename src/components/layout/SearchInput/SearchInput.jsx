import { Search, X } from 'lucide-react'

function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
  onClear
}) {
  return (
    <div className="tw:flex tw:min-w-0 tw:items-center tw:gap-3 tw:rounded-xl tw:border tw:border-[#DDE3D9] tw:bg-white tw:px-4 tw:py-3 focus-within:tw:border-[#52745B]">

      <Search size={19} className="tw:shrink-0 tw:text-[#829083]" />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="tw:w-full tw:min-w-0 tw:border-0 tw:bg-transparent tw:text-sm tw:text-[#35483A] tw:outline-none tw:ring-0 placeholder:tw:text-[#A5ADA4]"
        aria-label={ariaLabel}
      />

      {onClear && value && (
        <button
          type="button"
          onClick={onClear}
          className="tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:appearance-none tw:border-0 tw:bg-transparent tw:p-1 tw:shadow-none tw:outline-none tw:rounded-full tw:text-[#829083] tw:transition-colors tw:hover:bg-[#f0f4ef] tw:hover:text-[#315c43]"
          aria-label="Limpar busca"
        >
          <X size={17} />
        </button>
      )}

    </div>
  )
}

export default SearchInput
