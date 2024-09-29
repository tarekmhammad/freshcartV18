import{a as w}from"./chunk-P3Z34G7K.js";import{a as E,b as c,c as b,d as y,e as N,f as C,h as T,i as A,j as I,k as M,m as R}from"./chunk-64AJHUAZ.js";import{f as S,g as L}from"./chunk-LHRA3WSF.js";import{$a as d,Bb as x,Hb as F,Oa as a,Pa as g,_ as v,bb as f,fb as s,jb as n,kb as o,lb as p,qb as h,rb as _,zb as l}from"./chunk-SVRTX5CE.js";function D(e,r){if(e&1&&(n(0,"p",1),l(1),o()),e&2){let t=_();a(),x(" ",t.errMsg," ")}}function G(e,r){e&1&&(n(0,"span"),l(1,"Email is required"),o())}function k(e,r){e&1&&(n(0,"span"),l(1,"Invalid email"),o())}function j(e,r){if(e&1&&(n(0,"p",7),d(1,G,2,0,"span")(2,k,2,0,"span"),o()),e&2){let t,i,m=_();a(),s((t=m.loginForm.get("email"))!=null&&t.getError("required")?1:-1),a(),s((i=m.loginForm.get("email"))!=null&&i.getError("email")?2:-1)}}function B(e,r){e&1&&(n(0,"span"),l(1,"Password is required"),o())}function P(e,r){e&1&&(n(0,"span"),l(1,"* Must start with capital character"),p(2,"br"),l(3," * Min Length 6 characters"),p(4,"br"),l(5," * Include special characters"),o())}function V(e,r){if(e&1&&(n(0,"p",7),d(1,B,2,0,"span")(2,P,6,0,"span"),o()),e&2){let t,i,m=_();a(),s((t=m.loginForm.get("password"))!=null&&t.getError("required")?1:-1),a(),s((i=m.loginForm.get("password"))!=null&&i.getError("pattern")?2:-1)}}function Z(e,r){e&1&&(n(0,"span"),l(1,"Login"),o())}function z(e,r){e&1&&(n(0,"span"),p(1,"i",13),o())}var q=class e{constructor(r,t,i){this._AuthService=r;this._Router=t;this._FormBuilder=i}errMsg="";isLoading=!1;loginForm=new N({email:new C("",[c.required,c.email]),password:new C("",[c.required,c.pattern(/^[A-Z][a-zA-Z0-9_@]{6,}$/)])});handleForm(){let r=this.loginForm.value;this.isLoading=!0,this.loginForm.valid===!0&&this._AuthService.login(r).subscribe({next:t=>{localStorage.setItem("etoken",t.token),this._AuthService.decodeUser(),this.isLoading=!1,this._Router.navigate(["/home"])},error:t=>{this.isLoading=!1,this.errMsg=t.error.message}})}static \u0275fac=function(t){return new(t||e)(g(w),g(S),g(M))};static \u0275cmp=v({type:e,selectors:[["app-login"]],standalone:!0,features:[F],decls:21,vars:7,consts:[[1,"my-5","w-75","mx-auto","shadow","p-4","bg-main-ligth"],[1,"alert","alert-danger","mb-0","p-3","w-50","mx-auto","text-center"],[1,"my-3"],[3,"ngSubmit","formGroup"],[1,"form-item"],["for","email"],["type","email","formControlName","email","id","email",1,"form-control"],[1,"text-danger","p-1","small","mb-0"],["for","password"],["type","password","formControlName","password","id","password",1,"form-control"],[1,"d-flex","justify-content-between","align-items-center"],["routerLink","/forgot"],[1,"main-btn","d-block","ms-auto","mt-3",3,"disabled"],[1,"fas","fa-spin","fa-spinner"]],template:function(t,i){if(t&1&&(n(0,"section",0),d(1,D,2,1,"p",1),n(2,"h1",2),l(3,"Login Now"),o(),n(4,"form",3),h("ngSubmit",function(){return i.handleForm()}),n(5,"div",4)(6,"label",5),l(7,"Email"),o(),p(8,"input",6),d(9,j,3,2,"p",7),o(),n(10,"div",4)(11,"label",8),l(12,"Password"),o(),p(13,"input",9),d(14,V,3,2,"p",7),o(),n(15,"div",10)(16,"a",11),l(17,"Forgot Password"),o(),n(18,"button",12),d(19,Z,2,0,"span")(20,z,2,0,"span"),o()()()()),t&2){let m,u;a(),s(i.errMsg?1:-1),a(3),f("formGroup",i.loginForm),a(5),s((m=i.loginForm.get("email"))!=null&&m.errors&&((m=i.loginForm.get("email"))!=null&&m.touched)?9:-1),a(5),s((u=i.loginForm.get("password"))!=null&&u.errors&&((u=i.loginForm.get("password"))!=null&&u.touched)?14:-1),a(4),f("disabled",i.loginForm.invalid),a(),s(i.isLoading?-1:19),a(),s(i.isLoading?20:-1)}},dependencies:[R,T,E,b,y,A,I,L]})};export{q as LoginComponent};
