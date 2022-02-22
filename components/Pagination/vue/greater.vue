<template>
  <ul class="eble-page-ul">
    <li @click="changeNumber(1)" :class="{'choose-page': 1 === chooseNumber}">1</li>
    <li
      v-if="chooseNumber<=5"
      @click="changeNumber(2)"
      :class="{'choose-page': 2 === chooseNumber}"
    >2</li>
    <li v-else class="eble-page-omit">...</li>
    <li
      :class="{'choose-page': idx === chooseNumber}"
      @click="changeNumber(idx)"
      v-for="idx in middleNumberArr"
      :key="idx"
    >{{idx}}</li>
    <li
      v-if="chooseNumber>=pagesNumber-4"
      @click="changeNumber(pagesNumber-1)"
      :class="{'choose-page': pagesNumber-1 === chooseNumber}"
    >{{pagesNumber-1}}</li>
    <li v-else class="eble-page-omit">...</li>
    <li
      @click="changeNumber(pagesNumber)"
      :class="{'choose-page': pagesNumber === chooseNumber}"
    >{{pagesNumber}}</li>
  </ul>
</template>
<script>
export default {
  name: "Greater",
  state() {
    return {};
  },
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
    },
    pagesNumber: {
      type: Number
    }
  },
  data() {
    return {};
  },
  // created() {
  //   const temporaryArr = [];
  //   for (let i = this.middleNumber - 2; i <= this.middleNumber + 2; i++) {
  //     temporaryArr.push(i);
  //   }
  //   this.middleNumberArr = temporaryArr;
  // },
  computed: {
    middleNumberArr() {
      const temporaryArr = [];
      let middleNumber = 5;
      if (this.chooseNumber <= 5) {
        middleNumber = 5;
      } else if (this.chooseNumber >= this.pagesNumber - 4) {
        middleNumber = this.pagesNumber - 4;
      } else {
        middleNumber = this.chooseNumber;
      }
      for (let i = middleNumber - 2; i <= middleNumber + 2; i++) {
        temporaryArr.push(i);
      }
      return temporaryArr;
    }
  },
  methods: {
    changeNumber(chooseNumber) {
      this.$emit("changeNumber", chooseNumber);
    }
  }
  // watch: {
  //   chooseNumber: function() {
  //     this.middleNumberArr();
  //   }
  // }
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
li.eble-page-omit {
  border: none;
  cursor: default;
}
li.eble-page-omit:hover {
  background: none;
  color: #111;
}
</style>
