const statusConfig = {
  disponivel: {
    nome: 'Disponível',
    classes: 'tw:bg-[#eaf2e8] tw:text-[#477b57]'
  },
  pendente: {
    nome: 'Aguardando resposta',
    classes: 'tw:bg-[#fff1d8] tw:text-[#a97930]'
  },
  reservada: {
    nome: 'Reserva confirmada',
    classes: 'tw:bg-[#e5f1e8] tw:text-[#438358]'
  },
  aceita: {
    nome: 'Reservada',
    classes: 'tw:bg-[#e5f1e8] tw:text-[#438358]'
  },
  encerrada: {
    nome: 'Encerrada',
    classes: 'tw:bg-[#eef0ed] tw:text-[#718076]'
  },
  recusada: {
    nome: 'Recusada',
    classes: 'tw:bg-[#f8e9e6] tw:text-[#b15e51]'
  },
  concluida: {
    nome: 'Concluída',
    classes: 'tw:bg-[#e5eee7] tw:text-[#376a47]'
  }
}

function StatusBadge({
  status,
  label,
  variant,
  size = 'default',
  icon: Icon,
  iconSize = 14
}) {
  const configuracao = statusConfig[status]

  if (!configuracao) {
    return null
  }

  const cores = {
    blue: 'tw:bg-[#e8f0f7] tw:text-[#49738e]',
    'institution-reserved': 'tw:bg-[#e3f2e6] tw:text-[#36734a]',
    'institution-rejected': 'tw:bg-[#fce9e7] tw:text-[#b65f57]'
  }

  const tamanhos = {
    default: 'tw:inline-block tw:px-[11px] tw:py-2 tw:text-[10px]',
    compact: 'tw:inline-block tw:px-[10px] tw:py-[7px] tw:text-[9px]',
    institution: 'tw:inline-flex tw:shrink-0 tw:items-center tw:gap-1.5 tw:px-3 tw:py-2 tw:text-[10px] tw:font-semibold'
  }

  return (
    <span
      className={`
        tw:w-fit tw:whitespace-nowrap tw:rounded-full
        ${cores[variant] || configuracao.classes}
        ${tamanhos[size] || tamanhos.default}
      `}
    >
      {Icon && <Icon size={iconSize} />}
      {label || configuracao.nome}
    </span>
  )
}

export default StatusBadge
