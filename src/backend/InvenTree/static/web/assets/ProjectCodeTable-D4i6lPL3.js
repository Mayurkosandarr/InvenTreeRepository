import{r as o,i as t,j as s}from"./vendor-9x6k4T-r.js";import{u as _,a as f,b as A,A as k}from"./UseForm-C7xHtQGh.js";import{c as x,A as r,U as m,e as R}from"./index-Bd_yPD7D.js";import{p as u}from"./CommonForms-7Y99pmHv.js";import{u as h,R as D,a as F,I as P}from"./InvenTreeTable-KDc6oHjF.js";import{D as w,f as E}from"./ColumnRenderers-CTwRHGdM.js";import"./DesktopAppView-D7dqNL6j.js";import"./ThemeContext-DRe09WSE.js";import"./dayjs.min-DUmzidR_.js";import"./ApiIcon-BBFuOj6_.js";import"./Instance-ZaRjKoLj.js";import"./navigation-BUwul1Ze.js";import"./ActionDropdown-DlGcqXhK.js";import"./YesNoButton-BsHbI51V.js";import"./formatters-MBbtNL9a.js";function L(){const e=h("project-codes"),i=x(),j=o.useMemo(()=>[{accessor:"code",sortable:!0},w({}),E({})],[]),a=_({url:r.project_code_list,title:t._({id:"FhC+KB"}),fields:u(),table:e}),[l,n]=o.useState(void 0),d=f({url:r.project_code_list,pk:l,title:t._({id:"9+Sxmn"}),fields:u(),table:e}),c=A({url:r.project_code_list,pk:l,title:t._({id:"tGsebi"}),table:e}),C=o.useCallback(p=>[D({hidden:!i.hasChangeRole(m.admin),onClick:()=>{n(p.pk),d.open()}}),F({hidden:!i.hasDeleteRole(m.admin),onClick:()=>{n(p.pk),c.open()}})],[i]),b=o.useMemo(()=>[s.jsx(k,{onClick:()=>a.open(),tooltip:t._({id:"6K55qI"})},"add")],[]);return s.jsxs(s.Fragment,{children:[a.modal,d.modal,c.modal,s.jsx(P,{url:R(r.project_code_list),tableState:e,columns:j,props:{rowActions:C,tableActions:b,enableDownload:!0}})]})}export{L as default};
