<template>
  <form class="needs-validation" id="form-add" novalidate>
    <div class="row g-3">
      <div class="col-md-8">
        <label for="country" class="form-label">Выберите необходимый товар</label>
        <select v-model="product" class="form-select" id="country" required>
          <option value="" >Выбрать...</option>
          <option v-for="product in products" :value="product" :key="product.id">
            {{ product.title }}
          </option>
        </select>
        <div class="invalid-feedback">
          Пожалуйста, выберите корректный товар.
        </div>
      </div>

      <div class="col-md-4">
        <label for="count" class="form-label">Введите количество товара</label>
        <input v-model.number="count" type="number" placeholder="" class="form-control" id="count" min="1" max="999" required/>
        <div class="invalid-feedback">
          Пожалуйста, введите корректное количество.
        </div>
        
      </div>
    </div>
    <hr class="my-4">
    <button 
      @click="addToCart"
      class="w-100 btn btn-primary btn-lg" 
      type="submit"
      v-bind:disabled="Object.keys(product).length === 0 || count <= 0"
    >Добавить товар в корзину</button>
  </form>
</template>
      
<script>


import { onMounted, ref } from 'vue';


export default {
  name: 'AddOrderForm',
  components: {

  },
  props: {
    products: {
      type: Array,
      default() {
        return []
      },
    }
  },
  setup(props, context) {
    let count = ref(1);
    let product = ref('');

    const addToCart = (() => {
      context.emit('addToCart', {
        product: product.value,
        count: count.value
      });
    });

    onMounted(() => {
      const formElement = document.getElementById('form-add');
      const selectProductInput = formElement.querySelector('select');
      const setCountInput = formElement.querySelector('input[type="number"]');
      formElement.addEventListener('submit', (event) => {
        formElement.classList.add('was-validated');
        event.preventDefault();
      });
      selectProductInput.addEventListener('input', () => {
        formElement.classList.remove('was-validated');
      });
      setCountInput.addEventListener('input', () => {
        formElement.classList.remove('was-validated');
      });
    })

    return {
      count,
      product,
      addToCart
    }
  }
}
</script>
  
<style scoped></style>