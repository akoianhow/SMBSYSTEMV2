import { createContext } from "react";
import Cart from "./cart";

interface Store {
    cart: Cart;
}

export const store: Store = {
    cart: new Cart()
}

export const StoreContext = createContext(store)