import { useState, useId, useEffect } from "react";
import { fruits, sizes, toppings } from "./enums";
import "./App.scss";

function App() {
  const [toppingsList, setToppingsList] = useState(
    toppings.map((item) => {
      return {
        candy: item,
        checked: false,
      };
    })
  );
  const [order, setOrder] = useState({
    fruit: "",
    size: "",
    toppings: toppingsList,
  });

  // useEffect(() => console.log(order), [order]);
  useEffect(
    () =>
      setOrder((state) => {
        return { ...state, toppings: toppingsList };
      }),
    [toppingsList]
  );

  // const formRef = useRef(null);

  function assignFruits(fruit) {
    setOrder((state) => {
      return { ...state, fruit };
    });
  }

  function assignSize(item) {
    setOrder((state) => {
      return { ...state, size: item.size };
    });
  }

  function assignToppings(evt, topping) {
    const updatedTopping = toppingsList.map((item) => {
      if (item.candy === topping.candy) {
        return { ...topping, checked: evt.target.checked };
      }

      return item;
    });

    setToppingsList(() => updatedTopping);
  }

  function clearOrder() {
    const updatedTopping = toppingsList.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });

    setOrder((state) => {
      return {
        ...state,
        fruit: "",
        size: "",
      };
    });
    setToppingsList(() => updatedTopping);
  }

  function triggeredFromButton() {
    console.log(order);
  }

  return (
    <div className="App">
      <div className="order">
        <form id="order" /* ref={formRef} */>
          <div className="ingredient">
            <h2>Qual fruta você deseja no açaí?</h2>
            {fruits
              ? fruits.map((item) => {
                  return (
                    <div key={useId()}>
                      <label htmlFor="fruits">{item}</label>
                      <input
                        type="radio"
                        name="fruits"
                        readOnly
                        checked={order.fruit === item}
                        onClick={() => assignFruits(item)}
                      />
                    </div>
                  );
                })
              : null}
          </div>

          <div className="ingredient">
            <h2>Qual tamanho você deseja?</h2>
            {sizes
              ? sizes.map((item) => {
                  return (
                    <div key={useId()}>
                      <label>{`${item.label} (${item.size}ml)`}</label>
                      <input
                        type="radio"
                        name="size"
                        readOnly
                        checked={order.size === item.size}
                        onClick={() => assignSize(item)}
                      />
                    </div>
                  );
                })
              : null}
          </div>

          <div className="ingredient">
            <h2>Escolha seus toppings:</h2>

            {toppingsList
              ? toppingsList.map((topping) => {
                  return (
                    <div key={useId()}>
                      <label htmlFor="toppings">{topping.candy}</label>
                      <input
                        type="checkbox"
                        name="toppings"
                        checked={topping.checked}
                        onChange={(evt) => assignToppings(evt, topping)}
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
