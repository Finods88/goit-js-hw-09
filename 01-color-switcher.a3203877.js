const e=document.querySelector("body"),t=document.querySelector("[data-start]"),d=document.querySelector("[data-stop]");let a=null;t.addEventListener("click",(()=>{t.disabled=!0,d.disabled=!1,a=setInterval((()=>{e.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),d.addEventListener("click",(()=>{clearInterval(a),d.disabled=!0,t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.a3203877.js.map
