<template>
    <div>
        <ol class="list-group" v-for="product in popularProducts" :key="product.id">
            <li class="list-group-item" style="list-style-type:none;">
                <div>
                    <p><b>{{product.product_title}}</b></p>
                    <button class="cart">Add To Cart <img src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png" class="cart-image" alt=""></button>
                    <img class="img" :src="product.title_image" alt="">
                </div>
                <star-rating v-bind:star-size="20"></star-rating>
            </li>
        </ol>
    </div>
</template>

<script>

import { productsService } from "../services/ProductService";
import StarRating from 'vue-star-rating'

export default {
    data(){
        return{
            popularProducts: [],
        }
    },

    components:{
        StarRating
  },

    created(){
        productsService.getPopularProducts().then(response => {
            this.popularProducts = response.data
        })
    }
}
</script>

<style scoped>

.img{
    width: 150px;
    height: 150px;
}

/* .zoom {
  padding: 50px;
  transition: transform .2s;
  margin: 0 auto;
} */

.img:hover {
  -ms-transform: scale(2); /* IE 9 */
  -webkit-transform: scale(2); /* Safari 3-8 */
  transform: scale(2);
  cursor: pointer;
}

.cart{
    right: 5px;
    position:absolute;
    bottom: 5px;
    font-size: 15px;
    text-decoration: none;
    cursor: pointer;
    padding: 10px 10px 10px 10px;
    background-color: white;
    border-radius: 8px;
    border-style: solid;
    border-color: #ffcc00;
}

.cart:hover {
  background-color: #ffcc00;
  background-size: 100%;
  transition: background 0s;
  font-weight: bold;
}

.cart-image{
    height: 20px;
    width: 30px;
}

</style>
