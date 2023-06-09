<template>
  <div class="container">
    <main>
      <div class="row g-5 py-5">
        <cart-list :cartList="cartList" @placeOrder="placeOrder" />
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">Форма добавления товара</h4>
          <add-order-form :products="products.products" @addToCart="addToCart" />
        </div>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
          aria-labelledby="staticBackdropLabel" aria-hidden="true" :class="isModalOpened ? 'd-block show' : ''">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Ваш заказ отправлен!</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"
                @click="closeModal" ></button>
                
              </div>
              <div class="modal-body">
                <div class="modal-body">
                <p>Номер заказа: {{ responseMessage.code }}</p>
              </div>
              </div>
              <div class="modal-footer">
                <small>Не забудьте съесть всю порционную соль и запить морсом!</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
    
<script>

import AddOrderForm from '@/components/AddOrderForm'
import CartList from '@/components/CartList'

import { getProductsFromServer, saveOrderToServer } from '@/api/repositories'
import { onMounted, ref } from 'vue'


export default {
  name: 'MainWrapper',
  components: {
    AddOrderForm,
    CartList,
  },
  setup() {
    
    let cartList = ref([]);
    const products = ref([]);
    let isModalOpened = ref(false);
    let responseMessage = ref({});
    
    const getProducts = async () => {
      products.value = await getProductsFromServer();
    };
    const addToCart = (({product, count}) => {
      cartList.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        count
      })
    });

    const closeModal = (() => (isModalOpened.value = false));

    const placeOrder = async () => {
      responseMessage.value = await saveOrderToServer(
        cartList.value.map((item) => ({
          product_id: item.id,
          quantity: item.count
        }))
      ).then(cartList.value = []);
      isModalOpened.value = responseMessage.value.success;
    };
    
    onMounted(() => {
      getProducts();
    });

    return{
      isModalOpened,
      responseMessage,
      products,
      cartList,
      addToCart,
      placeOrder,
      closeModal
    }
  }
}
</script>

<style scoped></style>