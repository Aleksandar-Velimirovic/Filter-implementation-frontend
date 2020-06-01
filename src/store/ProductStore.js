import { productsService } from "../services/ProductService";

export const ProductStore = {
    state:{
        products: [],
        filters: [],
        category_id:null
    },

    mutations:{

        setProducts(state, products){
            state.products = products
        },
    
        setCategoryId(state, id){
            state.category_id = id;
        },
    
        setFilters(state, filters){
            state.filters = filters.map(filter => {
                filter.items = filter.items.map(item => {
                    return {
                        'value' : item,
                        'checked': 0
                    }
    
                })
                return filter
            })
        }
    },

    actions:{
        async getProductsByCategory(context, params){
            let response = await productsService.getProductsByCategory(params.categoryId, params.filters)

            context.commit('setProducts', response.data)

        },

        async getCategoryFilters(context, categoryId){
            let response = await productsService.getCategoryFilters(categoryId)
            context.commit('setFilters', response.data)
        },

        async searchProductsOfAnyCategory(context, searchTerm){
            let response = await productsService.searchProductsOfAnyCategory(searchTerm)
            context.commit('setProducts', response.data)
        }
    },

    getters:{
        getFilters(state){
            return state.filters
        },

        getProducts(state){
            return state.products
        },

        getCategoryId(state){
            return state.category_id
        }
    }


}