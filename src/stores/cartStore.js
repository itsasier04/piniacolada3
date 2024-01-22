import { defineStore } from "pinia";
import { groupBy, sortBy } from "lodash";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: [],
        }
    },
    actions: {
        addItems(count, item) {
            count = parseInt(count);
            for (let index = 0; index < count; index++) {
                this.items.push({ ...item })
            }
        },
        clearItem(name) {
            this.items = this.items.filter(item => item.name !== name)
        },
        setItemCount(item, count) {
            this.clearItem(item.name)
            this.addItems(count, item)
        }
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => (state.count === 0),
        grouped: state => {

            const grouped = groupBy(state.items, item => item.name)
            const allItems = Object.values(grouped).flat()
            const sortedItems = sortBy(allItems, 'name')
            return groupBy(sortedItems, item => item.name)
        },

        groupCount: (state) => (name) => state.grouped[name].length,
        countTotalPrice: state => state.items.reduce((acc, curr) => acc + curr.price, 0),
    }
});