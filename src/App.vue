<template>
  <div class="header">
    Where&apos;s that Pokémon?
  </div>
  <router-view />
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 18px;
}

.header {
  background-color: var(--primary);
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 4rem;
  box-shadow: 0 4px 15px 2px rgba(0, 0, 0, 0.25)
}
</style>
<style>
body {
  --primary: #E3350D;
  --secondary: #0F7173;
  --primaryDark: darken(#E3350D, 20);
  --secondaryDark: darken(#0F7173, 20);
}
</style>
