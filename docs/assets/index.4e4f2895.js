import{d as l,c as n,a as u,F as a,b as e,i as o,r as t,e as s}from"./vendor.9b380778.js";function r(l=!1){if(o(l))return n=>{l.value="boolean"==typeof n?n:!l.value};{const n=t(l),u=l=>{n.value="boolean"==typeof l?l:!n.value};return[n,u]}}n(l({name:"App",setup(){const[l,n]=r(!1),[o,v]=function(l=!1){const n=t(l),u=s({get:()=>!n.value,set:()=>n.value=u.value});return[n,u]}(),p=r(o),c=r(v),i=()=>u("span",{onClick:()=>p()},[(o.value?"你得到":"虽然你失去")+"了鱼，"]),f=()=>u("span",{onClick:()=>c()},[(v.value?"但是你得到":"却失去")+"了熊掌！"]),b=()=>u(a,null,[u(i,null,null),u(f,null,null)]);return()=>u(a,null,[l.value?u("span",null,[e("做你的白日梦去吧！")]):u(b,null,null),u("button",{onClick:()=>n()},[l.value?"重新选择":"全都要"])])}})).mount("#app");
