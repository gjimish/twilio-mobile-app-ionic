(this["webpackJsonptwilio-for-zoho-crm"]=this["webpackJsonptwilio-for-zoho-crm"]||[]).push([[41],{417:function(e,n,t){"use strict";t.r(n);var c=t(9),s=t(11),i=t(0),o=t(120),a=t(55),r=t(29),l=t.n(r),j=t(38),u=t(40),d=t(10),g=t(45),b=t(34),O=t(404),h=t(121),f=t.n(h),y=t(49),x=t(412),p=t(81),m=t(3),S=t(20),L=t(1),v=function(e){var n=e.isLoading,t=e.showSync,c=e.isContactsSyncing,s=e.isLeadsSyncing,i=e.isMessagesSyncing,o=e.onDoAuth;return Object(L.jsxs)(m.g,{children:[Object(L.jsx)(m.i,{children:Object(L.jsx)(m.j,{children:n?"Logging in...":"Login"})}),Object(L.jsxs)(m.h,{children:[n?Object(L.jsxs)(L.Fragment,{children:[" ",Object(L.jsx)("p",{style:{fontSize:"16px"},children:"Syncing Zoho account data. Please do not refresh or leave this page."})]}):Object(L.jsxs)("div",{children:[Object(L.jsxs)(m.e,{expand:"block",size:"large",onClick:o,children:["Login",Object(L.jsx)(m.o,{icon:S.o,slot:"end"})]}),Object(L.jsx)("p",{style:{textAlign:"center"},children:"Login with your Zoho CRM account"})]}),t&&Object(L.jsx)(L.Fragment,{children:Object(L.jsxs)(m.t,{lines:"inset",children:[Object(L.jsxs)(m.r,{children:[Object(L.jsx)(m.s,{children:"Syncing Contacts"}),c?Object(L.jsx)(m.H,{color:"primary"}):Object(L.jsx)(m.o,{color:"primary",icon:S.f})]}),Object(L.jsxs)(m.r,{children:[Object(L.jsx)(m.s,{children:"Syncing Leads"}),s?Object(L.jsx)(m.H,{color:"primary"}):Object(L.jsx)(m.o,{color:"primary",icon:S.f})]}),Object(L.jsxs)(m.r,{children:[Object(L.jsx)(m.s,{children:"Syncing Messages"}),i?Object(L.jsx)(m.H,{color:"primary"}):Object(L.jsx)(m.o,{color:"primary",icon:S.f})]})]})}),Object(L.jsx)("div",{style:{paddingTop:"20px",textAlign:"center"},children:n&&Object(L.jsx)(m.H,{color:"primary"})})]})]})},w=t.p+"static/media/logo.ab037da5.png";n.default=Object(g.b)((function(e){return{isAuthenticated:e.auth.isAuthenticated,error:e.error,showSync:e.auth.showSync}}),(function(e){return{login:function(n){return e(Object(o.a)(n))},clearErrors:function(){return e(Object(a.a)())},fetchAccessToken:function(){return e((function(e){Object(j.a)(),Object(u.a)(),l.a.get("/api/access-token",{headers:{"Content-Type":"application/json"}}).then((function(n){void 0!==n.data.status&&"Token is Expired"===n.data.status?e({type:d.q}):e({type:d.g,payload:n.data})})).catch((function(){}))}))},newLogin:function(n){return e(Object(o.c)(n))}}}))((function(e){var n=e.isAuthenticated,t=e.showSync,o=e.error,a=e.login,r=e.fetchAccessToken,l=e.newLogin,j=Object(b.f)(),u=Object(b.g)().auth_token,d=Object(i.useState)({modal:!1,email:"",password:"",msg:null,loading:!1,contactsSync:!0,leadsSync:null,messagesSync:null}),g=Object(s.a)(d,2),h=g[0],S=g[1];return Object(i.useEffect)((function(){"LOGIN_FAIL"===o.id?S((function(e){return Object(c.a)(Object(c.a)({},e),{},{msg:o.msg.error,loading:!1})})):S((function(e){return Object(c.a)(Object(c.a)({},e),{},{msg:null,loading:!1})}))}),[o]),Object(i.useEffect)((function(){if(""!==u&&void 0!==u){var e=O.a.decode(u).split("|");if(""!==e[0]&&void 0!==e[0]){S((function(e){return Object(c.a)(Object(c.a)({},e),{},{loading:!0})}));var n={email:e[0],password:e[1],userAlreadyExists:e[2]};a(n)}}}),[u,a]),Object(i.useEffect)((function(){n&&(S((function(e){return Object(c.a)(Object(c.a)({},e),{},{msg:null,loading:!1})})),j.push("/Dashboard"),r())}),[j,r,n]),Object(i.useEffect)((function(){var e=new f.a(p.a.PUSHER_ID,{cluster:"us2"}).subscribe("incomming-channel");e.bind("login-event",(function(e){if("login"===e.type){console.log("Logged In successfull after syncing data");var n=JSON.parse(localStorage.getItem("tempLoginData"));console.log(n),l(n)}})),e.bind("syncing-event",(function(e){"Contacts"===e.type?S((function(e){return Object(c.a)(Object(c.a)({},e),{},{contactsSync:!1,leadsSync:!0})})):"Leads"===e.type?S((function(e){return Object(c.a)(Object(c.a)({},e),{},{leadsSync:!1,messagesSync:!0})})):"twiliosmsextension0__Sent_SMS"===e.type&&S((function(e){return Object(c.a)(Object(c.a)({},e),{},{messagesSync:!1})}))}))}),[l]),Object(L.jsxs)(m.u,{children:[Object(L.jsx)(m.l,{children:Object(L.jsxs)(m.m,{style:{height:"100%"},children:[Object(L.jsx)(m.A,{style:{height:"30%",justifyContent:"center",alignItems:"center"},children:Object(L.jsx)("img",{src:w,alt:"Logo",style:{width:"200px"}})}),Object(L.jsx)(m.A,{style:{height:"70%"},children:Object(L.jsx)(m.k,{sizeLg:"5",children:Object(L.jsx)(v,{isLoading:h.loading,showSync:t,isContactsSyncing:h.contactsSync,isLeadsSyncing:h.leadsSync,isMessagesSyncing:h.messagesSync,onDoAuth:function(){if(y.a.isNative){var e=x.a.create(p.a.MOBILE_LOGIN_URL,"_blank");e.on("loadstop").subscribe((function(n){if(console.log("event.url",n.url),null!=n.url&&n.url.indexOf("Login/")>-1){var t=n.url,s=t.substring(t.lastIndexOf("/")+1);if(""!==s&&void 0!==s){e.close();var i=O.a.decode(s).split("|");if(""!==i[0]&&void 0!==i[0]){S((function(e){return Object(c.a)(Object(c.a)({},e),{},{loading:!0})}));var o={email:i[0],password:i[1],userAlreadyExists:i[2]};a(o)}}}})),e.on("load")}else console.log(p.a.ZOHO_LOGIN_REDIRECT_URI),window.open(p.a.ZOHO_LOGIN_REDIRECT_URI,"_self")}})})})]})}),Object(L.jsx)(m.a,{isOpen:!!h.msg,onDidDismiss:function(){S((function(e){return Object(c.a)(Object(c.a)({},e),{},{msg:null,loading:!1})}))},header:"Login Error",message:h.msg,buttons:[{text:"Ok",handler:function(){S((function(e){return Object(c.a)(Object(c.a)({},e),{},{msg:null,loading:!1})}))}}]})]})}))}}]);
//# sourceMappingURL=41.5ce7db66.chunk.js.map