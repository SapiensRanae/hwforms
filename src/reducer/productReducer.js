export const initialState = {
  products: [],
};

export function productReducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS": {
      return { ...state, products: action.payload };
    }
    case "ADD_PRODUCT": {
      // When using server, payload should already contain server-assigned id
      const nextId = state.products.length
        ? Math.max(...state.products.map((p) => p.id)) + 1
        : 1;
      const newProduct = action.payload.id ? action.payload : { ...action.payload, id: nextId };
      return { ...state, products: [...state.products, newProduct] };
    }
    case "EDIT_PRODUCT": {
      const updated = state.products.map((p) =>
        p.id === action.payload.id ? { ...p, ...action.payload } : p
      );
      return { ...state, products: updated };
    }
    case "DELETE_PRODUCT": {
      const filtered = state.products.filter((p) => p.id !== action.payload);
      return { ...state, products: filtered };
    }
    default:
      return state;
  }
}
