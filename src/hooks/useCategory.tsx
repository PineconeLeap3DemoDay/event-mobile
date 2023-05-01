import { create } from "zustand";
import { Category } from "../../typing";

interface IUseCategory {
    category: Category,
    setCategory:(a: Category) => void
}

const useCategory = create<IUseCategory>((set) => ({
    category: {name: "My Feed",id: "1234"},
    setCategory: (cat: Category) => set({category: {id: cat.id, name: cat.name}})
}));
export default useCategory;