"use strict";(self["webpackChunkmessage_client"]=self["webpackChunkmessage_client"]||[]).push([[638],{6638:function(e,a,l){l.r(a),l.d(a,{default:function(){return y}});l(7658);var t=l(3396),r=l(9242),s=l(4870),i=l(5522),u=l(1296),n=l(2074),m=l(2483);const o=e=>((0,t.dD)("data-v-5f2cb3b6"),e=e(),(0,t.Cn)(),e),d={class:"content"},c=o((()=>(0,t._)("div",{class:"header"},[(0,t._)("img",{src:i,alt:""}),(0,t._)("span",null,"轻语留言欢迎你")],-1))),p={class:"card"},v=o((()=>(0,t._)("h2",null,"账号注册",-1))),f={class:"info"},g={class:"exist"},_=o((()=>(0,t._)("p",{class:"footer"},"该注册账号只限于在网站内测试、学习，请妥善保护自己个人隐私和个人信息，以免造成不必要的影响。谢谢～",-1)));var w=(0,t.aZ)({__name:"Register",setup(e){const a=(0,m.tv)(),l=(0,s.qj)({name:"",password:"",email:""}),i=(0,s.iH)();let o=(0,s.iH)(!1),w=async(e,a)=>{if(0===a.length)return Promise.reject("邮箱不能为空！");let l=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;return l.test(a)?void 0:Promise.reject("请输入正确的邮箱")},h=async(e,a)=>{if(0===a.length)return Promise.reject("名称不能为空！");let l=await(0,u.ym)(a);return l?Promise.reject("名称已被占用，请换个名称"):void 0};const b={name:[{required:!0,validator:h,trigger:"blur"}],password:[{required:!0,trigger:"blur",message:"密码不能为空！"},{min:6,trigger:"change",message:"密码不能小于6位"}],email:[{required:!0,validator:w,trigger:"blur"}]},y=()=>{i.value?.validate().then((async e=>{let l=await(0,u.z2)(e);441===l.status?o.value=l.exist:(o.value=!1,n.ZP.success(l.msg),a.push("/"))})).catch((()=>{}))};return(e,a)=>{const u=(0,t.up)("a-input"),n=(0,t.up)("a-form-item"),m=(0,t.up)("a-input-password"),w=(0,t.up)("a-button"),h=(0,t.up)("a-form"),W=(0,t.up)("a-card");return(0,t.wg)(),(0,t.iD)("div",d,[c,(0,t._)("div",p,[(0,t.Wm)(W,{style:{width:"390px"}},{default:(0,t.w5)((()=>[v,(0,t._)("div",f,[(0,t.Wm)(h,{layout:"vertical",model:l,rules:b,ref_key:"formRef",ref:i},{default:(0,t.w5)((()=>[(0,t.Wm)(n,{label:"用户名",name:"name"},{default:(0,t.w5)((()=>[(0,t.Wm)(u,{size:"large",value:l.name,"onUpdate:value":a[0]||(a[0]=e=>l.name=e),valueModifiers:{trim:!0},placeholder:"取一个昵称"},null,8,["value"])])),_:1}),(0,t.Wm)(n,{label:"邮箱",name:"email"},{default:(0,t.w5)((()=>[(0,t.Wm)(u,{size:"large",value:l.email,"onUpdate:value":a[1]||(a[1]=e=>l.email=e),valueModifiers:{trim:!0},placeholder:"规范的邮箱"},null,8,["value"])])),_:1}),(0,t.Wm)(n,{label:"密码",name:"password"},{default:(0,t.w5)((()=>[(0,t.Wm)(m,{size:"large",value:l.password,"onUpdate:value":a[2]||(a[2]=e=>l.password=e),valueModifiers:{trim:!0},placeholder:"不小于6位数"},null,8,["value"])])),_:1}),(0,t.Wm)(n,{style:{height:"120px"}},{default:(0,t.w5)((()=>[(0,t.Wm)(w,{type:"primary",class:"btn",onClick:y},{default:(0,t.w5)((()=>[(0,t.Uk)("注册")])),_:1}),(0,t.wy)((0,t._)("p",g,"邮箱已被注册,请直接登录",512),[[r.F8,(0,s.SU)(o)]])])),_:1})])),_:1},8,["model"])])])),_:1})]),_])}}}),h=l(89);const b=(0,h.Z)(w,[["__scopeId","data-v-5f2cb3b6"]]);var y=b},5522:function(e,a,l){e.exports=l.p+"img/logo.779a3991.svg"}}]);
//# sourceMappingURL=638.52c1777b.js.map