<template>
    <div>
        <nav class="navbar navbar-expand-lg" style="background-color:black;height:100px;">
            <select @change="getProductsAndFiltersByCategory()" class="select" v-model="category_id">
                <option :value="null" disabled style="background-color:white;">
                    Components
                </option>
                <option v-for="productCategory in productCategories" style="background-color:white;" :key="productCategory.id" v-bind:value="productCategory.id">
                    {{productCategory.product_category_name}}
                </option>
            </select>
            <div class="cart-div">
                <a href=""><span style="color:black">Your cart</span><img src="https://images.vexels.com/media/users/3/132103/isolated/preview/2b512b5ece5d914e68950bfdbf73b481-shopping-cart-circle-icon-by-vexels.png" class="cart-image" alt=""></a>
            </div>
            <div style="margin-left: 600px;margin-top:15px;">
                <h1 style="color:#ffcc00;font-family:'Staatliches';font-size:50px;cursor:pointer" @click="$router.push({name: 'Home'})">Online PC Components!</h1>
            </div>
            <!-- <div style="margin-left: 580px;">
                <img src="https://www.pngitem.com/pimgs/m/494-4943503_best-i9-9900ks-gaming-pc-build-2020-pc.png" width="600" height="200" class="d-inline-block align-top" alt="">
            </div> -->
            <div class="collapse navbar-collapse" style="position:absolute; right:15px;" id="navbarSupportedContent">
                <div class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" style="width: 500px" placeholder="Search for components" v-model="searchTerm" aria-label="Search">
                    <button class="btn btn-outline-warning my-2 my-sm-0" style="width: 200px;cursor:pointer;" @click="search()" type="submit">Search</button>
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
            this.searchTerm = ''
        }
    },

    created(){
        productsService.getCategories().then(r => {
            this.productCategories = r.data
        })
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
.select{
    width:300px;
    height: 50px;
    font-style: "Red Rose";
    font-family:'Staatliches';
    background-color: #ffcc00;
    text-align-last: center;
}

.cart-image{
    height: 50px;
    width: 50px;
    margin-left: 10px;
}

.cart-div{
    background-color: #ffcc00;
    margin-left: 20px;
    border-radius: 8px;
    padding-left: 10px;
    padding-right: 7px;
    font-family:'Staatliches';
}
</style>