<template>
  <div class="container">
    <div v-if="products.length" class="mt-5">
      <div v-for="product in products" :key="product.id" class="list-group">
        <p class="list-group-item">{{product.product_title}}</p>
      </div>
      <h3 v-if="filters.length">
        <p>You can filter through products!</p>
      </h3>
      <button v-if="filters.length" @click="applyFilters()">Apply filters</button>
    </div>
    <h1 v-else class="mt-5">Tell us what you need!</h1>
    <div v-for="(filter, key) in filters" :key="key">
      <div>
        <b>{{filter.label}}</b>
        <div v-for="(value, index) in filter.items" :key="index">
          <label for="checkbox" style="margin-right:5px"> {{value.value}} </label>
          <input type="checkbox" id="checkbox" v-model="value.checked">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex"

export default {

  computed:{
    ...mapGetters({
      filters: 'getFilters',
      products: 'getProducts',
      categoryId: 'getCategoryId'
    })
  },

  methods:{
        ...mapActions({
            getProductsByCategory: 'getProductsByCategory',
        }),

        filterGroupHasCheckedItem(filterGroup) {
          let result = false;

          filterGroup.items.forEach(item => {
              if(item.checked){
                result = true;
              }
          });

          return result;
      },

      getCheckedValusFromFilterGroup(filterGroup) {
        let filteredItems = filterGroup.items.filter(item => {
          return item.checked;
        });

        return filteredItems.map(item => {
          return item.value;
        })
      },

      serializeCheckedFilters(){
        let serializedFilters = [];
        let self = this;

        this.filters.forEach(filter => {
          if( !self.filterGroupHasCheckedItem(filter) ){
              return;
          }

          serializedFilters.push({
              'attribute_id': filter.attribute_id,
              'values': self.getCheckedValusFromFilterGroup(filter)
          });
        })

        return serializedFilters;
      },

      applyFilters(){
        let filters = this.serializeCheckedFilters();

        this.getProductsByCategory({
                categoryId: this.categoryId,
                filters: filters
            }
        );
      }
  }
}
</script>

<style scoped>
button {
  background: none!important;
  border: none;
  padding: 0!important;
  font-family: arial, sans-serif;
  color: #069;
  text-decoration: none;
  cursor: pointer;
}
</style>
