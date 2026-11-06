import {
  Package,
  CalendarDays,
  Info,
  Leaf
} from 'lucide-react'

import './FoodForm.css'

function FoodForm() {
  return (
    <div className="food-form-layout">

      <form className="food-form">

        <div className="food-form-section">
          <h2>Informações do alimento</h2>
          <p>Preencha os dados para adicionar um novo alimento.</p>
        </div>

        <div className="food-field">
          <label htmlFor="nome">Nome do alimento</label>

          <input
            type="text"
            id="nome"
            placeholder="Ex: Arroz, Tomate, Leite..."
            required
          />
        </div>

        <div className="food-field">
          <label htmlFor="categoria">Categoria</label>

          <select id="categoria" required defaultValue="">
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

        <div className="food-field-row">

          <div className="food-field">
            <label htmlFor="quantidade">Quantidade</label>

            <input
              type="number"
              id="quantidade"
              min="0.01"
              step="0.01"
              placeholder="Ex: 5"
              required
            />
          </div>

          <div className="food-field">
            <label htmlFor="unidade">Unidade de medida</label>

            <select id="unidade" defaultValue="kg" required>
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

        <div className="food-field">
          <label htmlFor="validade">Data de validade</label>

          <div className="food-input-icon">
            <CalendarDays size={18} />

            <input
              type="date"
              id="validade"
              required
            />
          </div>

          <small>
            Informe a data indicada na embalagem ou a validade estimada
            quando aplicável.
          </small>
        </div>

        <div className="food-field">
          <label htmlFor="origem">Origem do alimento</label>

          <select id="origem" required defaultValue="">
            <option value="" disabled>
              Selecione a origem
            </option>
            <option value="residencia">Residência</option>
            <option value="comercio">Comércio</option>
          </select>

          <small>
            Essa informação identifica de onde veio o alimento,
            sem alterar seu perfil de usuário.
          </small>
        </div>

        <div className="food-field">
          <label htmlFor="observacoes">
            Observações <span>(opcional)</span>
          </label>

          <textarea
            id="observacoes"
            rows="3"
            placeholder="Adicione alguma informação sobre o alimento..."
          />
        </div>

        <div className="food-form-buttons">
          <button type="button" className="food-cancel-button" disabled>
            Cancelar
          </button>

          <button type="button" className="food-submit-button" disabled>
            Salvar alimento
          </button>
        </div>

        <p className="food-demo-note">
          Esta é uma prévia visual. O salvamento será conectado à API
          na etapa de desenvolvimento funcional.
        </p>

      </form>

      {/* INFORMAÇÕES LATERAIS */}
      <aside className="food-form-aside">

        <div className="food-preview-icon">
          <img src="/icons/tomate.svg" alt="Tomate" />
          <img src="/icons/arroz.svg" alt="Arroz" />
          <img src="/icons/leite.svg" alt="Leite" />
        </div>

        <Leaf size={25} />

        <h3>Cuide dos seus alimentos.</h3>

        <p>
          Manter sua despensa organizada ajuda a acompanhar as
          validades e evitar que alimentos sejam desperdiçados.
        </p>

        <div className="food-tip">
          <Info size={19} />

          <div>
            <strong>Uma dica importante</strong>
            <p>
              Confira as quantidades e as datas antes de cadastrar
              seus alimentos.
            </p>
          </div>
        </div>

        <div className="food-next-step">
          <Package size={20} />

          <div>
            <strong>E depois?</strong>
            <p>
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