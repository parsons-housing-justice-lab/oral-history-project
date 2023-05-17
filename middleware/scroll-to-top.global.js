export default defineNuxtRouteMiddleware(() => {
  try {
    document.querySelector('.content').scrollTo(0, 0);
  }
  catch (e) {
    // Not in client mode, igonre
  }
})
