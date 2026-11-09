import { Bell } from 'lucide-react'

function PageHeader({ currentPage }) {
  return (
    <header className="tw:flex tw:h-[75px] tw:items-center tw:justify-between tw:border-b tw:border-[#e8eae2]">

      {/* CAMINHO DA PÁGINA */}
      <div className="tw:flex tw:items-center tw:gap-[10px] tw:text-[12px] tw:text-[#87938a] tw:max-[450px]:text-[10px]">

        <span>RedePratos</span>
        <span>/</span>

        <strong className="tw:text-[#315c43]">
          {currentPage}
        </strong>

      </div>

      {/* NOTIFICAÇÕES */}
      <button
        type="button"
        className="tw:relative tw:grid tw:size-10 tw:cursor-pointer tw:place-items-center tw:rounded-full tw:border tw:border-[#e8eae2] tw:bg-white tw:text-[#315c43]"
        aria-label="Notificações"
      >
        <Bell size={20} />

        <span className="tw:absolute tw:top-2 tw:right-[9px] tw:size-[7px] tw:rounded-full tw:bg-[#d78b42]" />
      </button>

    </header>
  )
}

export default PageHeader
