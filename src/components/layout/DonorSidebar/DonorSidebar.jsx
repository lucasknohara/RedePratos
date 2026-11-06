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

function DonorSidebar() {
  return (
    <aside className="donor-sidebar">

      <Link to="/" className="donor-logo">
        <img src="/icons/logo.svg" alt="logo" />
        <span>RedePratos</span>
      </Link>

      <div className="sidebar-label">
        ÁREA DO DOADOR
      </div>

      <nav className="donor-menu">

        <NavLink
          to="/inicio"
          end
          className={({ isActive }) =>
            isActive ? 'menu-item active' : 'menu-item'
          }
        >
          <LayoutDashboard size={19} />
          Visão geral
        </NavLink>

        <NavLink
          to="/inicio/alimentos"
          className={({ isActive }) =>
            isActive ? 'menu-item active' : 'menu-item'
          }
        >
          <Package size={19} />
          Minha despensa
        </NavLink>

        <NavLink
          to="/inicio/minhas-doacoes"
          className={({ isActive }) =>
            isActive ? 'menu-item active' : 'menu-item'
          }
        >
          <HeartHandshake size={19} />
          Minhas doações
        </NavLink>

        <NavLink
          to="/inicio/solicitacoes"
          className={({ isActive }) =>
            isActive ? 'menu-item active' : 'menu-item'
          }
        >
          <ClipboardList size={19} />
          Solicitações
        </NavLink>

        <Link to="/app#impacto" className="menu-item">
          <TrendingUp size={19} />
          Meu impacto
        </Link>

      </nav>

      <div className="sidebar-ajuda">
        <CircleHelp size={19} />

        <div>
          <strong>Precisa de ajuda?</strong>
          <small>Conheça como funciona.</small>
        </div>
      </div>

      <div className="sidebar-perfil">

        <div className="perfil-avatar">
          U
        </div>

        <div className="perfil-info">
          <strong>Usuário</strong>
          <small>Doador</small>
        </div>

        <MoreHorizontal size={20} />

      </div>

    </aside>
  )
}

export default DonorSidebar