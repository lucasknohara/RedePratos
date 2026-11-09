function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = 'tw:text-[#528463]'
}) {
  return (
    <article className="tw:rounded-xl tw:border tw:border-[#e9ebe4] tw:bg-white tw:p-5 tw:max-[760px]:p-4">

      <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:text-[12px] tw:text-[#748278]">

        <span>{title}</span>

        {Icon && (
          <Icon size={21} className={iconColor} />
        )}

      </div>

      <strong className="tw:mt-[15px] tw:mb-[5px] tw:block tw:text-[29px] tw:font-bold tw:text-[#244d39]">
        {value}
      </strong>

      <small className="tw:text-[10px] tw:text-[#8c978e]">
        {description}
      </small>

    </article>
  )
}

export default StatCard
