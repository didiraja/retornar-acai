export const fruits: string[] = ["MORANGO", "BANANA", "KIWI"];

export interface ISizes {
  label: "PEQUENO" | "MÉDIO" | "GRANDE";
  size: "300" | "500" | "700";
}

export const sizes: ISizes[] = [
  {
    label: "PEQUENO",
    size: "300",
  },
  {
    label: "MÉDIO",
    size: "500",
  },
  {
    label: "GRANDE",
    size: "700",
  },
];

export const toppings: string[] = ["GRANOLA", "PAÇOCA", "LEITE NINHO"];
