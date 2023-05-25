import md from "markdown-it";

export default defineNuxtPlugin(() => {
  const renderer = md({
    breaks: true,
    html: true,
  });
  return {
    provide: {
      mdRenderer: renderer,
    },
  };
});
