import{k as p,t as W,v as j,p as b,r as T,_ as R,j as t,o as $,w as G,m as L,x as P,s as A,h as U,B as m,T as d,L as w}from"./index-PaafkZgw.js";const M=["className","component","disableGutters","fixed","maxWidth","classes"],N=W(),S=j("div",{name:"MuiContainer",slot:"Root",overridesResolver:(o,n)=>{const{ownerState:a}=o;return[n.root,n[`maxWidth${b(String(a.maxWidth))}`],a.fixed&&n.fixed,a.disableGutters&&n.disableGutters]}}),_=o=>G({props:o,name:"MuiContainer",defaultTheme:N}),E=(o,n)=>{const a=i=>P(n,i),{classes:x,fixed:u,disableGutters:h,maxWidth:e}=o,s={root:["root",e&&`maxWidth${b(String(e))}`,u&&"fixed",h&&"disableGutters"]};return L(s,a,x)};function H(o={}){const{createStyledComponent:n=S,useThemeProps:a=_,componentName:x="MuiContainer"}=o,u=n(({theme:e,ownerState:s})=>p({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!s.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}}),({theme:e,ownerState:s})=>s.fixed&&Object.keys(e.breakpoints.values).reduce((i,r)=>{const c=r,l=e.breakpoints.values[c];return l!==0&&(i[e.breakpoints.up(c)]={maxWidth:`${l}${e.breakpoints.unit}`}),i},{}),({theme:e,ownerState:s})=>p({},s.maxWidth==="xs"&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},s.maxWidth&&s.maxWidth!=="xs"&&{[e.breakpoints.up(s.maxWidth)]:{maxWidth:`${e.breakpoints.values[s.maxWidth]}${e.breakpoints.unit}`}}));return T.forwardRef(function(s,i){const r=a(s),{className:c,component:l="div",disableGutters:g=!1,fixed:v=!1,maxWidth:y="lg"}=r,C=R(r,M),f=p({},r,{component:l,disableGutters:g,fixed:v,maxWidth:y}),k=E(f,x);return t.jsx(u,p({as:l,ownerState:f,className:$(k.root,c),ref:i},C))})}const J=H({createStyledComponent:A("div",{name:"JoyContainer",slot:"Root",overridesResolver:(o,n)=>n.root}),useThemeProps:o=>U({props:o,name:"JoyContainer"})});function B(){return t.jsxs(m,{children:[t.jsxs(m,{sx:{backgroundColor:"primary.main",color:"white",marginTop:"64px",py:3,textAlign:"center"},children:[t.jsx(d,{level:"h3",component:"h1",children:"Hi, This is main congrats!"}),t.jsx(d,{level:"body1",children:"This is the basic layout using Joy UI."})]}),t.jsxs(J,{sx:{my:4,p:2,display:"flex",flexDirection:"column",alignItems:"center"},children:[t.jsx(d,{level:"h4",component:"h2",sx:{mb:2},children:"Explore Our Features"}),t.jsx(d,{level:"body2",sx:{textAlign:"center",maxWidth:600},children:"Here you can explore a variety of features and services we offer. Use the navigation menu to browse different sections of our platform."}),t.jsx(w,{href:"/adminPanel",level:"body2",variant:"soft",paddingLeft:"5px",underline:"hover",sx:{mt:3,padding:"6px 12px"},children:"Are u admin ^^"})]}),t.jsx(m,{sx:{backgroundColor:"neutral.300",py:2,textAlign:"center",mt:"auto"},children:t.jsx(d,{level:"body3",children:"© 2024 Your Company. All rights reserved."})})]})}export{B as default};
