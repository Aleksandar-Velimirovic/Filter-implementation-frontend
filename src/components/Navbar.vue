<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Welcome To Online Retail App!</a>
            <!-- <img src="" width="30" height="30" class="d-inline-block align-top" alt=""> -->
            <b>Choose the product category! &rarr;</b>
            <select @change="getProductsAndFiltersByCategory()" class="form-control" v-model="category_id" style="width:300px;margin-left:10px;margin-right:10px;">    
                <option v-for="productCategory in productCategories" :key="productCategory.id" v-bind:value="productCategory.id">
                    {{productCategory.product_category_name}}
                </option>
            </select>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" v-model="searchTerm" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" @click="search()" type="submit">Search</button>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>

import { productsService } from '../services/ProductService'
import { mapActions, mapMutations } from "vuex"

export default {
    data(){
        return{
            productCategories: {},
            category_id: null,
            searchTerm: ''
        }
    },

    methods:{
        ...mapActions({
            getProductsByCategory: 'getProductsByCategory',
            getCategoryFilters: 'getCategoryFilters',
            searchProductsOfAnyCategory: 'searchProductsOfAnyCategory'
        }),

        ...mapMutations({
            setCategoryId: 'setCategoryId'
        }),

        getProductsAndFiltersByCategory(){
            this.getProductsByCategory({
                categoryId: this.category_id
            })
            this.getCategoryFilters(this.category_id)
            this.setCategoryId(this.category_id)
        },

        search(){
            this.searchProductsOfAnyCategory(this.searchTerm)
        }
    },

    created(){
        productsService.getCategories().then(r => {
            this.productCategories = r.data
        })
    }
}
</script>