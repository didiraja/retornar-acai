export const fruits: string[] = ["MORANGO", "BANANA", "KIWI"];

export interface ISize {
  label: "PEQUENO" | "MÉDIO" | "GRANDE";
  size: "300" | "500" | "700";
  price: number;
  delivery: number;
}

export const sizes: ISize[] = [
  {
    label: "PEQUENO",
    size: "300",
    price: 10,
    delivery: 5,
  },
  {
    label: "MÉDIO",
    size: "500",
    price: 12,
    delivery: 7,
  },
  {
    label: "GRANDE",
    size: "700",
    price: 15,
    delivery: 9,
  },
];

export const toppings: string[] = ["GRANOLA", "PAÇOCA", "LEITE NINHO"];
