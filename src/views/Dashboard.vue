<template>
  <div>
    <div class="red-bar fix"></div>
    <div class="sidebar no-mobile">
      <div class="flex-sidebar">
        <div class="s-container">
          <div>
            User
          </div>
          <div class="center">
            <img class="s-icon" src="../images/home.png" alt="home" />
          </div>
          <div>
            Team
          </div>
          <div>
            Developers
          </div>
        </div>
      </div>
    </div>
    <div class="m-sidebar no-desktop">mobile sidebar</div>
    <div class="main">
      <div class="d-container">
        <div class="top-bar">
          <div @click="handleSignout">
            <img class="logout-icon" src="../images/logout.png" alt="logout" />
          </div>
        </div>
        <h3 class="d-title">Obscura 7.5</h3>
        <div></div>
      </div>
      <div class="bottom-bar">
        <div class="d-footer-content">
          <div class="home-footer">
            <div class="footer-content">
              Developed by
              <span class="gawds">gawds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    handleSignout() {
      console.log("lol");
      this.$store.dispatch("LOGOUT");
    }
  }
};
</script>

<style></style>
