import { Link } from 'react-router-dom'
import { Bell, ArrowLeft } from 'lucide-react'

import DonorSidebar from '../../../components/layout/DonorSidebar/DonorSidebar.jsx'
import FoodForm from '../../../components/layout/foods/FoodForm.jsx'

function NewFood() {
  return (
    <div className="tw:flex tw:min-h-screen tw:bg-[#f7f6ef] tw:max-[760px]:flex-col">

      {/* MENU LATERAL */}
      <DonorSidebar />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="tw:min-w-0 tw:flex-1 tw:px-[45px] tw:pb-[35px] tw:max-[1100px]:px-[25px] tw:max-[1100px]:pb-[30px] tw:max-[760px]:px-[18px] tw:max-[760px]:pb-[25px]">

        {/* CABEÇALHO */}
        <header className="tw:flex tw:h-[75px] tw:items-center tw:justify-between tw:border-b tw:border-[#e8eae2]">

          <div className="tw:flex tw:items-center tw:gap-[10px] tw:text-[12px] tw:text-[#87938a] tw:max-[450px]:text-[10px]">
            <span>RedePratos</span>
            <span>/</span>

            <Link
              to="/doador/alimentos"
              className="tw:transition-colors tw:hover:text-[#124638]"
            >
              Minha despensa
            </Link>

            <span>/</span>

            <strong className="tw:text-[#315c43]">
              Cadastrar alimento
            </strong>
          </div>

          <button
            className="tw:grid tw:size-10 tw:shrink-0 tw:cursor-pointer tw:place-items-center tw:rounded-full tw:border tw:border-[#e8eae2] tw:bg-white tw:text-[#315c43]"
            aria-label="Notificações"
          >
            <Bell size={20} />
          </button>

        </header>

        {/* PÁGINA */}
        <div className="tw:pt-[30px] tw:pb-10">

          {/* VOLTAR */}
          <Link
            to="/doador/alimentos"
            className="tw:mb-[25px] tw:inline-flex tw:items-center tw:gap-2 tw:text-[12px] tw:text-[#688371] tw:transition-colors tw:hover:text-[#124638]"
          >
            <ArrowLeft size={17} />
            Voltar para minha despensa
          </Link>

          {/* TÍTULO */}
          <section className="tw:mb-7">

            <div>
              <span className="tw:text-[10px] tw:font-bold tw:tracking-[1px] tw:text-[#689171]">
                ORGANIZE SUA DESPENSA
              </span>

              <h1 className="tw:my-[9px] tw:text-[29px] tw:font-bold tw:tracking-[-0.7px] tw:text-[#124638]">
                Cadastrar alimento
              </h1>

              <p className="tw:text-[13px] tw:text-[#78847b]">
                Adicione um alimento para acompanhar sua quantidade
                e validade.
              </p>
            </div>

          </section>

          {/* FORMULÁRIO */}
          <FoodForm />

        </div>

      </main>

    </div>
  )
}

export default NewFood
