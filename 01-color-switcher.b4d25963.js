!function(){var t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]"),body:document.querySelector("body")},e=null;t.start.addEventListener("click",(function(){e=setInterval((function(){var e="#".concat(Math.floor(16777215*Math.random()).toString(16));t.body.style.backgroundColor=e}),1e3),t.start.disabled=!0})),t.stop.addEventListener("click",(function(){clearInterval(e),t.start.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.b4d25963.js.map