
import {
  LayoutDashboard,
  Package,
  HeartHandshake,
  ClipboardList,
  TrendingUp,
  CircleHelp,
  MoreHorizontal
} from 'lucide-react'

import { NavLink, Link } from 'react-router-dom'

const menuItemClass = ({ isActive }) => {
  const base = `
    tw:flex tw:items-center tw:gap-[13px]
    tw:rounded-[9px] tw:px-3 tw:py-[13px]
    tw:text-[13px] tw:transition-colors tw:duration-200
    tw:max-[760px]:shrink-0
    tw:max-[760px]:whitespace-nowrap
    tw:max-[760px]:p-[10px]
  `

  const active = `
    tw:bg-[#eaf2e8] tw:font-bold tw:text-[#124638]
  `

  const inactive = `
    tw:text-[#69776e]
    tw:hover:bg-[#f0f4ed]
    tw:hover:text-[#124638]
  `

  return `${base} ${isActive ? active : inactive}`
}

function DonorSidebar() {
  return (
    <aside className="
      tw:flex tw:min-h-screen tw:w-[255px] tw:shrink-0
      tw:flex-col tw:border-r tw:border-[#e8eae2]
      tw:bg-white tw:px-5 tw:py-[30px]
      tw:max-[760px]:min-h-0
      tw:max-[760px]:w-full
      tw:max-[760px]:p-[18px]
    ">

      {/* LOGO */}
      <Link
        to="/"
        className="tw:flex tw:items-center tw:gap-[9px] tw:px-2 tw:text-[21px] tw:font-bold tw:text-[#124638]"
      >
        <img
          src="/icons/logo.svg"
          alt="RedePratos"
          className="tw:size-[29px] tw:object-contain"
        />

        <span>RedePratos</span>
      </Link>

      {/* IDENTIFICAÇÃO DO MENU */}
      <div className="
        tw:mt-12 tw:mb-[15px] tw:mx-2
        tw:text-[10px] tw:font-bold
        tw:tracking-[1px] tw:text-[#98a39b]
        tw:max-[760px]:hidden
      ">
        ÁREA DO DOADOR
      </div>

      {/* NAVEGAÇÃO */}
      <nav className="
        tw:flex tw:flex-col tw:gap-[7px]
        tw:max-[760px]:mt-[18px]
        tw:max-[760px]:flex-row
        tw:max-[760px]:overflow-x-auto
        tw:max-[760px]:pb-[5px]
      ">

        <NavLink
          to="/inicio"
          end
          className={menuItemClass}
        >
          <LayoutDashboard size={19} />
          Visão geral
        </NavLink>

        <NavLink
          to="/inicio/alimentos"
          className={menuItemClass}
        >
          <Package size={19} />
          Minha despensa
        </NavLink>

        <NavLink
          to="/inicio/minhas-doacoes"
          className={menuItemClass}
        >
          <HeartHandshake size={19} />
          Minhas doações
        </NavLink>

        <NavLink
          to="/inicio/solicitacoes"
          className={menuItemClass}
        >
          <ClipboardList size={19} />
          Solicitações
        </NavLink>

        <NavLink
          to="/inicio/meu-impacto"
          className={menuItemClass}
        >
          <TrendingUp size={19} />
          Meu impacto
        </NavLink>

      </nav>

      {/* AJUDA */}
      <div className="
        tw:mt-auto tw:flex tw:items-center tw:gap-3
        tw:rounded-[10px] tw:bg-[#f2f5ee]
        tw:px-[10px] tw:py-[14px] tw:text-[#477254]
        tw:max-[760px]:hidden
      ">

        <CircleHelp size={19} />

        <div>
          <strong className="tw:block tw:text-[12px]">
            Precisa de ajuda?
          </strong>

          <small className="tw:mt-1 tw:block tw:text-[10px] tw:text-[#7a887e]">
            Conheça como funciona.
          </small>
        </div>

      </div>

      {/* PERFIL */}
      <div className="
        tw:mt-6 tw:flex tw:items-center tw:gap-[10px]
        tw:border-t tw:border-[#eeeeea]
        tw:pt-5 tw:text-[#758279]
        tw:max-[760px]:hidden
      ">

        <div className="
          tw:grid tw:size-9 tw:place-items-center
          tw:rounded-full tw:bg-[#e5eee2]
          tw:font-bold tw:text-[#124638]
        ">
          U
        </div>

        <div className="tw:flex-1">
          <strong className="tw:block tw:text-[12px] tw:text-[#263d32]">
            Usuário
          </strong>

          <small className="tw:mt-[3px] tw:block tw:text-[10px]">
            Doador
          </small>
        </div>

        <MoreHorizontal size={20} />

      </div>

    </aside>
  )
}

export default DonorSidebar
