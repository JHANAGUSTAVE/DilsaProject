<template>
  <div>
    <ul class="pagination">
    <li 
      class="pagination-item"
    >
      
    </li>

    <li
      class="pagination-item"
       
    >

       <svg
              style="margin-right:10px"
              width="7"
              height="15"
              viewBox="0 0 7 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
                @click="onClickPreviousPage"
              :class="{disabled: isInFirstPage}"
        aria-label="Go to previous page"
            >
              <path
                :opacity="isInFirstPage ? 0.297061: 1"
                d="M6 1L1 7.0051L6 13.0179"
                stroke="#5B637A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg> 
    </li>

    <li v-for="page in pages" :key="page" class="pagination-item">
      <button 
        type="button" 
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        :aria-label="`Go to page number ${page.name}`"
        
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
       
        <svg
              width="7"
              height="15"
              viewBox="0 0 7 15"
              fill="none"
              :opacity="isInLastPage ? 0.297061: 1"
              xmlns="http://www.w3.org/2000/svg"
               :disabled="isInLastPage" @click="onClickNextPage"
        aria-label="Go to next page"
            >
              <path
                d="M1 1L6 7.0051L1 13.0179"
                stroke="#5B637A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg> 
      
    </li>

    <li class="pagination-item">
      
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  data() {
    return { 
    };
  },
  name: "SimplePagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 0
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true,
      default:1
    }
    },
    computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) { 
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;

    },
    endPage() {
      
      return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
      
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i+= 1 ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage 
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage  == 1 ? 1 :this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage == this.totalPages ? this.totalPages : this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);    
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  }
};
</script>
<style scoped>
.active {
  background-color: #4AAE9B;
  color: #ffffff;
}
</style>
