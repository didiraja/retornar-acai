import { useState, useId, useEffect } from "react";
import { fruits, ISize, sizes, toppings } from "./enums";
import "./App.scss";

type BasicItem = {
  label: string;
  checked: boolean;
};

type SizeItem = {
  label: ISize["label"];
  size: ISize["size"];
  price: number;
  delivery: number;
  checked: boolean;
};

interface IAppState {
  fruits: BasicItem[];
  sizes: SizeItem[];
  toppings: BasicItem[];
}

function App(): JSX.Element {
  const INITIAL_DATA: Record<
    string,
    IAppState["fruits"] | IAppState["sizes"] | IAppState["toppings"]
  > = {
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
    showModal: false,
  });

  const [order, setOrder] = useState(INITIAL_DATA);

  const [selected, setSelected] = useState({
    fruit: {},
    size: {},
    toppings: {},
  });

  useEffect(() => {
    const fruitSelected = order.fruits.find((item) => item.checked === true);
    const sizeSelected = order.sizes.find((item) => item.checked === true);
    const toppsSelected = order.toppings.filter(
      (item) => item.checked === true
    );

    setSelected((state) => {
      return {
        ...state,
        fruit: fruitSelected,
        size: sizeSelected,
        toppings: toppsSelected,
      };
    });
  }, [order]);

  function assignIngredient(
    selection: "unique" | "multi",
    key: string,
    item: BasicItem | SizeItem
  ) {
    const isUnique = selection.toLowerCase() === "unique";

    const updatedItem: BasicItem | SizeItem = {
      ...item,
      checked: !item.checked,
    };

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
    const isFruitSelected = order.fruits.some(
      (option) => option.checked === true
    );
    const isSizeSelected = order.sizes.some(
      (option) => option.checked === true
    );
    if (isFruitSelected && isSizeSelected)
      setSettings(({ showModal }) => {
        return { showModal: !showModal };
      });
  }
  return (
    <div className="App">
      <div className="order">
        <div className="ingredient">
          <h2>Qual fruta você deseja no açaí?</h2>
          {order.fruits
            ? order.fruits.map((fruit) => {
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
            ? order.sizes.map((size) => {
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

          <h3>Preço:</h3>
          {selected.size ? (
            <p>
              <strong>$ {selected.size.price}</strong>
            </p>
          ) : null}

          <h3>Entrega:</h3>

          {selected.size ? (
            <p>
              Chega em <strong>{`${selected.size.delivery} minutos`}</strong>
            </p>
          ) : null}

          <h3>Detalhes do pedido:</h3>
          <ul>
            {selected.fruit ? (
              <li>
                <strong>Fruta:</strong> <p>{selected.fruit.label}</p>
              </li>
            ) : null}

            {selected.size ? (
              <li>
                <strong>Tamanho:</strong> <p>{selected.size.size}ml</p>
              </li>
            ) : null}

            <strong>Toppings:</strong>
            {Array.isArray(selected.toppings)
              ? selected.toppings?.map((item) => {
                  return <li key={item.label}>{item.label}</li>;
                })
              : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default App;
