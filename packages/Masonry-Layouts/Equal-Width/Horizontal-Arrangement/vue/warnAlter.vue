<template>
  <div :class="['eble-alter',{'eble-alter-display': alterBool}]">
    <img src="./img/warning.svg" alt>
    <p>{{alterText}}</p>
    <button @click="closeAlter">Sure</button>
  </div>
</template>
<script>
export default {
  name: "warnAlter",
  props: {
    alterBool: {
      type: Boolean,
      default: false
    },
    alterText: {
      type: String,
      default: ""
    }
  },
  methods: {
    closeAlter() {
      this.$emit("closeAlter");
    }
  }
};
</script>
<style scoped>
div.eble-alter {
  position: fixed;
  padding: 5px 10px;
  border-radius: 5px;
  left: 50%;
  transform: translateX(-50%);
  top: -150px;
  z-index: 99;
  background-color: #fff;
  box-shadow: 0 5px 20px #ddd;
  transition: top ease-in 0.1s, opacity ease-in 0.2s;
  opacity: 0;
}
.eble-alter.eble-alter-display {
  top: 50px;
  opacity: 1;
}
.eble-alter button {
  outline: none;
  border: none;
  display: inline-block;
  width: 50px;
  height: 25px;
  line-height: 25px;
  background: #f00;
  border-radius: 5px;
  color: #fff;
  margin-top: 10px;
}
</style>


