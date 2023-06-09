<template>
  <div class="col-md-5 col-lg-4 order-md-last">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
      <span class="text-primary">Ваша корзина</span>
      <span class="badge bg-primary rounded-pill">{{calcTotalCart.quantity }}</span>
    </h4>
    <ul class="list-group mb-3">
      <cart-item
          v-for="cartItem in cartList" 
          :key="cartItem.id"
          :cartItem="cartItem"
        />
      <li class="list-group-item d-flex justify-content-between">
        <span>Итогго (RUB)</span>
        <strong>{{ calcTotalCart.sum }}₽</strong>
      </li>
    </ul>
    <button class="w-100 btn btn-success btn-lg" type="button" v-bind:disabled="cartList.length === 0"
    @click="placeOrder"
    >Оформить заказ</button>
  </div>
</template>
        
<script>

import CartItem from '@/components/CartItem.vue';

import { computed } from 'vue';


export default {
  name: 'CartList',
  components: {
    CartItem,
},
  props: {
    cartList: {
      type: Array,
      default() {
        return []
      },
    }
  },
  setup(props, context){

    const placeOrder = (() => (
      context.emit('placeOrder')
    ));

    const calcTotalCart = computed(() => {
      let sum = 0;
      let quantity = 0;
      props.cartList.forEach(cart => {
        sum += cart.price * cart.count;
        quantity += cart.count;
      });

      return {sum: sum.toFixed(2), quantity};
    });

    return {
      calcTotalCart,
      placeOrder
    }
  }
}
</script>
    
<style scoped></style>