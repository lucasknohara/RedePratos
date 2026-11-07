
import {
  Package,
  CalendarDays,
  Info
} from 'lucide-react'

function FoodForm() {
  return (
    <div className="
      tw:grid tw:grid-cols-[1.5fr_0.8fr]
      tw:items-start tw:gap-[22px]
      tw:max-[900px]:grid-cols-1
    ">

      {/* FORMULÁRIO */}
      <form className="
        tw:rounded-xl tw:border tw:border-[#e9ebe4]
        tw:bg-white tw:p-7
        tw:max-[500px]:p-[18px]
      ">

        <div className="tw:mb-[27px]">
          <h2 className="tw:text-[17px] tw:font-bold tw:text-[#244d39]">
            Informações do alimento
          </h2>

          <p className="tw:mt-[7px] tw:text-[12px] tw:text-[#929b93]">
            Preencha os dados para adicionar um novo alimento.
          </p>
        </div>

        {/* NOME */}
        <div className="tw:mb-[21px] tw:flex tw:flex-col tw:gap-[9px]">

          <label
            htmlFor="nome"
            className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]"
          >
            Nome do alimento *
          </label>

          <input
            type="text"
            id="nome"
            placeholder="Ex: Arroz, Tomate, Leite..."
            required
            className="
              tw:h-11 tw:w-full tw:rounded-lg
              tw:border tw:border-[#e3e8e0]
              tw:bg-white tw:px-3
              tw:font-[Arial,sans-serif] tw:text-[12px]
              tw:text-[#344a3c] tw:outline-none
              tw:transition-colors
              tw:placeholder:text-[#a4ada5]
              tw:focus:border-[#4aaa70]
            "
          />

        </div>

        {/* CATEGORIA */}
        <div className="tw:mb-[21px] tw:flex tw:flex-col tw:gap-[9px]">

          <label
            htmlFor="categoria"
            className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]"
          >
            Categoria
          </label>

          <select
            id="categoria"
            required
            defaultValue=""
            className="
              tw:h-11 tw:w-full tw:rounded-lg
              tw:border tw:border-[#e3e8e0]
              tw:bg-white tw:px-3
              tw:font-[Arial,sans-serif] tw:text-[12px]
              tw:text-[#344a3c] tw:outline-none
              tw:transition-colors
              tw:focus:border-[#4aaa70]
            "
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            <option value="hortifruti">Hortifruti</option>
            <option value="frutas">Frutas</option>
            <option value="graos">Grãos</option>
            <option value="laticinios">Laticínios</option>
            <option value="proteinas">Proteínas</option>
            <option value="enlatados">Enlatados</option>
            <option value="massas">Massas</option>
            <option value="outros">Outros</option>
          </select>

        </div>

        {/* QUANTIDADE E UNIDADE */}
        <div className="
          tw:grid tw:grid-cols-2 tw:gap-[15px]
          tw:max-[500px]:grid-cols-1
          tw:max-[500px]:gap-0
        ">

          <div className="tw:mb-[21px] tw:flex tw:flex-col tw:gap-[9px]">

            <label
              htmlFor="quantidade"
              className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]"
            >
              Quantidade *
            </label>

            <input
              type="number"
              id="quantidade"
              min="0.01"
              step="0.01"
              placeholder="Ex: 5"
              required
              className="
                tw:h-11 tw:w-full tw:rounded-lg
                tw:border tw:border-[#e3e8e0]
                tw:bg-white tw:px-3
                tw:font-[Arial,sans-serif] tw:text-[12px]
                tw:text-[#344a3c] tw:outline-none
                tw:transition-colors
                tw:placeholder:text-[#a4ada5]
                tw:focus:border-[#4aaa70]
              "
            />

          </div>

          <div className="tw:mb-[21px] tw:flex tw:flex-col tw:gap-[9px]">

            <label
              htmlFor="unidade"
              className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]"
            >
              Unidade de medida *
            </label>

            <select
              id="unidade"
              defaultValue="kg"
              required
              className="
                tw:h-11 tw:w-full tw:rounded-lg
                tw:border tw:border-[#e3e8e0]
                tw:bg-white tw:px-3
                tw:font-[Arial,sans-serif] tw:text-[12px]
                tw:text-[#344a3c] tw:outline-none
                tw:transition-colors
                tw:focus:border-[#4aaa70]
              "
            >
              <option value="kg">Quilograma (kg)</option>
              <option value="g">Grama (g)</option>
              <option value="unidade">Unidade</option>
              <option value="litro">Litro (L)</option>
              <option value="ml">Mililitro (ml)</option>
              <option value="pacote">Pacote</option>
              <option value="caixa">Caixa</option>
            </select>

          </div>

        </div>

        {/* VALIDADE */}
        <div className="tw:mb-[21px] tw:flex tw:flex-col tw:gap-[9px]">

          <label
            htmlFor="validade"
            className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]"
          >
            Data de validade *
          </label>

          <div className="tw:relative">

            <CalendarDays
              size={18}
              className="
                tw:pointer-events-none
                tw:absolute tw:top-1/2 tw:left-3
                tw:-translate-y-1/2
                tw:text-[#78917d]
              "
            />

            <input
              type="date"
              id="validade"
              required
              className="
                tw:h-11 tw:w-full tw:rounded-lg
                tw:border tw:border-[#e3e8e0]
                tw:bg-white tw:py-3 tw:pr-3 tw:pl-10
                tw:font-[Arial,sans-serif] tw:text-[12px]
                tw:text-[#344a3c] tw:outline-none
                tw:transition-colors
                tw:focus:border-[#4aaa70]
              "
            />

          </div>

          <small className="tw:text-[10px] tw:leading-[1.5] tw:text-[#929b93]">
            Informe a data indicada na embalagem ou a validade estimada
            quando aplicável.
          </small>

        </div>

        {/* ORIGEM */}
        <div className="tw:mb-[21px] tw:flex tw:flex-col tw:gap-[9px]">

          <label
            htmlFor="origem"
            className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]"
          >
            Origem do alimento
          </label>

          <select
            id="origem"
            required
            defaultValue=""
            className="
              tw:h-11 tw:w-full tw:rounded-lg
              tw:border tw:border-[#e3e8e0]
              tw:bg-white tw:px-3
              tw:font-[Arial,sans-serif] tw:text-[12px]
              tw:text-[#344a3c] tw:outline-none
              tw:transition-colors
              tw:focus:border-[#4aaa70]
            "
          >
            <option value="" disabled>
              Selecione a origem
            </option>
            <option value="residencia">Residência</option>
            <option value="comercio">Comércio</option>
          </select>

          <small className="tw:text-[10px] tw:leading-[1.5] tw:text-[#929b93]">
            Essa informação identifica de onde veio o alimento,
            sem alterar seu perfil de usuário.
          </small>

        </div>

        {/* OBSERVAÇÕES */}
        <div className="tw:mb-[21px] tw:flex tw:flex-col tw:gap-[9px]">

          <label
            htmlFor="observacoes"
            className="tw:text-[12px] tw:font-bold tw:text-[#344a3c]"
          >
            Observações <span className="tw:font-normal tw:text-[#929b93]">(opcional)</span>
          </label>

          <textarea
            id="observacoes"
            rows="3"
            placeholder="Adicione alguma informação sobre o alimento..."
            className="
              tw:w-full tw:resize-y tw:rounded-lg
              tw:border tw:border-[#e3e8e0]
              tw:bg-white tw:p-3
              tw:font-[Arial,sans-serif] tw:text-[12px]
              tw:leading-[1.5] tw:text-[#344a3c]
              tw:outline-none tw:transition-colors
              tw:placeholder:text-[#a4ada5]
              tw:focus:border-[#4aaa70]
            "
          />

        </div>

        {/* BOTÕES */}
        <div className="
          tw:flex tw:justify-end tw:gap-3
          tw:border-t tw:border-[#edf0e9]
          tw:pt-[15px]
          tw:max-[500px]:flex-col-reverse
        ">

          <button
            type="button"
            className="
              tw:cursor-not-allowed tw:rounded-lg
              tw:bg-[#edf0ea] tw:px-5 tw:py-[13px]
              tw:text-[12px] tw:font-bold
              tw:text-[#597064] tw:opacity-[0.65]
              tw:max-[500px]:w-full
            "
            disabled
          >
            Cancelar
          </button>

          <button
            type="button"
            className="
              tw:cursor-not-allowed tw:rounded-lg
              tw:bg-[#124638] tw:px-5 tw:py-[13px]
              tw:text-[12px] tw:font-bold
              tw:text-white tw:opacity-[0.65]
              tw:max-[500px]:w-full
            "
            disabled
          >
            Salvar alimento
          </button>

        </div>

        <p className="tw:mt-[15px] tw:text-right tw:text-[10px] tw:leading-[1.5] tw:text-[#a0aaa2]">
          Todos os campos com * são obrigatórios.
        </p>

      </form>

      {/* INFORMAÇÕES LATERAIS */}
      <aside className="
        tw:rounded-xl tw:bg-[#eaf1e7]
        tw:p-[27px] tw:text-[#315c43]
        tw:max-[900px]:order-[-1]
      ">

        <div className="
          tw:mb-[30px] tw:flex tw:items-center
          tw:justify-around tw:rounded-[10px]
          tw:bg-[rgba(255,255,255,0.6)]
          tw:p-[17px]
          tw:max-[900px]:mb-5
        ">

          <img
            src="/icons/tomate.svg"
            alt="Tomate"
            className="tw:size-[43px] tw:object-contain"
          />

          <img
            src="/icons/arroz.svg"
            alt="Arroz"
            className="tw:size-[43px] tw:object-contain"
          />

          <img
            src="/icons/leite.svg"
            alt="Leite"
            className="tw:size-[43px] tw:object-contain"
          />

        </div>

        <h3 className="tw:mt-[15px] tw:mb-3 tw:text-[20px] tw:font-bold">
          Cuide dos seus alimentos.
        </h3>

        <p className="tw:text-[12px] tw:leading-[1.7] tw:text-[#718278]">
          Manter sua despensa organizada ajuda a acompanhar as
          validades e evitar que alimentos sejam desperdiçados.
        </p>

        {/* DICA */}
        <div className="
          tw:mt-[23px] tw:flex tw:gap-3
          tw:rounded-[9px]
          tw:bg-[rgba(255,255,255,0.65)]
          tw:p-[15px]
        ">

          <Info size={19} className="tw:shrink-0 tw:text-[#4b8560]" />

          <div>
            <strong className="tw:mb-[6px] tw:block tw:text-[12px]">
              Uma dica importante
            </strong>

            <p className="tw:text-[11px] tw:leading-[1.6] tw:text-[#718278]">
              Confira as quantidades e as datas antes de cadastrar
              seus alimentos.
            </p>
          </div>

        </div>

        {/* PRÓXIMA ETAPA */}
        <div className="
          tw:mt-[23px] tw:flex tw:gap-3
          tw:rounded-[9px]
          tw:bg-[rgba(255,255,255,0.65)]
          tw:p-[15px]
        ">

          <Package size={20} className="tw:shrink-0 tw:text-[#4b8560]" />

          <div>
            <strong className="tw:mb-[6px] tw:block tw:text-[12px]">
              E depois?
            </strong>

            <p className="tw:text-[11px] tw:leading-[1.6] tw:text-[#718278]">
              O alimento ficará na sua despensa. Você poderá
              disponibilizá-lo para doação quando desejar.
            </p>
          </div>

        </div>

      </aside>

    </div>
  )
}

export default FoodForm
