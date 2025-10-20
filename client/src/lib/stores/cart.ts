import {action, makeObservable, observable} from 'mobx';
import type { ProductDTO } from '../types/index.d.ts';
export default class Cart{
    cartItems: ProductDTO[] = [];

    constructor(){
        makeObservable(this, {
            cartItems: observable,
            addToCart: action
        })
    }

    addToCart = (product:ProductDTO) => {
        this.cartItems.push(product);
    }
}