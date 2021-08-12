<template>
  <div>
    <svg
              style="margin-right:5px"
              width="7"
              height="15"
              viewBox="0 0 7 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.297061"
                d="M6 1L1 7.0051L6 13.0179"
                stroke="#5B637A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <svg
              width="7"
              height="15"
              viewBox="0 0 7 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
             
            >
              <path
                d="M1 1L6 7.0051L1 13.0179"
                stroke="#5B637A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
  
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  name: "WidgetPagination"
};
</script>
<style lang="scss" scoped>
.caret-disable {
  mix-blend-mode: normal;
  opacity: 0.3;
  transform: matrix(-1, 0, 0, 1, 0, 0);
}
.caret {
  margin-right: 15%;
  width: 5px;
  height: 12.02px;
}
</style>
