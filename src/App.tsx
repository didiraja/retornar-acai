import { useState, useId, useEffect } from "react";
import { fruits, sizes, toppings } from "./enums";
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

  const [order, setOrder] = useState(INITIAL_DATA);

  // useEffect(() => console.log(order), [order]);

  function assignIngredient(selection, key, item) {
    const isUnique = selection.toLowerCase() === "unique";

    setOrder((state) => {
      const updatedItem = {
        ...item,
        checked: !item.checked,
      };

      const ingredientBlock = isUnique ? INITIAL_DATA[key] : state[key];

      const updatedIngredient = ingredientBlock.map((item) => {
        if (item.label === updatedItem.label) return updatedItem;

        return item;
      });

      return {
        ...state,
        [key]: updatedIngredient,
      };
    });
  }

  function clearOrder() {
    setOrder(() => INITIAL_DATA);
  }

  function triggeredFromButton() {
    console.log(order);
  }

  return (
    <div className="App">
      <div className="order">
        <form id="order">
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
                        onClick={() =>
                          assignIngredient("unique", "sizes", size)
                        }
                      />
                    </div>
                  );
                })
              : null}
          </div>

          <div className="ingredient">
            <h2>Escolha seus toppings:</h2>

            {order.toppings
              ? order.toppings.map((topp, I) => {
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
        </form>

        <button onClick={clearOrder}>Limpar</button>
        <button onClick={triggeredFromButton}>Solicitar pedido</button>
      </div>
    </div>
  );
}

export default App;
