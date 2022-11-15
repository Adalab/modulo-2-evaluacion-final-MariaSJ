"use strict";const ulCharacters=document.querySelector(".js-list-characters"),ulfavourites=document.querySelector(".js-favourites-list"),btnSearch=document.querySelector(".js-btn-search"),inputTextSearch=document.querySelector(".js-input-search"),btnResetFav=document.querySelector(".js-favs-reset"),titleSectionFav=document.querySelector(".js-fav-title");let listCharacters=[],favCharacters=[];function getData(){fetch("https://breakingbadapi.com/api/characters").then(e=>e.json()).then(e=>{listCharacters=e,renderAllCharacters(listCharacters)})}getData();const saveFavouritesChar=JSON.parse(localStorage.getItem("favChar"));function renderAllCharacters(e){let a="",t="";for(const r of e){t=-1===favCharacters.findIndex(e=>e.char_id===r.char_id)?"":"selected",a+=`<li class="character js-card-character ${t}" id="${r.char_id}">`,a+=`<img class="character__img" src="${r.img}" alt="">`,a+=`<h4 class="character__name">${r.name}</h4>`,a+=`<p class="character__status">${r.status}</p>`,a+="</li>"}ulCharacters.innerHTML=a,listenerEachChar()}function renderFavCharacters(){let e="";for(const a of favCharacters)e+=`<li class="character" id="${a.char_id}">`,e+=`<img class="character__img" src="${a.img}" alt="">`,e+=`<h4 class="character__name">${a.name}</h4>`,e+=`<p class="character__status">${a.status}</p>`,e+='<button class="btn-delete js-btn-delete">X</button>',e+="</li>";ulfavourites.innerHTML=e;const a=document.querySelectorAll(".js-btn-delete");for(const e of a)e.addEventListener("click",e=>{e.preventDefault();const a=e.currentTarget.id,t=favCharacters.findIndex(e=>e.char_id===parseInt(a));favCharacters.splice(t,1),localStorage.setItem("favChar",JSON.stringify(favCharacters)),renderFavCharacters(favCharacters),renderAllCharacters(listCharacters),showMesageAndBtnFavs()})}function showMesageAndBtnFavs(){0===favCharacters.length?(titleSectionFav.classList.remove("hidden"),btnResetFav.classList.add("hidden")):(titleSectionFav.classList.add("hidden"),btnResetFav.classList.remove("hidden"))}function handleClick(e){const a=e.currentTarget.id,t=listCharacters.find(e=>e.char_id===parseInt(a)),r=favCharacters.findIndex(e=>e.char_id===parseInt(a));-1===r?(e.currentTarget.classList.add("selected"),favCharacters.push(t),localStorage.setItem("favChar",JSON.stringify(favCharacters)),titleSectionFav.classList.add("hidden"),btnResetFav.classList.remove("hidden")):(e.currentTarget.classList.remove("selected"),favCharacters.splice(r,1),localStorage.setItem("favChar",JSON.stringify(favCharacters))),renderFavCharacters()}function listenerEachChar(){const e=document.querySelectorAll(".js-card-character");for(const a of e)a.addEventListener("click",handleClick)}null!==saveFavouritesChar&&(favCharacters=saveFavouritesChar,showMesageAndBtnFavs(),renderFavCharacters()),btnSearch.addEventListener("click",e=>{e.preventDefault();const a=inputTextSearch.value.toLowerCase();renderAllCharacters(listCharacters.filter(e=>e.name.toLowerCase().includes(a)))}),inputTextSearch.addEventListener("input",()=>{renderAllCharacters(listCharacters)}),btnResetFav.addEventListener("click",e=>{e.preventDefault(),localStorage.removeItem("favChar"),favCharacters.length=0,renderFavCharacters(favCharacters),renderAllCharacters(listCharacters),titleSectionFav.classList.remove("hidden"),btnResetFav.classList.add("hidden")});