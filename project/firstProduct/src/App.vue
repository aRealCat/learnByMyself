<template>
  <div id="app">
    <transition name="fade"
		            mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}
</style>
