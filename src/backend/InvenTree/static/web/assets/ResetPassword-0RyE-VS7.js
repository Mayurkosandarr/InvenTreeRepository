import{r as x,j as e,C as g,l as _,S as h,T as j,f2 as k,i as t,v as C,n as a}from"./vendor-9x6k4T-r.js";import{e as E,L as T,a as l}from"./ThemeContext-DRe09WSE.js";import{a as P}from"./DesktopAppView-D7dqNL6j.js";import{a as A,e as S,A as z}from"./index-Bd_yPD7D.js";import{u as F}from"./use-form-Cwc3m1M6.js";function B(){const o=F({initialValues:{password:""}}),[r]=P(),n=E(),i=r.get("token"),d=r.get("uid");function p(){a.show({title:t._({id:"eV2FZ+"}),message:t._({id:"uAHzZQ"}),color:"red"}),n("/login")}function c(s){a.show({title:t._({id:"WhimMi"}),message:(s==null?void 0:s.new_password2)||(s==null?void 0:s.new_password1)||(s==null?void 0:s.token),color:"red"})}x.useEffect(()=>{(!i||!d)&&p()},[i]);function u(){A.post(S(z.user_reset_set),{uid:d,token:i,new_password1:o.values.password,new_password2:o.values.password},{headers:{Authorization:""}}).then(s=>{s.status===200?(a.show({title:t._({id:"Hw2MHB"}),message:t._({id:"+p8fKY"}),color:"green",autoClose:!1}),n("/login")):c(s.data)}).catch(s=>{var m,w,f;((m=s.response)==null?void 0:m.status)===400&&((f=(w=s.response)==null?void 0:w.data)==null?void 0:f.token)=="Invalid value"?p():c(s.response.data)})}return e.jsx(T,{children:e.jsx(g,{mih:"100vh",children:e.jsx(_,{w:"md",miw:425,children:e.jsxs(h,{children:[e.jsx(j,{children:e.jsx(l,{id:"V/e7nf"})}),e.jsx(h,{children:e.jsx(k,{required:!0,label:t._({id:"8ZsakT"}),description:t._({id:"Wr5sDQ"}),...o.getInputProps("password")})}),e.jsx(C,{type:"submit",onClick:u,children:e.jsx(l,{id:"i/TzEU"})})]})})})})}export{B as default};
