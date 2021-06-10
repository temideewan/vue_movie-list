<template>
  <div id="nav">
    <div class="brand">
      <h1>Movies</h1>
    </div>

    <div class="links">
      <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    </div>
  </div>
  <router-view/>
</template>

<style>
html:focus-within{
  scroll-behavior: smooth;
  
}
body{
  margin: 0;
  padding: 0;
}
*{
  box-sizing: border-box;
  margin:0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  overflow: hidden;
}

#nav {
  background-color: #eee;
  display: flex;
  justify-content: center;
  gap: 500px;
  align-items: center;
  min-width: 650px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px;
}

#nav .brand{
  color: #1B1B1B;
}

#nav .links a {
  font-weight: bold;
  color: #2c3e50;
  padding: 6px 12px;
  border-radius: 4px;
  text-decoration: none;
}

#nav .links a.router-link-exact-active {
  color: white;
  background-color: #ffdc60;
  border: none;
  
}
</style>
