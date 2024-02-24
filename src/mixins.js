export default {
    methods: {
      hasPermission(permission) {
        if (this.$store.state.loadedPermissions) {
            return this.$store.state.permissions.includes(permission);
          }
          return false;
      }
    }
}