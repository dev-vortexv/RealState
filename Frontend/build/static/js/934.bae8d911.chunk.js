"use strict";(self.webpackChunkQueenevaagentai=self.webpackChunkQueenevaagentai||[]).push([[934],{14974:function(e,a,l){var t=l(47313),r=l(31095),n=l(66149),i=l(9019),s=l(1550),o=l(5178),d=l(55685),c=l(74268),h=l(88797),x=l(51405),u=l(24631),p=l(4117),m=l(96467),g=l(97762),j=l(33604),v=l(61113),Z=l(23195),f=l(83929),C=l(79429),b=(l(3463),l(31387)),y=l(35460),w=l(6210),D=l(78830),N=l(46417);a.Z=e=>{const{open:a,handleClose:l}=e,[S,T]=(0,t.useState)([]),[k,I]=(0,t.useState)([]),_=JSON.parse(localStorage.getItem("user"));(0,t.useEffect)((()=>{(async()=>{try{const e=await(0,w.ac)("admin"===_.role?"api/contact/viewallcontacts":`api/contact/viewusercontacts/${_._id}`);"admin"===_.role?T(e.data.contactDetails):T(e.data)}catch(e){console.log(e)}})(),(async()=>{try{const e=await(0,w.ac)("admin"===_.role?"api/lead/viewallleads":`api/lead/viewuserleads/${_._id}`);I(null===e||void 0===e?void 0:e.data)}catch(e){console.log(e)}})()}),[]);const A=(0,C.TA)({initialValues:{recipient:"default",callDuration:"",startDate:"",endDate:"",callNotes:"",category:"lead"},validationSchema:D.Fv,onSubmit:async(e,a)=>{let{resetForm:t}=a;(async(e,a)=>{e.sender=JSON.parse(localStorage.getItem("user"))._id;try{"contact"===e.category?e.createBy=e.recipient:e.createByLead=e.recipient,200===(await(0,w.Fv)("api/phoneCall/add",e)).status?(b.Am.success("Call Added successfully"),l(),a()):(b.Am.error("Cannot Add Call"),a())}catch(t){b.Am.error("Cannot Add Call"),a()}})(e,t)}});return(0,N.jsx)("div",{children:(0,N.jsxs)(n.Z,{open:a,onClose:l,"aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description",children:[(0,N.jsxs)(j.Z,{id:"scroll-dialog-title",style:{display:"flex",justifyContent:"space-between"},children:[(0,N.jsx)(v.Z,{variant:"h6",children:"Create Call"}),(0,N.jsx)(v.Z,{children:(0,N.jsx)(Z.Z,{onClick:l,style:{cursor:"pointer"}})})]}),(0,N.jsx)(m.Z,{dividers:!0,sx:{width:"100%",minWidth:"600px"},children:(0,N.jsx)("form",{children:(0,N.jsxs)(g.Z,{id:"scroll-dialog-description",tabIndex:-1,children:[(0,N.jsx)(i.ZP,{item:!0,xs:12,sm:12,md:6,children:(0,N.jsxs)(s.Z,{fullWidth:!0,children:[(0,N.jsx)(o.Z,{sx:{marginTop:"2px"},children:"Related To"}),(0,N.jsxs)(d.Z,{row:!0,"aria-label":"category",name:"category",value:A.values.category,onChange:A.handleChange,children:[(0,N.jsx)(f.Z,{value:"contact",control:(0,N.jsx)(c.Z,{}),label:"Contact"}),(0,N.jsx)(f.Z,{value:"lead",control:(0,N.jsx)(c.Z,{}),label:"Lead"})]})]})}),(0,N.jsx)(i.ZP,{item:!0,xs:12,sm:12,md:12,sx:{marginTop:"3px"},children:(0,N.jsxs)(s.Z,{fullWidth:!0,children:[(0,N.jsx)(o.Z,{children:"contact"===A.values.category?"Recipient ( contact )":"Recipient ( lead )"}),(0,N.jsx)(h.Z,{id:"recipient",name:"recipient",label:"",size:"small",fullWidth:!0,value:A.values.recipient,onChange:A.handleChange,error:A.touched.recipient&&Boolean(A.errors.recipient),children:"contact"===A.values.category?[(0,N.jsx)(x.Z,{value:"default",disabled:!0,children:"Assignment To"},"default"),...S.map((e=>(0,N.jsx)(x.Z,{value:e._id,children:e.firstName},e._id)))]:[(0,N.jsx)(x.Z,{value:"default",disabled:!0,children:"Assignment To"},"default"),...k.map((e=>(0,N.jsx)(x.Z,{value:e._id,children:e.leadName},e._id)))]})]})}),(0,N.jsxs)(i.ZP,{item:!0,xs:12,sm:4,md:4,sx:{marginTop:"3px"},children:[(0,N.jsx)(o.Z,{children:"Start Date"}),(0,N.jsx)(u.Z,{id:"startDate",name:"startDate",label:"",type:"date",size:"small",fullWidth:!0,InputLabelProps:{shrink:!0},value:A.values.startDate,onChange:A.handleChange,error:A.touched.startDate&&Boolean(A.errors.startDate),helperText:A.touched.startDate&&A.errors.startDate})]}),(0,N.jsxs)(i.ZP,{item:!0,xs:12,sm:4,md:4,sx:{marginTop:"3px"},children:[(0,N.jsx)(o.Z,{children:"End Date"}),(0,N.jsx)(u.Z,{id:"endDate",name:"endDate",label:"",type:"date",size:"small",fullWidth:!0,InputLabelProps:{shrink:!0},value:A.values.endDate,onChange:A.handleChange,error:A.touched.endDate&&Boolean(A.errors.endDate),helperText:A.touched.endDate&&A.errors.endDate})]}),(0,N.jsxs)(i.ZP,{item:!0,xs:12,sm:12,md:12,sx:{marginTop:"3px"},children:[(0,N.jsx)(o.Z,{children:"Call Duration"}),(0,N.jsx)(u.Z,{id:"callDuration",name:"callDuration",label:"",size:"small",fullWidth:!0,placeholder:"Enter call duration",value:A.values.callDuration,onChange:A.handleChange,error:A.touched.callDuration&&Boolean(A.errors.callDuration),helperText:A.touched.callDuration&&A.errors.callDuration})]}),(0,N.jsxs)(i.ZP,{item:!0,xs:12,sm:12,md:12,sx:{marginTop:"3px"},children:[(0,N.jsx)(o.Z,{children:"Notes"}),(0,N.jsx)(u.Z,{id:"callNotes",name:"callNotes",label:"",size:"small",multiline:!0,rows:5,fullWidth:!0,placeholder:"Enter Call notes",value:A.values.callNotes,onChange:A.handleChange,error:A.touched.callNotes&&Boolean(A.errors.callNotes),helperText:A.touched.callNotes&&A.errors.callNotes})]})]})})}),(0,N.jsx)(p.Z,{children:(0,N.jsx)(r.Z,{onClick:A.handleSubmit,variant:"contained",style:{backgroundColor:y.Z.info,color:"#fff"},children:"Add Call"})})]})})}},14934:function(e,a,l){l.r(a);var t=l(97890),r=l(77276),n=l(85833),i=l(98616),s=l(67662),o=l(47313),d=l(41806),c=l(47825),h=l(42832),x=l(61113),u=l(31095),p=l(73428),m=l(10237),g=l(17592),j=l(17551),v=l(85582),Z=l(51405),f=l(14974),C=l(6210),b=l(70816),y=l.n(b),w=l(46417);(0,g.ZP)((e=>(0,w.jsx)(v.Z,{elevation:0,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},...e})))((e=>{let{theme:a}=e;return{"& .MuiPaper-root":{borderRadius:6,marginTop:a.spacing(1),minWidth:180,color:"light"===a.palette.mode?"rgb(55, 65, 81)":a.palette.grey[300],boxShadow:"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px","& .MuiMenu-list":{padding:"4px 0"},"& .MuiMenuItem-root":{"& .MuiSvgIcon-root":{fontSize:18,color:a.palette.text.secondary,marginRight:a.spacing(1.5)},"&:active":{backgroundColor:(0,j.Fq)(a.palette.primary.main,a.palette.action.selectedOpacity)}}}}}));a.default=()=>{const[e,a]=(0,o.useState)(!1),[l,g]=(0,o.useState)([]),[j,v]=(0,o.useState)(""),[b,D]=o.useState(null),N=(0,t.s0)(),S=JSON.parse(localStorage.getItem("user"));(0,o.useEffect)((()=>{(async()=>{try{const e=await(0,C.ac)("admin"===S.role?"api/phoneCall/viewallcalls":`api/phoneCall/viewusercalls/${S._id}`);g(null===e||void 0===e?void 0:e.data)}catch(e){console.log(e)}})()}),[e]);let T=0;const k=[{field:"id",headerName:"#",flex:1,renderCell:e=>(0,w.jsxs)(d.Z,{children:[" ",T+=1]})},{field:"senderName",headerName:"Sender",flex:1,cellClassName:"name-column--cell name-column--cell--capitalize",renderCell:e=>(0,w.jsx)(d.Z,{onClick:()=>{N(`/calls/view/${e.row._id}`)},children:e.value})},{field:"recipientName",headerName:"Recipient",flex:1},{field:"category",headerName:"Realeted To",flex:1},{field:"timestamp",headerName:"Timestamp",flex:1,renderCell:e=>(0,w.jsx)(d.Z,{children:y()(e.row.timestamp).fromNow()})},{field:"startDate",headerName:"Created",flex:1,renderCell:e=>{const a=e.row.startDate;return(0,w.jsx)(d.Z,{children:y().unix(a).format("(MM/DD) hh:mma")})}},{field:"action",headerName:"Action",flex:1,renderCell:e=>(0,w.jsx)(w.Fragment,{children:(0,w.jsx)("div",{children:(0,w.jsxs)(Z.Z,{onClick:()=>{return a=e.row._id,void N(`/calls/view/${a}`);var a},disableRipple:!0,children:[(0,w.jsx)(m.Z,{style:{marginRight:"8px",color:"green"}}),"View"]})})})}];return(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(f.Z,{open:e,handleClose:()=>a(!1)}),(0,w.jsxs)(c.Z,{children:[(0,w.jsxs)(h.Z,{direction:"row",alignItems:"center",mb:5,justifyContent:"space-between",children:[(0,w.jsx)(x.Z,{variant:"h4",children:"Calls"}),(0,w.jsx)(h.Z,{direction:"row",alignItems:"center",justifyContent:"flex-end",spacing:2,children:(0,w.jsx)(u.Z,{variant:"contained",startIcon:(0,w.jsx)(i.Z,{icon:"eva:plus-fill"}),onClick:()=>a(!0),children:"New Call"})})]}),(0,w.jsx)(s.Z,{children:(0,w.jsx)(d.Z,{width:"100%",children:(0,w.jsxs)(p.Z,{style:{height:"600px",paddingTop:"15px"},children:[(0,w.jsxs)(x.Z,{variant:"h4",sx:{margin:"2px 15px"},children:["Calls ( ",(null===l||void 0===l?void 0:l.length)||0," )"]}),l&&(0,w.jsx)(r._$,{rows:l,columns:k,checkboxSelection:!0,getRowId:e=>e._id,slots:{toolbar:n.n},slotProps:{toolbar:{showQuickFilter:!0}}})]})})})]})]})}}}]);