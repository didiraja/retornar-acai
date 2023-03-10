import { useState, useId, useEffect } from "react";
import { fruits, ISizes, sizes, toppings } from "./enums";
import "./App.scss";

function App() {
  const INITIAL_DATA = {
    fruits: fruits.map((fruit) => {
      return { label: fruit, checked: false };
    }),
    sizes: sizes.map((size) => {
      return { ...size, checked: false };
    }),
    toppings: toppings.map((candy) => {
      return {
        label: candy,
        checked: false,
      };
    }),
  };

  const [settings, setSettings] = useState({
    showModal: true,
  });
  const [order, setOrder] = useState(INITIAL_DATA);
  const [selected, setSelected] = useState(null);

  function assignIngredient(selection, key, item) {
    const isUnique = selection.toLowerCase() === "unique";

    const updatedItem = {
      ...item,
      checked: !item.checked,
    };

    if (isUnique) {
      setSelected((state) => {
        return {
          ...state,
          [key]: updatedItem,
        };
      });
    }

    const ingredientBlock = isUnique ? INITIAL_DATA[key] : order[key];

    const updatedIngredient = ingredientBlock.map((item) => {
      if (item.label === updatedItem.label) return updatedItem;

      return item;
    });

    setOrder((state) => {
      return {
        ...state,
        [key]: updatedIngredient,
      };
    });
  }

  function clearOrder() {
    setOrder(() => INITIAL_DATA);
  }

  function finishOrder() {
    // console.log(order);
    // setSettings(({ showModal }) => {
    //   return { showModal: !showModal };
    // });
  }
  return (
    <div className="App">
      <div className="order">
        <div className="ingredient">
          <h2>Qual fruta você deseja no açaí?</h2>
          {order.fruits
            ? order.fruits.map((fruit, i) => {
                return (
                  <div key={useId()}>
                    <label htmlFor="fruits">{fruit.label}</label>
                    <input
                      type="radio"
                      name="fruits"
                      readOnly
                      checked={fruit.checked}
                      onClick={() =>
                        assignIngredient("unique", "fruits", fruit)
                      }
                    />
                  </div>
                );
              })
            : null}
        </div>

        <div className="ingredient">
          <h2>Qual tamanho você deseja?</h2>
          {order.sizes
            ? order.sizes.map((size, i) => {
                return (
                  <div key={useId()}>
                    <label>{`${size.label} (${size.size}ml)`}</label>
                    <input
                      type="radio"
                      name="size"
                      readOnly
                      checked={size.checked}
                      onClick={() => assignIngredient("unique", "sizes", size)}
                    />
                  </div>
                );
              })
            : null}
        </div>

        <div className="ingredient">
          <h2>Escolha seus toppings:</h2>

          {order.toppings
            ? order.toppings.map((topp) => {
                return (
                  <div key={useId()}>
                    <label htmlFor="toppings">{topp.label}</label>
                    <input
                      type="checkbox"
                      name="toppings"
                      checked={topp.checked}
                      onChange={() =>
                        assignIngredient("multi", "toppings", topp)
                      }
                    />
                  </div>
                );
              })
            : null}
        </div>

        <button onClick={clearOrder}>Limpar</button>
        <button onClick={finishOrder}>Solicitar pedido</button>
      </div>

      {settings.showModal ? (
        <div className="receipt">
          <h2>Obrigado!</h2>

          <p>Seu pedido está sendo preparado e já já, sai para entrega!</p>

          <h3>Preço</h3>
          {selected?.sizes ? (
            <p>
              <strong>$ {selected.sizes.price}</strong>
            </p>
          ) : null}

          <h3>Entrega:</h3>

          {selected?.sizes ? (
            <p>
              Chega em <strong>{`${selected.sizes.delivery} minutos`}</strong>
            </p>
          ) : null}

          <h3>Detalhes do pedido:</h3>
          <ul>
            {selected?.fruits ? (
              <li>
                <strong>Fruta:</strong> <p>{selected.fruits.label}</p>
              </li>
            ) : null}

            {selected?.sizes ? (
              <li>
                <strong>Tamanho:</strong> <p>{selected.sizes.size}ml</p>
              </li>
            ) : null}

            <strong>Toppings:</strong>
            {order.toppings?.map((topp) => {
              if (topp.checked)
                return (
                  <li key={useId()}>
                    <p>{topp.label}</p>
                  </li>
                );

              return <li key={useId()}></li>;
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default App;
