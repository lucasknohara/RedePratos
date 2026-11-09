function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default',
  iconSize
}) {
  const isDonor = variant === 'donor'
  const tamanhoIcone = iconSize ?? (isDonor ? 34 : 26)

  return (
    <div
      className={
        isDonor
          ? 'tw:flex tw:flex-col tw:items-center tw:gap-[10px] tw:px-[15px] tw:py-[45px] tw:text-center tw:text-[#829186]'
          : 'tw:flex tw:flex-col tw:items-center tw:rounded-xl tw:border tw:border-dashed tw:border-[#dce3d9] tw:bg-white tw:px-5 tw:py-12 tw:text-center'
      }
    >

      {isDonor ? (
        Icon && <Icon size={tamanhoIcone} />
      ) : (
        <div className="tw:mb-4 tw:grid tw:size-[58px] tw:place-items-center tw:rounded-full tw:bg-[#edf2e9] tw:text-[#528463]">
          {Icon && <Icon size={tamanhoIcone} />}
        </div>
      )}

      <h3
        className={
          isDonor
            ? 'tw:text-[14px] tw:text-[#345742]'
            : 'tw:text-[15px] tw:font-bold tw:text-[#315c43]'
        }
      >
        {title}
      </h3>

      <p
        className={
          isDonor
            ? 'tw:text-[12px] tw:text-[#929b93]'
            : 'tw:mt-2 tw:max-w-[350px] tw:text-[11px] tw:leading-[1.6] tw:text-[#929b93]'
        }
      >
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="tw:mt-4 tw:cursor-pointer tw:rounded-full tw:border-0 tw:bg-[#eaf2e8] tw:px-4 tw:py-2.5 tw:text-[11px] tw:font-semibold tw:text-[#477b57] hover:tw:bg-[#dcebd9]"
        >
          {actionLabel}
        </button>
      )}

    </div>
  )
}

export default EmptyState
