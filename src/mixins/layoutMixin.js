export default {
    methods: {
        setLayout(layout) {
            this.$store.dispatch('Layout/callLayout', layout)
          }
    }
}