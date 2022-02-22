<template>
  <ul class="eble-page-ul">
    <li
      @click="changeNumber(idx)"
      v-for="idx in pagesArr"
      :class="{'choose-page': idx === chooseNumber}"
      :key="idx"
    >{{idx}}</li>
  </ul>
</template>
<script>
export default {
  name: "Less",
  props: {
    pagesArr: {
      type: Array,
      default: () => {
        return [];
      }
    },
    chooseNumber: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {};
  },
  methods: {
    changeNumber(chooseNumber) {
      this.$emit("changeNumber", chooseNumber);
    }
  }
};
</script>
<style scoped>
.eble-page-ul li {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-right: 5px;
  cursor: pointer;
  user-select: none;
}
.eble-page-ul li:hover {
  background-color: #f00;
  color: #fff;
}
.eble-page-ul .choose-page {
  cursor: default;
  background-color: #f00;
  color: #fff;
}
</style>


