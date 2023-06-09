<template>
  <li class="list-group-item d-flex justify-content-between lh-sm">
    <div>
      <h6 class="my-0">{{ cartItem.title }}</h6>
      <small class="text-body-secondary">Количество товара в корзине: {{ cartItem.count }}</small>
    </div>
    <span class="text-body-secondary">{{ cartItem.count * cartItem.price }}₽</span>
  </li>
</template>
          
<script>



export default {
  name: 'CartItem',
  props: {
    cartItem: {
      type: Object,
      default() {
        return {}
      },
    }
  },
}
</script>
      
<style scoped></style>