(this["webpackJsonptwilio-for-zoho-crm"]=this["webpackJsonptwilio-for-zoho-crm"]||[]).push([[1],{10:function(e,t,n){"use strict";n.d(t,"C",(function(){return a})),n.d(t,"B",(function(){return r})),n.d(t,"a",(function(){return o})),n.d(t,"o",(function(){return c})),n.d(t,"n",(function(){return s})),n.d(t,"q",(function(){return i})),n.d(t,"v",(function(){return l})),n.d(t,"u",(function(){return u})),n.d(t,"m",(function(){return d})),n.d(t,"d",(function(){return j})),n.d(t,"A",(function(){return b})),n.d(t,"s",(function(){return h})),n.d(t,"z",(function(){return O})),n.d(t,"w",(function(){return f})),n.d(t,"k",(function(){return m})),n.d(t,"f",(function(){return p})),n.d(t,"c",(function(){return g})),n.d(t,"h",(function(){return v})),n.d(t,"x",(function(){return x})),n.d(t,"b",(function(){return y})),n.d(t,"y",(function(){return _})),n.d(t,"g",(function(){return S})),n.d(t,"e",(function(){return w})),n.d(t,"l",(function(){return C})),n.d(t,"p",(function(){return N})),n.d(t,"r",(function(){return E})),n.d(t,"t",(function(){return k})),n.d(t,"j",(function(){return A})),n.d(t,"i",(function(){return D}));var a="USER_LOADING",r="USER_LOADED",o="AUTH_ERROR",c="LOGIN_SUCCESS",s="LOGIN_FAIL",i="LOGOUT_SUCCESS",l="REGISTER_SUCCESS",u="REGISTER_FAIL",d="GET_ERRORS",j="CLEAR_ERRORS",b="UPDATE_PROFILE_SUCCESS",h="NO_ERRORS",O="UPDATE_PROFILE_IMAGE_SUCCESS",f="SAVE_CONTACT_SUCCESS",m="GET_CONTACTS_SUCCESS",p="EDIT_CONTACT_SUCCESS",g="CLEAR_CONTACTS_DATA",v="FETCH_CHAT_SUCCESS",x="SEND_SMS_SUCCESS",y="CLEAR_CHAT_HISTORY",_="SYNC_CONTACTS_SUCCESS",S="FETCH_ACCESS_TOKEN",w="DISCONNECT_CALL",C="GET_DASHBOARD_DATA",N="LOGIN_TEMP",E="NEVER_ASK_FOR_PERMISSION",k="ON_UPDATE_HOOKS",A="FETCH_TO_NUMBERS_SUCCESS",D="FETCH_FROM_NUMBERS_SUCCESS"},120:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"c",(function(){return j})),n.d(t,"b",(function(){return b}));var a=n(9),r=n(29),o=n.n(r),c=n(55),s=n(38),i=(n(40),n(10)),l=n(56),u=n.n(l),d=function(e){var t=e.email,n=e.password,r=e.userAlreadyExists;return function(e){Object(s.a)();var l=JSON.stringify({email:t,password:n,userAlreadyExists:r});o.a.post("/api/login",l,{headers:{"Content-Type":"application/json"}}).then((function(t){console.log(t);var n=t.data.lastSyncTime,r=u()().diff(u()(n),"days");e(r<=1?{type:i.o,payload:Object(a.a)(Object(a.a)({},t.data),{},{showSync:!1})}:{type:i.p,payload:Object(a.a)(Object(a.a)({},t.data),{},{showSync:!0})})})).catch((function(t){e(Object(c.c)(t.response.data,t.response.status,"LOGIN_FAIL")),e({type:i.n})}))}},j=function(e){return function(t){t({type:i.o,payload:e})}},b=function(){return{type:i.q}}},164:function(e,t,n){var a={"./ion-action-sheet.entry.js":[341,6],"./ion-alert.entry.js":[342,7],"./ion-app_8.entry.js":[343,8],"./ion-avatar_3.entry.js":[344,18],"./ion-back-button.entry.js":[345,19],"./ion-backdrop.entry.js":[346,45],"./ion-button_2.entry.js":[347,20],"./ion-card_5.entry.js":[348,21],"./ion-checkbox.entry.js":[349,22],"./ion-chip.entry.js":[350,23],"./ion-col_3.entry.js":[351,46],"./ion-datetime_3.entry.js":[352,11],"./ion-fab_3.entry.js":[353,24],"./ion-img.entry.js":[354,47],"./ion-infinite-scroll_2.entry.js":[355,48],"./ion-input.entry.js":[356,25],"./ion-item-option_3.entry.js":[357,26],"./ion-item_8.entry.js":[358,27],"./ion-loading.entry.js":[359,28],"./ion-menu_3.entry.js":[360,29],"./ion-modal.entry.js":[361,9],"./ion-nav_2.entry.js":[362,15],"./ion-popover.entry.js":[363,10],"./ion-progress-bar.entry.js":[364,30],"./ion-radio_2.entry.js":[365,31],"./ion-range.entry.js":[366,32],"./ion-refresher_2.entry.js":[367,12],"./ion-reorder_2.entry.js":[368,17],"./ion-ripple-effect.entry.js":[369,49],"./ion-route_4.entry.js":[370,33],"./ion-searchbar.entry.js":[371,34],"./ion-segment_2.entry.js":[372,35],"./ion-select_3.entry.js":[373,36],"./ion-slide_2.entry.js":[374,50],"./ion-spinner.entry.js":[375,14],"./ion-split-pane.entry.js":[376,51],"./ion-tab-bar_2.entry.js":[377,37],"./ion-tab_2.entry.js":[378,16],"./ion-text.entry.js":[379,38],"./ion-textarea.entry.js":[380,39],"./ion-toast.entry.js":[381,40],"./ion-toggle.entry.js":[382,13],"./ion-virtual-scroll.entry.js":[383,52]};function r(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],r=t[0];return n.e(t[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(a)},r.id=164,e.exports=r},166:function(e,t,n){var a={"./ion-icon.entry.js":[384,59]};function r(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],r=t[0];return n.e(t[1]).then((function(){return n(r)}))}r.keys=function(){return Object.keys(a)},r.id=166,e.exports=r},200:function(e,t){},202:function(e,t,n){},291:function(e,t,n){},300:function(e,t,n){},337:function(e,t,n){},338:function(e,t,n){},339:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(41),c=n.n(o),s=n(3),i=n(9),l=n(71),u=n(10),d={token:localStorage.getItem("token"),isAuthenticated:!!localStorage.getItem("isAuthenticated")&&localStorage.getItem("isAuthenticated"),zoho_user_role:localStorage.getItem("zoho_user_role"),webhook_permission:localStorage.getItem("webhook_permission"),isLoading:!1,user:JSON.parse(localStorage.getItem("user")),tempLoginData:[],tempToken:"",onUpdateHooks:!1,showSync:!1};var j={msg:{},noErrorMsg:null,status:null,id:null,noError:!1};var b={contacts:[],contactData:{},sync:!1};var h={chat:[],user:{},contactsList:[],smsSent:!1,setting:{},toNumbers:[],fromNumbers:[]};var O={inboundMsgs:0,outboundMsgs:0,incommingCalls:0,outgoingCalls:0,totalContacts:0,fiveContacts:[],messages:[],calls:[]};var f={auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u.C:return Object(i.a)(Object(i.a)({},e),{},{isLoading:!0});case u.B:return Object(i.a)(Object(i.a)({},e),{},{isAuthenticated:!0,isLoading:!1,user:t.payload});case u.r:return localStorage.setItem("webhook_permission",t.payload.webhook_permission),Object(i.a)(Object(i.a)({},e),{},{webhook_permission:t.payload.webhook_permission});case u.t:return Object(i.a)(Object(i.a)({},e),{},{onUpdateHooks:!0});case u.o:case u.v:var n;return t.payload?(localStorage.setItem("token",null===t||void 0===t||null===(n=t.payload)||void 0===n?void 0:n.token),localStorage.setItem("isAuthenticated",!0),localStorage.setItem("zoho_user_role",t.payload.user.zoho_user_role),localStorage.setItem("webhook_permission",t.payload.user.webhook_permission),localStorage.setItem("user",JSON.stringify(t.payload.user)),Object(i.a)(Object(i.a)(Object(i.a)({},e),t.payload),{},{isAuthenticated:!0,isLoading:!1,user:t.payload.user,zoho_user_role:t.payload.user.zoho_user_role,webhook_permission:t.payload.user.webhook_permission,showSync:t.payload.showSync})):e;case u.p:return localStorage.setItem("tempLoginData",JSON.stringify(t.payload)),Object(i.a)(Object(i.a)(Object(i.a)({},e),t.payload),{},{tempToken:t.payload.token,tempLoginData:t.payload,showSync:t.payload.showSync});case u.A:case u.z:return localStorage.setItem("user",JSON.stringify(t.payload.user)),Object(i.a)(Object(i.a)({},e),{},{user:t.payload.user});case u.a:case u.n:case u.q:case u.u:localStorage.removeItem("token"),localStorage.removeItem("isAuthenticated"),localStorage.removeItem("user"),localStorage.removeItem("zoho_user_role"),localStorage.removeItem("webhook_permission");try{localStorage.clear()}catch(a){}return Object(i.a)(Object(i.a)({},e),{},{token:null,user:null,isAuthenticated:!1,isLoading:!1,showSync:!1});default:return e}},error:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:j,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u.m:return{msg:t.payload.msg,status:t.payload.status,id:t.payload.id,noError:!1};case u.d:return{msg:{},status:null,id:null,noError:!1,noErrorMsg:null};case u.s:return{noError:!0,noErrorMsg:t.payload.msg};default:return e}},contact:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u.k:return Object(i.a)(Object(i.a)({},e),{},{contacts:t.payload.contacts});case u.y:return Object(i.a)(Object(i.a)({},e),{},{sync:!0});case u.w:return Object(i.a)(Object(i.a)({},e),{},{contactData:{}});case u.f:return Object(i.a)(Object(i.a)({},e),{},{contactData:t.payload.contactData});case u.c:return Object(i.a)(Object(i.a)({},e),{},{contactData:{},sync:!1});default:return e}},sms:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u.h:return Object(i.a)(Object(i.a)({},e),{},{chat:t.payload.chat,user:t.payload.user,contactsList:t.payload.contactsList,setting:t.payload.setting});case u.b:return Object(i.a)(Object(i.a)({},e),{},{chat:[],user:{},contactsList:[]});case u.x:return Object(i.a)(Object(i.a)({},e),{},{smsSent:!0});case u.j:return Object(i.a)(Object(i.a)({},e),{},{toNumbers:t.payload.contactData});case u.i:return Object(i.a)(Object(i.a)({},e),{},{fromNumbers:t.payload.contactData});default:return e}},dashboard:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u.l:return Object(i.a)(Object(i.a)({},e),{},{inboundMsgs:t.payload.inboundMsgs,outboundMsgs:t.payload.outboundMsgs,incommingCalls:t.payload.incommingCalls,outgoingCalls:t.payload.outgoingCalls,totalContacts:t.payload.totalContacts,fiveContacts:t.payload.fiveContacts,messages:t.payload.messages});default:return e}}},m=n(146),p={},g=[m.a],v=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||l.c;var x=n(86),y=n(45),_=n(387),S=n(153),w=n(18),C=n(19),N=n(21),E=n(22),k=n(1),A=function(e){Object(N.a)(n,e);var t=Object(E.a)(n);function n(e){var a;return Object(w.a)(this,n),(a=t.call(this,e)).state={hasError:!1,error:null},a}return Object(C.a)(n,[{key:"componentDidCatch",value:function(e,t){this.setState({hasError:!0}),this.setState({error:e.toString()})}},{key:"render",value:function(){return this.state.hasError?Object(k.jsxs)("div",{className:"error-boundry",children:[Object(k.jsx)("div",{className:"report-msg",children:"Hi, sorry an error occurred. We'll check the logs and get a fix ASAP but it would be helpful if you could email a screenshot of this screen to team@ethicaltechnology.co and mention briefly what you were doing. Thanks for being a beta tester!"}),Object(k.jsx)("div",{className:"error",children:this.state.error})]}):this.props.children}}]),n}(r.a.Component),D=n(49),I=n(29),L=n.n(I),T=n(100),M=n.n(T),R=n(148),P=n(34),U=n(157),F=n(12),H=n.n(F),z=n(28),B=n(42),G=n(11),J=n(20),W=function(e){var t=function(){var t=Object(z.a)(H.a.mark((function t(n){return H.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.handleRefresh().then((function(){n.target.complete()}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(k.jsx)(s.w,{slot:"fixed",onIonRefresh:t,pullFactor:.5,pullMin:120,children:Object(k.jsx)(s.x,{refreshingSpinner:"lines",pullingText:"Pull to sync with Zoho",refreshingText:"Syncing...",pullingIcon:J.b})})},q=function(e){var t=e.contact,n=Object(P.f)();return Object(k.jsxs)(s.r,{button:!0,lines:"none",className:"message-item",onClick:function(){n.push("/chat/".concat(t.id))},children:[Object(k.jsx)(s.o,{className:"avatar",icon:J.s}),Object(k.jsx)(s.s,{className:"contact-details",children:Object(k.jsxs)("h1",{children:[t.first_name," ",t.last_name]})})]})},Z=n(149),K=n.n(Z),Y=function(e){var t=e.url,n=e.method,a=void 0===n?"get":n,r=e.data;return L.a.request({url:t,method:a.toUpperCase(),data:r,params:r,paramsSerializer:function(e){return K.a.stringify(e,{arrayFormat:"indices"})}})},X=n(38),V=n(40),Q=n(150),$=function(e){for(var t=e.quantity,n=e.height,a=[],r=0;r<t;r++)a.push(Object(k.jsxs)(s.r,{lines:"none",className:"message-item",children:[Object(k.jsx)(s.c,{slot:"start",children:Object(k.jsx)(s.G,{animated:!0})}),Object(k.jsx)(s.s,{className:"contact-details",children:Object(k.jsx)(s.G,{animated:!0,style:{height:"".concat(n,"px")}})})]},r));return a},ee=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return{value:e,regex:t}},te=[{data:"action",name:"action",html:!0,orderable:!1,searchable:!1},{data:"first_name",name:"first_name"},{data:"last_name",name:"last_name"},{data:"email",name:"email"},{data:"number",name:"number"},{data:"status",name:"status",html:!0},{data:"type",name:"type"},{data:"created_at",name:"created_at"}],ne=function(){Object(X.a)(),Object(V.a)();var e=Object(a.useState)(0),t=Object(G.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(15),c=Object(G.a)(o,2),i=c[0],l=(c[1],Object(a.useState)("")),u=Object(G.a)(l,2),d=u[0],j=u[1],b=Object(a.useState)(7),h=Object(G.a)(b,2),O=h[0],f=(h[1],Object(a.useState)("desc")),m=Object(G.a)(f,2),p=m[0],g=(m[1],Object(a.useState)(1)),v=Object(G.a)(g,2),x=v[0],y=v[1],_=Object(a.useState)(!0),S=Object(G.a)(_,2),w=S[0],C=S[1],N=Object(a.useState)(0),E=Object(G.a)(N,2),A=E[0],D=E[1],I=Object(a.useState)(0),L=Object(G.a)(I,2),T=(L[0],L[1]),M=Object(a.useState)([]),R=Object(G.a)(M,2),P=R[0],U=R[1],F=Object(a.useRef)(null),J=function(e,t){return{columns:te.slice(0).map((function(e){return Object.assign({searchable:!0,orderable:!0,search:ee("")},e)})),start:t*i,length:i,search:ee(e),order:[{column:O,dir:p}],draw:x}},Z=function(e,t){"Token is Expired"===e.data.status?C(!1):(C(!1),D(e.data.recordsTotal),T(e.data.recordsFiltered),y(e.data.draw+1),U(t?[].concat(Object(B.a)(P),Object(B.a)(e.data.data)):e.data.data))},K=function(){var e=Object(z.a)(H.a.mark((function e(){var t,a=arguments;return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]&&a[0],e.abrupt("return",new Promise((function(e){Y({url:"/api/contacts-list",method:"get",data:J(d,n)}).then((function(n){Z(n,t),e()}))})));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ne=Object(Q.debounce)((function(){console.log("handle search"),C(!0),K()}),500);return Object(a.useEffect)((function(){0===n&&ne()}),[d]),Object(a.useEffect)((function(){n>0&&K(!0).then((function(){F.current.complete()}))}),[n]),Object(a.useEffect)((function(){C(!0),K()}),[]),Object(k.jsxs)(s.u,{children:[Object(k.jsx)(s.n,{children:Object(k.jsx)(s.O,{children:Object(k.jsx)(s.M,{children:"Contacts"})})}),Object(k.jsxs)(s.l,{fullscreen:!0,children:[Object(k.jsx)(W,{handleRefresh:K}),Object(k.jsx)(s.n,{collapse:"condense",children:Object(k.jsx)(s.O,{children:Object(k.jsx)(s.M,{size:"large",children:"Contacts"})})}),Object(k.jsx)(s.B,{onIonChange:function(e){r(0),j(e.target.value)}}),w?Object(k.jsx)("div",{style:{marginTop:"28px"},children:Object(k.jsx)($,{quantity:9,height:20,heightOffset:1})}):Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)("div",{style:{textAlign:"center"},children:[A," Contacts"]}),Object(k.jsx)(s.t,{children:P.map((function(e){return Object(k.jsx)(q,{contact:e},e.id)}))})]}),Object(k.jsx)(s.p,{ref:F,threshold:"100px",onIonInfinite:function(){r((function(e){return e+1}))},children:Object(k.jsx)(s.q,{})})]})]})},ae=function(){return Object(k.jsxs)(s.u,{children:[Object(k.jsx)(s.n,{children:Object(k.jsx)(s.O,{children:Object(k.jsx)(s.M,{children:"Calls"})})}),Object(k.jsxs)(s.l,{fullscreen:!0,children:[Object(k.jsx)(s.n,{collapse:"condense",children:Object(k.jsx)(s.O,{children:Object(k.jsx)(s.M,{size:"large",children:"Calls"})})}),Object(k.jsx)("div",{children:"Calls Page"})]})]})},re=n(388),oe=n(151),ce=n(56),se=n.n(ce),ie=function(e){var t=Object(P.f)();return Object(k.jsxs)(s.r,{button:!0,lines:"none",className:"message-item",onClick:function(){t.push("/chat/".concat(e.message.recent_message.contact_id))},children:[Object(k.jsx)(s.o,{className:"avatar",icon:J.s}),Object(k.jsx)("div",{className:"online"}),Object(k.jsxs)(s.s,{className:"contact-details",children:[Object(k.jsxs)("h1",{children:[e.message.first_name," ",e.message.last_name]}),Object(k.jsx)("p",{children:e.message.recent_message.body})]}),Object(k.jsx)("div",{className:"stats",children:Object(k.jsx)("p",{className:"last-online",children:se()(e.message.recent_message.updated_at).calendar(null,{sameDay:"h:mm A",lastDay:"[Yesterday]",lastWeek:"dddd",sameElse:"M/D/YY"})})})]})},le=n(120),ue=D.b.PusherBeamNotification,de=Object(y.b)(null,(function(e){return{logout:function(){return e(Object(le.b)())}}}))((function(e){var t=Object(s.X)(),n=Object(G.a)(t,1)[0],a=Object(P.f)(),r={buttons:[{text:"Logout",role:"destructive",handler:function(){o(),a.push("/Login"),console.log("Logging Out")}},{text:"Cancel",role:"cancel"}]},o=function(){ue.clearState(),e.logout()};return Object(k.jsx)(s.n,{children:Object(k.jsxs)(s.O,{children:[Object(k.jsx)(s.f,{slot:"end",children:Object(k.jsx)(s.e,{onClick:function(){return n(r)},children:Object(k.jsx)(s.o,{slot:"icon-only",icon:J.m})})}),Object(k.jsx)(s.M,{children:"Messages"})]})})})),je=function(e){Object(X.a)(),Object(V.a)();var t=e.queryKey[1],n=t.filterMode,a=t.perPage,r=t.pageNum,o=t.newestFirst;return L.a.get("/api/recent-conversations?mode=".concat(n,"&per_page=").concat(a,"&page=").concat(r,"&latest_to_oldest=").concat(o),{headers:{"Content-Type":"application/json"}})},be=function(e){Object(X.a)(),Object(V.a)();var t=JSON.stringify(e);return L.a.post("/api/send-sms",t,{headers:{"Content-Type":"application/json"}}).then((function(e){return e.data})).catch((function(e){return e.response.data}))},he=(n(202),function(){var e=Object(a.useState)([]),t=Object(G.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)(!0),c=Object(G.a)(o,2),l=c[0],u=c[1],d=Object(a.useState)({showPopover:!1,event:void 0}),j=Object(G.a)(d,2),b=j[0],h=j[1],O=Object(a.useState)({filterMode:"unreplied",perPage:20,pageNum:1,newestFirst:!0}),f=Object(G.a)(O,2),m=f[0],p=f[1],g=Object(re.a)(["conversationsQuery",m],je),v=g.data,x=g.refetch,y=function(){var e=Object(z.a)(H.a.mark((function e(t){return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){x().then((function(){e()}))})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){var e;(null===v||void 0===v||null===(e=v.data)||void 0===e?void 0:e.contacts)&&r(v.data.contacts)}),[v]),Object(a.useEffect)((function(){v&&u(!1)}),[v]),Object(k.jsxs)(s.u,{children:[Object(k.jsx)(de,{}),Object(k.jsxs)(s.l,{fullscreen:!0,children:[Object(k.jsx)(W,{handleRefresh:y}),Object(k.jsx)(s.n,{collapse:"condense",children:Object(k.jsx)(s.O,{children:Object(k.jsx)(s.M,{size:"large",children:"Messages"})})}),Object(k.jsxs)(s.A,{className:"ion-align-items-center",children:[Object(k.jsx)(s.k,{children:Object(k.jsx)(s.B,{onIonChange:function(e){if(e.target.value){var t,n,a=Object(oe.a)(null!==(t=null===v||void 0===v||null===(n=v.data)||void 0===n?void 0:n.contacts)&&void 0!==t?t:[],e.target.value,{keys:["first_name","last_name","recent_message.send_from"]});r(a)}else{var o,c;r(null!==(o=null===v||void 0===v||null===(c=v.data)||void 0===c?void 0:c.contacts)&&void 0!==o?o:[])}}})}),Object(k.jsx)(s.e,{color:"light",onClick:function(e){h({showPopover:!0,event:e})},style:{"--border-radius":"999px",paddingRight:"10px"},children:Object(k.jsx)(s.o,{icon:J.n,color:"primary",slot:"icon-only"})})]}),Object(k.jsxs)(s.v,{cssClass:"contact-popover",event:b.event,isOpen:b.showPopover,onDidDismiss:function(){return h({showPopover:!1,event:void 0})},children:[Object(k.jsx)(s.r,{lines:"none",children:Object(k.jsxs)(s.C,{value:m.filterMode,onIonChange:function(e){p((function(t){return Object(i.a)(Object(i.a)({},t),{},{filterMode:e.detail.value})}))},children:[Object(k.jsx)(s.D,{value:"most-recently-touched",children:Object(k.jsx)(s.s,{children:"no filter"})}),Object(k.jsx)(s.D,{value:"unreplied",children:Object(k.jsx)(s.s,{children:"reply"})}),Object(k.jsx)(s.D,{value:"follow-up",children:Object(k.jsx)(s.s,{children:"follow up"})})]})}),Object(k.jsxs)(s.r,{lines:"none",children:[Object(k.jsx)(s.s,{position:"start",children:"Show newest first"}),Object(k.jsx)(s.N,{checked:m.newestFirst,name:"newestFirst",onIonChange:function(e){p((function(t){return Object(i.a)(Object(i.a)({},t),{},{newestFirst:e.detail.checked})}))}})]})]}),l?Object(k.jsx)($,{quantity:9,height:20}):Object(k.jsx)(s.t,{children:n.map((function(e){return Object(k.jsx)(ie,{message:e},e.recent_message.contact_id)}))})]})]})}),Oe=function(e){return Object(k.jsxs)(s.K,{children:[Object(k.jsx)(s.z,{children:Object(k.jsxs)(P.d,{children:[Object(k.jsx)(P.b,{exact:!0,path:"/Dashboard/chat",children:Object(k.jsx)(he,Object(i.a)({},e))}),Object(k.jsx)(P.b,{exact:!0,path:"/Dashboard/contact",children:Object(k.jsx)(ne,Object(i.a)({},e))}),Object(k.jsx)(P.b,{exact:!0,path:"/Dashboard/call",children:Object(k.jsx)(ae,Object(i.a)({},e))}),Object(k.jsx)(P.a,{from:"/Dashboard",exact:!0,to:"/Dashboard/chat"})]})}),Object(k.jsxs)(s.I,{slot:"bottom",children:[Object(k.jsx)(s.J,{tab:"tab1",href:"/Dashboard/chat",children:Object(k.jsx)(s.o,{icon:J.e})}),Object(k.jsx)(s.J,{tab:"tab2",href:"/Dashboard/contact",children:Object(k.jsx)(s.o,{icon:J.r})})]})]})},fe=n(121),me=n.n(fe),pe=n(154),ge=n.n(pe),ve=function(e){var t=e.toNumber,n=e.setToNumber,a=e.toNumbers,r=e.fromNumber,o=e.setFromNumber,c=e.fromNumbers,i=e.deliveryMethods,l=e.deliveryMethod,u=e.setDeliveryMethod,d=e.popoverState,j=e.setShowPopover;return Object(k.jsx)(s.v,{event:d.event,isOpen:d.showPopover,onDidDismiss:function(){return j({showPopover:!1,event:void 0})},children:Object(k.jsxs)(s.t,{children:[Object(k.jsxs)(s.r,{lines:"none",children:[Object(k.jsx)(s.s,{position:"floating",children:"Sending to"}),Object(k.jsx)(s.E,{value:t,placeholder:t,onIonChange:function(e){return n(e.detail.value)},children:a.map((function(e){return Object(k.jsx)(s.F,{value:e.to_number,children:e.to_number},e.to_number)}))})]}),Object(k.jsxs)(s.r,{lines:"none",style:{paddingTop:"20px"},children:[Object(k.jsx)(s.s,{position:"floating",children:"Sending from"}),Object(k.jsx)(s.E,{value:r,placeholder:r,onIonChange:function(e){return o(e.detail.value)},children:c.map((function(e){return Object(k.jsx)(s.F,{value:e.twilio_number,children:e.twilio_number},e.twilio_number)}))})]}),Object(k.jsxs)(s.r,{lines:"none",style:{paddingTop:"20px",paddingBottom:"20px"},children:[Object(k.jsx)(s.s,{position:"floating",children:"Delivery Method"}),Object(k.jsx)(s.E,{value:l,placeholder:l,onIonChange:function(e){return u(e.detail.value)},children:i.map((function(e){return Object(k.jsx)(s.F,{value:e.value,children:e.label},e.value)}))})]})]})})},xe=function(e){var t=e.contact,r=e.messages,o=e.setMessages,c=e.isLoading,i=e.toNumber,l=e.setToNumber,u=e.toNumbers,d=e.fromNumber,j=e.setFromNumber,b=e.fromNumbers,h=e.deliveryMethod,O=e.setDeliveryMethod,f=e.deliveryMethods,m=e.refetchChat,p=Object(a.useState)(""),g=Object(G.a)(p,2),v=g[0],x=g[1],y=Object(a.useState)(""),_=Object(G.a)(y,2),S=_[0],w=_[1],C=Object(a.useState)(!1),N=Object(G.a)(C,2),E=(N[0],N[1]),A=Object(a.useState)({showPopover:!1,event:void 0}),D=Object(G.a)(A,2),I=D[0],L=D[1],T=n(141),M=function(){var e=Object(z.a)(H.a.mark((function e(){var n,a,c,s,l;return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""===v){e.next=13;break}return n=i||t.number,a=v,c=r,x(""),E(!0),o((function(e){return[].concat(Object(B.a)(e),[{body:a,created_at:T(),direction:"outbound",send_from:d,send_to:i||t.number,isSending:!0}])})),s={send_to:"whatsapp"===h?"whatsapp:".concat(n):n,send_sms_text:a,contact_id:t.id,from_number:"whatsapp"===h?"whatsapp:".concat(d):d},e.next=10,be(s);case 10:(null===(l=e.sent)||void 0===l?void 0:l.success)?m():(o((function(){return Object(B.a)(c)})),w(null===l||void 0===l?void 0:l.msg)),E(!1);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(k.jsxs)(s.A,{style:{padding:"10px 20px","--border-radius":"20px","--background":"#f5f5f5"},children:[Object(k.jsx)(s.k,{children:Object(k.jsx)("div",{style:{padding:"10px 20px",borderRadius:"20px",background:"#f5f5f5"},children:Object(k.jsx)(s.L,{rows:"2",value:v,placeholder:"SMS Message",type:"text",onKeyDown:function(e){13===e.keyCode&&!1===e.shiftKey&&(e.preventDefault(),M())},onIonChange:function(e){x(e.target.value)}})})}),Object(k.jsx)("div",{style:{display:"flex",alignItems:"center"},children:""===v.trim()?Object(k.jsx)(s.e,{fill:"clear",onClick:function(e){e.persist(),L({showPopover:!0,event:e})},children:Object(k.jsx)(s.o,{size:"large",icon:J.m})}):Object(k.jsx)(s.e,{disabled:c||""===v.trim(),onClick:M,style:{"--border-radius":"999px",marginRight:"auto",marginLeft:"10px",float:"right"},children:Object(k.jsx)(s.o,{color:"primary",slot:"icon-only",icon:J.c})})}),Object(k.jsx)(ve,{toNumber:i,setToNumber:l,toNumbers:u,fromNumber:d,setFromNumber:j,fromNumbers:b,deliveryMethods:f,deliveryMethod:h,setDeliveryMethod:O,popoverState:I,setShowPopover:L}),Object(k.jsx)(s.a,{isOpen:!!S,onDidDismiss:function(){w("")},header:"Sending SMS Error",message:S,buttons:[{text:"Ok",handler:function(){w("")}}]})]})},ye=(n(291),n(70)),_e=(n(300),Object(a.forwardRef)((function(e,t){var n=e.contents,a=n.created_at,r=n.direction,o=n.body,c=n.isSending;return Object(k.jsxs)("div",{ref:t,style:{marginBottom:"10px"},className:"message ".concat("outbound"===r&&"message__sender"),children:[Object(k.jsxs)("section",{children:[Object(k.jsx)("div",{children:Object(k.jsxs)("p",{children:[o," "]})}),"outbound"===r&&Object(k.jsx)("div",{style:{paddingLeft:"10px"},children:c?Object(k.jsx)(s.H,{name:"lines-small"}):Object(k.jsx)(s.o,{icon:J.g})})]}),Object(k.jsx)("small",{className:"message__date ".concat("outbound"===r&&"message__date__outbound"),children:new Date(Date.parse(a)).toLocaleString()})]})}))),Se=function(e){var t=e.messages,n=e.isLoading,r=new ye.c({defaultHeight:150,minHeight:75}),o=function(e){var n=e.index,a=e.style,o=e.key,c=e.parent,s=t[n];return Object(k.jsx)(ye.b,{cache:r,parent:c,columnIndex:0,rowIndex:n,children:Object(k.jsx)("div",{style:a,children:Object(k.jsx)(_e,{contents:s},n)})},o)},c=Object(a.useCallback)((function(e){var n=e.width,a=e.rowRenderer,r=e.deferredMeasurementCache,o=e.rowHeight,c=e.height;return Object(k.jsx)(ye.d,{rowCount:t.length,scrollToIndex:t.length,width:n,height:c,deferredMeasurementCache:r,rowHeight:o,rowRenderer:a})}),[t]);return Object(k.jsxs)("div",{className:"chat__viewer",children:[n&&Object(k.jsxs)("div",{className:"ion-padding",children:[Object(k.jsx)(s.G,{animated:!0,className:"message__skeleton"}),Object(k.jsx)(s.G,{animated:!0,className:"message__skeleton message__skeleton__sender"}),Object(k.jsx)(s.G,{animated:!0,className:"message__skeleton"}),Object(k.jsx)(s.G,{animated:!0,className:"message__skeleton message__skeleton__sender"}),Object(k.jsx)(s.G,{animated:!0,className:"message__skeleton message__skeleton__sender"})]}),Object(k.jsx)(ye.a,{children:function(e){var t=e.width,n=e.height;return Object(k.jsx)(c,{rowRenderer:o,width:t,height:n,deferredMeasurementCache:r,rowHeight:r.rowHeight,overscanRowCount:3,scrollToAlignment:"end"})}})]})},we=function(e){var t=e.contact,n=e.crmLink,a=e.toNumber,r=e.isLoading;return Object(k.jsx)(s.n,{children:Object(k.jsxs)(s.O,{children:[Object(k.jsx)(s.f,{slot:"start",children:Object(k.jsx)(s.d,{defaultHref:"/Dashboard/chat"})}),Object(k.jsx)(s.M,{children:r?Object(k.jsx)(s.G,{animated:!0,style:{height:"30px",width:"30%",borderRadius:"30px"}}):Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("a",{href:n,target:"_blank",rel:"noopener noreferrer",style:{textDecoration:"none"},children:"".concat(t.first_name||""," ").concat(t.last_name||"")}),Object(k.jsx)("div",{style:{fontSize:"11px"},children:a})]})})]})})},Ce=[{label:"SMS",value:"sms"},{label:"Whatsapp",value:"whatsapp"}];var Ne=function(){var e=Object(a.useState)([]),t=Object(G.a)(e,2),r=t[0],o=t[1],c=Object(a.useState)(!0),i=Object(G.a)(c,2),l=i[0],u=i[1],d=Object(a.useState)({}),j=Object(G.a)(d,2),b=j[0],h=j[1],O=Object(a.useState)(""),f=Object(G.a)(O,2),m=f[0],p=f[1],g=Object(a.useState)([]),v=Object(G.a)(g,2),x=v[0],_=v[1],S=Object(a.useState)([]),w=Object(G.a)(S,2),C=w[0],N=w[1],E=Object(a.useState)(null),A=Object(G.a)(E,2),D=A[0],I=A[1],T=Object(a.useState)(null),M=Object(G.a)(T,2),R=M[0],U=M[1],F=Object(a.useState)(Ce[0].value),H=Object(G.a)(F,2),z=H[0],J=H[1],W=n(141),q=Object(P.g)().id,Z=Object(y.c)(),K=Object(re.a)(["chatHistory",q],(function(){return function(e){Object(X.a)(),Object(V.a)();var t=JSON.stringify({id:e});return L.a.post("/api/fetch-chat",t,{headers:{"Content-Type":"application/json"}})}(q)}),{enabled:!!q}),Y=K.data,Q=K.refetch,$=Object(re.a)(["fromNumbers",q],(function(){return function(e){return Object(X.a)(),Object(V.a)(),L.a.get("/api/from-number?id=".concat(e),{headers:{"Content-Type":"application/json"}})}(q)}),{enabled:!!q}).data,ee=Object(re.a)(["toNumbers",q],(function(){return function(e){return Object(X.a)(),Object(V.a)(),L.a.get("/api/fetch-to-number?id=".concat(e),{headers:{"Content-Type":"application/json"}})}(q)}),{enabled:!!q}).data;Object(a.useEffect)((function(){var e;Array.isArray(null===$||void 0===$||null===(e=$.data)||void 0===e?void 0:e.fromNumbers)&&N($.data.fromNumbers)}),[$]),Object(a.useEffect)((function(){var e;Array.isArray(null===ee||void 0===ee||null===(e=ee.data)||void 0===e?void 0:e.contactData)&&_(ee.data.contactData)}),[ee]),Object(a.useEffect)((function(){if($&&ee&&r){var e=r.length?r[r.length-1]:null;if(e){var t=e.send_from,n=e.send_to;((null===t||void 0===t?void 0:t.includes("whatsapp"))||(null===n||void 0===n?void 0:n.includes("whatsapp")))&&J(Ce[1].value),"outbound"===e.direction&&(I(t.replace("whatsapp:","")),U(n.replace("whatsapp:",""))),"inbound"===e.direction&&(U(t.replace("whatsapp:","")),I(n.replace("whatsapp:","")))}else{var a,o,c,s;U(null===(a=ee.data.contactData)||void 0===a||null===(o=a[0])||void 0===o?void 0:o.to_number),I(null===(c=$.data.fromNumbers)||void 0===c||null===(s=c[0])||void 0===s?void 0:s.twilio_number)}}}),[r,$,ee]);var te=Object(a.useCallback)((function(e){return null===e||void 0===e?void 0:e.sort((function(e,t){var n=new Date(e.created_at),a=new Date(t.created_at);return n.valueOf()-a.valueOf()}))}),[]);return Object(a.useEffect)((function(){new me.a("0f860d00d0bd2d8f3e73",{cluster:"us2"}).subscribe("incomming-channel").bind("chat-event",(function(e){q&&e.contact_id===parseInt(q)&&o((function(t){return t.filter((function(t){return t.sms_sid===e.smsSid})).length?t:te([].concat(Object(B.a)(t),[{sms_sid:e.smsSid,user_id:e.user_id,contact_id:e.contact_id,body:e.message,created_at:W().format("LLLL"),direction:"inbound",send_from:e.From,send_to:e.To}]))}))}))}),[W,te,q]),Object(a.useEffect)((function(){if(null===Y||void 0===Y?void 0:Y.data){var e=Y.data,t=te(ge()(e.chat,"sms_sid"));o(t),h(e.user),p(e.crm_link),u(!1)}}),[Z,Y,q,te]),Object(k.jsx)(s.u,{children:Object(k.jsxs)("div",{style:{display:"flex",flexDirection:"column",flex:1,height:"100vh",backgroundColor:"white"},children:[Object(k.jsx)(we,{contact:b,isLoading:l,crmLink:m,toNumber:R}),Object(k.jsx)(Se,{messages:r,isLoading:l}),Object(k.jsx)(xe,{isLoading:l,setMessages:o,contact:b,messages:r,toNumber:R,fromNumber:D,setFromNumber:I,fromNumbers:C,setToNumber:U,toNumbers:x,setDeliveryMethod:J,deliveryMethod:z,deliveryMethods:Ce,refetchChat:Q})]})})},Ee=function(e){var t=Object(P.g)().id;return Object(k.jsxs)(s.u,{children:[Object(k.jsx)(s.n,{children:Object(k.jsx)(s.O,{children:Object(k.jsx)(s.M,{children:t})})}),Object(k.jsx)(s.l,{fullscreen:!0})]})},ke=function(){var e=Object(P.f)(),t=D.b.PusherBeamNotification,n=D.b.PushNotifications,r=Object(y.d)((function(e){return e.auth.user})),o=Object(y.d)((function(e){return e.auth.isAuthenticated}));return Object(a.useEffect)((function(){if(D.a.isNative&&o){var a=localStorage.getItem("token");t.addUser({userId:r.id,token:a}),n.addListener("pushNotificationActionPerformed",(function(t){var n=t.notification&&t.notification.data?t.notification.data:null;if(n&&n.deep_link){var a=n.deep_link;a&&""!==a&&(console.log(a),e.push("/".concat(a)))}else console.log("Notification data or deeplink undefined."),console.log(n.deep_link)}))}})),Object(k.jsx)(k.Fragment,{})},Ae=function(){var e=Object(a.lazy)((function(){return Promise.all([n.e(5),n.e(41)]).then(n.bind(null,417))})),t=Object(y.d)((function(e){return e.auth.isAuthenticated})),r=function(){return Object(k.jsx)(k.Fragment,{children:Object(k.jsx)("div",{className:"d-flex align-items-center flex-column vh-100 justify-content-center text-center py-3",children:Object(k.jsx)("div",{className:"d-flex align-items-center flex-column px-4",children:Object(k.jsx)(U.ClimbingBoxLoader,{color:"#3c44b1",loading:!0})})})})};return Object(k.jsx)(a.Suspense,{fallback:Object(k.jsx)(r,{}),children:Object(k.jsx)(R.a,{children:Object(k.jsx)(s.z,{id:"main",children:t?Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(ke,{}),Object(k.jsxs)(P.d,{children:[Object(k.jsx)(P.a,{from:"/Login",to:"/Dashboard/chat"}),Object(k.jsx)(P.a,{from:"/",exact:!0,to:"/Dashboard/chat"}),Object(k.jsx)(P.b,{path:"/Dashboard",render:function(){return Object(k.jsx)(Oe,{})}}),Object(k.jsx)(P.b,{exact:!0,path:"/chat/:id",children:Object(k.jsx)(Ne,{})}),Object(k.jsx)(P.b,{exact:!0,path:"/contact/:id",children:Object(k.jsx)(Ee,{})})]})]}):Object(k.jsx)(k.Fragment,{children:Object(k.jsxs)(P.d,{children:[Object(k.jsx)(P.b,{path:"/Login/:auth_token?",component:e}),Object(k.jsx)(P.a,{from:"/",to:"/Login"}),Object(k.jsx)(P.a,{from:"",to:"/Login"})]})})})})})},De=(n(327),n(328),n(329),n(330),n(331),n(332),n(333),n(334),n(335),n(336),n(337),n(338),n(81));M()(L.a,{retries:5,retryDelay:M.a.exponentialDelay});var Ie=function(){var e=Object(l.d)(Object(l.b)(Object(i.a)({},f)),p,v(l.a.apply(void 0,g))),t=D.b.PushNotifications,n=D.b.PusherBeamNotification;e.getState().auth.user&&(x.a.initialize("UA-54758380-3"),x.a.set({user_id:e.getState().auth.user.zoho_org_id}),x.a.pageview(window.location.pathname+window.location.search));var r=new _.a({defaultOptions:{retry:0}});return Object(a.useEffect)((function(){if(console.log("CALLING"),D.a.isNative){try{n.clientInit({instanceId:De.a.PUSHER_BEAM_INSTANCE_ID}),console.log("pusherbeam init")}catch(e){console.log(e),console.log("pusherbeam err")}t.requestPermission()}})),Object(k.jsx)(s.b,{children:Object(k.jsx)(y.a,{store:e,children:Object(k.jsx)(S.a,{client:r,children:Object(k.jsx)(A,{children:Object(k.jsx)(Ae,{})})})})})},Le=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Te(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(Object(k.jsx)(Ie,{}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");Le?(!function(e,t){fetch(e).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Te(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):Te(t,e)}))}}()},38:function(e,t,n){"use strict";var a=n(29),r=n.n(a),o=n(81);t.a=function(){r.a.defaults.baseURL=o.a.API_BASE_END_POINT}},40:function(e,t,n){"use strict";var a=n(29),r=n.n(a);t.a=function(){var e=localStorage.getItem("token");e?r.a.defaults.headers.common.Authorization="Bearer "+e:delete r.a.defaults.headers.common.Authorization}},55:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return c}));var a=n(10),r=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return{type:a.m,payload:{msg:e,status:t,id:n}}},o=function(){return{type:a.d}},c=function(e){return{type:a.s,payload:{msg:e}}}},81:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a="https://delugeonaluge.com/mobile-app/dev/public",r={API_BASE_END_POINT:a,ZOHO_LOGIN_REDIRECT_URI:"https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.users.ALL,ZohoCRM.bulk.All,ZohoCRM.org.ALL,ZohoCRM.settings.ALL,ZohoCRM.settings.variables.ALL,ZohoCRM.modules.ALL&client_id=1000.WHF0S5ZXBUZFP4RN1AB1NYQR5H3YAT&response_type=code&access_type=offline&redirect_uri=".concat(a,"/api/zoho-auth"),MOBILE_LOGIN_URL:"https://twilio-for-zoho-crm-dev.herokuapp.com/Login",PUSHER_BEAM_INSTANCE_ID:"4b5e942b-6a5e-4fb4-ac7f-de443b71c10e",PUSHER_ID:"0f860d00d0bd2d8f3e73"}}},[[339,3,4]]]);
//# sourceMappingURL=main.22959735.chunk.js.map