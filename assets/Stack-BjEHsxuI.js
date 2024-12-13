import{t as V,v as b,k,ad as h,ae as p,af as F,ag as B,ah as D,r as d,ai as E,_ as G,j as N,o as _,w as $,m as M,x as O,aj as v,s as U,h as A}from"./index-AXV2ZCY0.js";const J=["component","direction","spacing","divider","children","className","useFlexGap"],L=V(),I=b("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,s)=>s.root});function W(e){return $({props:e,name:"MuiStack",defaultTheme:L})}function q(e,s){const n=d.Children.toArray(e).filter(Boolean);return n.reduce((a,c,t)=>(a.push(c),t<n.length-1&&a.push(d.cloneElement(s,{key:`separator-${t}`})),a),[])}const z=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],H=({ownerState:e,theme:s})=>{let n=k({display:"flex",flexDirection:"column"},h({theme:s},p({values:e.direction,breakpoints:s.breakpoints.values}),a=>({flexDirection:a})));if(e.spacing){const a=F(s),c=Object.keys(s.breakpoints.values).reduce((o,r)=>((typeof e.spacing=="object"&&e.spacing[r]!=null||typeof e.direction=="object"&&e.direction[r]!=null)&&(o[r]=!0),o),{}),t=p({values:e.direction,base:c}),m=p({values:e.spacing,base:c});typeof t=="object"&&Object.keys(t).forEach((o,r,i)=>{if(!t[o]){const u=r>0?t[i[r-1]]:"column";t[o]=u}}),n=B(n,h({theme:s},m,(o,r)=>e.useFlexGap?{gap:v(a,o)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${z(r?t[r]:e.direction)}`]:v(a,o)}}))}return n=D(s.breakpoints,n),n};function K(e={}){const{createStyledComponent:s=I,useThemeProps:n=W,componentName:a="MuiStack"}=e,c=()=>M({root:["root"]},o=>O(a,o),{}),t=s(H);return d.forwardRef(function(o,r){const i=n(o),l=E(i),{component:u="div",direction:x="column",spacing:j=0,divider:y,children:g,className:P,useFlexGap:C=!1}=l,S=G(l,J),R={direction:x,spacing:j,useFlexGap:C},T=c();return N.jsx(t,k({as:u,ownerState:R,ref:r,className:_(T.root,P)},S,{children:y?q(g,y):g}))})}const X=K({createStyledComponent:U("div",{name:"JoyStack",slot:"Root",overridesResolver:(e,s)=>s.root}),useThemeProps:e=>A({props:e,name:"JoyStack"})});export{X as S};