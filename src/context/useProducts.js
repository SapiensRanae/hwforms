import { useContext } from "react";
import { ProductContext } from "./context";

export const useProducts = () => useContext(ProductContext);
