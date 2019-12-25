<template>
  <div>
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
</style>