import{f as H,a as pe,c as m,h as c,k as j,g as Q,L as Ne,ah as De,X as Ie,Y as Me,C as je,R as Qe,S as I,aH as Ue,v as he,n as Ke,r as _,w as M,t as We,y as Ge,B as Xe,ay as Je,aI as Ye,o as _e,Q as O,ak as Pe,P as ze,aj as ye,aJ as Ze,A as Ve,a0 as ue,a4 as ce,a2 as et,e as be,a3 as T,a7 as tt}from"./index.189df4a8.js";import{u as ge,d as ve,J as ot,y as nt,K as it,L as ke,M as at,z as lt,j as rt,k as st,N as ut,O as ct,P as dt,A as ft,R as ht,S as Ce,T as gt,U as vt,V as Se,W as we,g as mt,X as pt,Y as yt,Z as Oe,$ as bt,a0 as kt,s as Ct,G as Te,F as St,a as wt,b as Tt,e as qt,m as xt,_ as qe}from"./QTooltip.34fbdccf.js";import"./vue-i18n.esm-bundler.7d482d10.js";var Bt=H({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(e,{slots:t}){const{proxy:{$q:o}}=Q(),i=pe(Ne);pe(De,()=>{console.error("QPage needs to be child of QPageContainer")});const l=m(()=>{const r=(i.header.space===!0?i.header.size:0)+(i.footer.space===!0?i.footer.size:0);if(typeof e.styleFn=="function"){const p=i.isContainer.value===!0?i.containerHeight.value:o.screen.height;return e.styleFn(r,p)}return{minHeight:i.isContainer.value===!0?i.containerHeight.value-r+"px":o.screen.height===0?r!==0?`calc(100vh - ${r}px)`:"100vh":o.screen.height-r+"px"}}),s=m(()=>`q-page ${e.padding===!0?" q-layout-padding":""}`);return()=>c("main",{class:s.value,style:l.value},j(t.default))}});const _t={xs:8,sm:10,md:14,lg:20,xl:24};H({name:"QChip",props:{...ge,...Ie,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:t,emit:o}){const{proxy:{$q:i}}=Q(),l=ve(e,i),s=Me(e,_t),r=m(()=>e.selected===!0||e.icon!==void 0),p=m(()=>e.selected===!0?e.iconSelected||i.iconSet.chip.selected:e.icon),h=m(()=>e.iconRemove||i.iconSet.chip.remove),C=m(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),b=m(()=>{const f=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(f?` text-${f} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(C.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(l.value===!0?" q-chip--dark q-dark":"")}),k=m(()=>e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0});function g(f){f.keyCode===13&&y(f)}function y(f){e.disable||(o("update:selected",!e.selected),o("click",f))}function q(f){(f.keyCode===void 0||f.keyCode===13)&&(he(f),e.disable===!1&&(o("update:modelValue",!1),o("remove")))}function B(){const f=[];C.value===!0&&f.push(c("div",{class:"q-focus-helper"})),r.value===!0&&f.push(c(I,{class:"q-chip__icon q-chip__icon--left",name:p.value}));const u=e.label!==void 0?[c("div",{class:"ellipsis"},[e.label])]:void 0;return f.push(c("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},Ue(t.default,u))),e.iconRight&&f.push(c(I,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&f.push(c(I,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:h.value,...k.value,onClick:q,onKeyup:q})),f}return()=>{if(e.modelValue===!1)return;const f={class:b.value,style:s.value};return C.value===!0&&Object.assign(f,k.value,{onClick:y,onKeyup:g}),je("div",f,B(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[Qe,e.ripple]])}}});function Le(e,t){if(t&&e===t)return null;const o=e.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(o)===!0)return e;const i=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,l=i.display;return l==="block"||l==="table"?e:Le(e.parentNode)}function de(e,t,o){return!e||e===document.body?!1:o===!0&&e===t||(t===document?document.body:t).contains(e.parentNode)}function Ee(e,t,o){if(o||(o=document.createRange(),o.selectNode(e),o.setStart(e,0)),t.count===0)o.setEnd(e,t.count);else if(t.count>0)if(e.nodeType===Node.TEXT_NODE)e.textContent.length<t.count?t.count-=e.textContent.length:(o.setEnd(e,t.count),t.count=0);else for(let i=0;t.count!==0&&i<e.childNodes.length;i++)o=Ee(e.childNodes[i],t,o);return o}const Pt=/^https?:\/\//;class zt{constructor(t,o){this.el=t,this.eVm=o,this._range=null}get selection(){if(this.el){const t=document.getSelection();if(de(t.anchorNode,this.el,!0)&&de(t.focusNode,this.el,!0))return t}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length>0:!1}get range(){const t=this.selection;return t!==null&&t.rangeCount?t.getRangeAt(0):this._range}get parent(){const t=this.range;if(t!==null){const o=t.startContainer;return o.nodeType===document.ELEMENT_NODE?o:o.parentNode}return null}get blockParent(){const t=this.parent;return t!==null?Le(t,this.el):null}save(t=this.range){t!==null&&(this._range=t)}restore(t=this._range){const o=document.createRange(),i=document.getSelection();t!==null?(o.setStart(t.startContainer,t.startOffset),o.setEnd(t.endContainer,t.endOffset),i.removeAllRanges(),i.addRange(o)):(i.selectAllChildren(this.el),i.collapseToEnd())}savePosition(){let t=-1,o;const i=document.getSelection(),l=this.el.parentNode;if(i.focusNode&&de(i.focusNode,l))for(o=i.focusNode,t=i.focusOffset;o&&o!==l;)o!==this.el&&o.previousSibling?(o=o.previousSibling,t+=o.textContent.length):o=o.parentNode;this.savedPos=t}restorePosition(t=0){if(this.savedPos>0&&this.savedPos<t){const o=window.getSelection(),i=Ee(this.el,{count:this.savedPos});i&&(i.collapse(!1),o.removeAllRanges(),o.addRange(i))}}hasParent(t,o){const i=o?this.parent:this.blockParent;return i!==null?i.nodeName.toLowerCase()===t.toLowerCase():!1}hasParents(t,o,i=this.parent){return i===null?!1:t.includes(i.nodeName.toLowerCase())===!0?!0:o===!0?this.hasParents(t,o,i.parentNode):!1}is(t,o){if(this.selection===null)return!1;switch(t){case"formatBlock":return o==="DIV"&&this.parent===this.el||this.hasParent(o,o==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(t)===o;case"fontName":const i=document.queryCommandValue(t);return i===`"${o}"`||i===o;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const l=document.queryCommandState(t);return o!==void 0?l===o:l}}getParentAttribute(t){return this.parent!==null?this.parent.getAttribute(t):null}can(t){if(t==="outdent")return this.hasParents(["blockquote","li"],!0);if(t==="indent")return this.hasParents(["li"],!0);if(t==="link")return this.selection!==null||this.is("link")}apply(t,o,i=Ke){if(t==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(o)&&this.is(t,o)&&(t="outdent",o=null),o==="PRE"&&this.is(t,"PRE")&&(o="P");else if(t==="print"){i();const l=window.open();l.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),l.print(),l.close();return}else if(t==="link"){const l=this.getParentAttribute("href");if(l===null){const s=this.selectWord(this.selection),r=s?s.toString():"";if(!r.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=Pt.test(r)?r:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(s.getRangeAt(0))}else this.eVm.editLinkUrl.value=l,this.range.selectNodeContents(this.parent),this.save();return}else if(t==="fullscreen"){this.eVm.toggleFullscreen(),i();return}else if(t==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),i();return}document.execCommand(t,!1,o),i()}selectWord(t){if(t===null||t.isCollapsed!==!0||t.modify===void 0)return t;const o=document.createRange();o.setStart(t.anchorNode,t.anchorOffset),o.setEnd(t.focusNode,t.focusOffset);const i=o.collapsed?["backward","forward"]:["forward","backward"];o.detach();const l=t.focusNode,s=t.focusOffset;return t.collapse(t.anchorNode,t.anchorOffset),t.modify("move",i[0],"character"),t.modify("move",i[1],"word"),t.extend(l,s),t.modify("extend",i[1],"character"),t.modify("extend",i[0],"word"),t}}var Ot=H({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(e,{slots:t}){const o=m(()=>{const i=["unelevated","outline","flat","rounded","push","stretch","glossy"].filter(l=>e[l]===!0).map(l=>`q-btn-group--${l}`).join(" ");return`q-btn-group row no-wrap${i.length>0?" "+i:""}`+(e.spread===!0?" q-btn-group--spread":" inline")});return()=>c("div",{class:o.value},j(t.default))}}),Lt=H({name:"QMenu",inheritAttrs:!1,props:{...ot,...nt,...ge,...it,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:ke},self:{type:String,validator:ke},offset:{type:Array,validator:at},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...lt,"click","escape-key"],setup(e,{slots:t,emit:o,attrs:i}){let l=null,s,r,p;const h=Q(),{proxy:C}=h,{$q:b}=C,k=_(null),g=_(!1),y=m(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),q=ve(e,b),{registerTick:B,removeTick:f}=rt(),{registerTimeout:u,removeTimeout:R}=st(),{transition:A,transitionStyle:ee}=ut(e,g),{localScrollTarget:L,changeScrollEvent:U,unconfigureScrollTarget:S}=ct(e,Z),{anchorEl:z,canShow:te}=dt({showing:g}),{hide:K}=ft({showing:g,canShow:te,handleShow:le,handleHide:re,hideOnRouteChange:y,processOnMount:!0}),{showPortal:W,hidePortal:G,renderPortal:oe}=ht(h,k,D),F={anchorEl:z,innerRef:k,onClickOutside(d){if(e.persistent!==!0&&g.value===!0)return K(d),(d.type==="touchstart"||d.target.classList.contains("q-dialog__backdrop"))&&he(d),!0}},X=m(()=>Ce(e.anchor||(e.cover===!0?"center middle":"bottom start"),b.lang.rtl)),ne=m(()=>e.cover===!0?X.value:Ce(e.self||"top start",b.lang.rtl)),ie=m(()=>(e.square===!0?" q-menu--square":"")+(q.value===!0?" q-menu--dark q-dark":"")),ae=m(()=>e.autoClose===!0?{onClick:se}:{}),J=m(()=>g.value===!0&&e.persistent!==!0);M(J,d=>{d===!0?(bt(E),kt(F)):(we(E),Se(F))});function N(){Oe(()=>{let d=k.value;d&&d.contains(document.activeElement)!==!0&&(d=d.querySelector("[autofocus], [data-autofocus]")||d,d.focus({preventScroll:!0}))})}function le(d){if(f(),R(),l=e.noRefocus===!1?document.activeElement:null,gt($),W(),Z(),s=void 0,d!==void 0&&(e.touchPosition||e.contextMenu)){const n=We(d);if(n.left!==void 0){const{top:a,left:v}=z.value.getBoundingClientRect();s={left:n.left-v,top:n.top-a}}}r===void 0&&(r=M(()=>b.screen.width+"|"+b.screen.height+"|"+e.self+"|"+e.anchor+"|"+b.lang.rtl,x)),e.noFocus!==!0&&document.activeElement.blur(),B(()=>{x(),e.noFocus!==!0&&N()}),u(()=>{b.platform.is.ios===!0&&(p=e.autoClose,k.value.click()),x(),W(!0),o("show",d)},e.transitionDuration)}function re(d){f(),R(),G(),Y(!0),l!==null&&(d===void 0||d.qClickOutside!==!0)&&(l.focus(),l=null),u(()=>{G(!0),o("hide",d)},e.transitionDuration)}function Y(d){s=void 0,r!==void 0&&(r(),r=void 0),(d===!0||g.value===!0)&&(vt($),S(),Se(F),we(E)),d!==!0&&(l=null)}function Z(){(z.value!==null||e.scrollTarget!==void 0)&&(L.value=mt(z.value,e.scrollTarget),U(L.value,x))}function se(d){p!==!0?(pt(C,d),o("click",d)):p=!1}function $(d){J.value===!0&&e.noFocus!==!0&&Je(k.value,d.target)!==!0&&N()}function E(d){o("escape-key"),K(d)}function x(){const d=k.value;d===null||z.value===null||yt({el:d,offset:e.offset,anchorEl:z.value,anchorOrigin:X.value,selfOrigin:ne.value,absoluteOffset:s,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function D(){return c(Ge,{name:A.value,appear:!0},()=>g.value===!0?c("div",{...i,ref:k,tabindex:-1,class:["q-menu q-position-engine scroll"+ie.value,i.class],style:[i.style,ee.value],...ae.value},j(t.default)):null)}return Xe(Y),Object.assign(C,{focus:N,updatePosition:x}),oe}}),Et=H({name:"QBtnDropdown",props:{...Ye,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean},emits:["update:modelValue","click","before-show","show","before-hide","hide"],setup(e,{slots:t,emit:o}){const{proxy:i}=Q(),l=_(e.modelValue),s=_(null),r=m(()=>{const u={"aria-expanded":l.value===!0?"true":"false","aria-haspopup":"true"};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(u["aria-disabled"]="true"),u}),p=m(()=>"q-btn-dropdown__arrow"+(l.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":""));M(()=>e.modelValue,u=>{s.value!==null&&s.value[u?"show":"hide"]()}),M(()=>e.split,f);function h(u){l.value=!0,o("before-show",u)}function C(u){o("show",u),o("update:modelValue",!0)}function b(u){l.value=!1,o("before-hide",u)}function k(u){o("hide",u),o("update:modelValue",!1)}function g(u){o("click",u)}function y(u){Pe(u),f(),o("click",u)}function q(u){s.value!==null&&s.value.toggle(u)}function B(u){s.value!==null&&s.value.show(u)}function f(u){s.value!==null&&s.value.hide(u)}return Object.assign(i,{show:B,hide:f,toggle:q}),_e(()=>{e.modelValue===!0&&B()}),()=>{const u=[c(I,{class:p.value,name:e.dropdownIcon||i.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&u.push(c(Lt,{ref:s,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,onBeforeShow:h,onShow:C,onBeforeHide:b,onHide:k},t.default)),e.split===!1?c(O,{class:"q-btn-dropdown q-btn-dropdown--simple",...e,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,...r.value,onClick:g},()=>j(t.label,[]).concat(u)):c(Ot,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",outline:e.outline,flat:e.flat,rounded:e.rounded,push:e.push,unelevated:e.unelevated,glossy:e.glossy,stretch:e.stretch},()=>[c(O,{class:"q-btn-dropdown--current",...e,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,iconRight:e.iconRight,round:!1,onClick:y},t.label),c(O,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...r.value,disable:e.disable===!0||e.disableDropdown===!0,outline:e.outline,flat:e.flat,rounded:e.rounded,push:e.push,size:e.size,color:e.color,textColor:e.textColor,dense:e.dense,ripple:e.ripple},()=>u)])}}});function Re(e,t,o){t.handler?t.handler(e,o,o.caret):o.runCmd(t.cmd,t.param)}function me(e){return c("div",{class:"q-editor__toolbar-group"},e)}function $e(e,t,o,i=!1){const l=i||(t.type==="toggle"?t.toggled?t.toggled(e):t.cmd&&e.caret.is(t.cmd,t.param):!1),s=[];if(t.tip&&e.$q.platform.is.desktop){const r=t.key?c("div",[c("small",`(CTRL + ${String.fromCharCode(t.key)})`)]):null;s.push(c(Ct,{delay:1e3},()=>[c("div",{innerHTML:t.tip}),r]))}return c(O,{...e.buttonProps.value,icon:t.icon!==null?t.icon:void 0,color:l?t.toggleColor||e.props.toolbarToggleColor:t.color||e.props.toolbarColor,textColor:l&&!e.props.toolbarPush?null:t.textColor||e.props.toolbarTextColor,label:t.label,disable:t.disable?typeof t.disable=="function"?t.disable(e):!0:!1,size:"sm",onClick(r){o&&o(),Re(r,t,e)}},()=>s)}function Rt(e,t){const o=t.list==="only-icons";let i=t.label,l=t.icon!==null?t.icon:void 0,s,r;function p(){C.component.proxy.hide()}if(o)r=t.options.map(b=>{const k=b.type===void 0?e.caret.is(b.cmd,b.param):!1;return k&&(i=b.tip,l=b.icon!==null?b.icon:void 0),$e(e,b,p,k)}),s=e.toolbarBackgroundClass.value,r=[me(r)];else{const b=e.props.toolbarToggleColor!==void 0?`text-${e.props.toolbarToggleColor}`:null,k=e.props.toolbarTextColor!==void 0?`text-${e.props.toolbarTextColor}`:null,g=t.list==="no-icons";r=t.options.map(y=>{const q=y.disable?y.disable(e):!1,B=y.type===void 0?e.caret.is(y.cmd,y.param):!1;B&&(i=y.tip,l=y.icon!==null?y.icon:void 0);const f=y.htmlTip;return c(St,{active:B,activeClass:b,clickable:!0,disable:q,dense:!0,onClick(u){p(),e.contentRef.value!==null&&e.contentRef.value.focus(),e.caret.restore(),Re(u,y,e)}},()=>[g===!0?null:c(Te,{class:B?b:k,side:!0},()=>c(I,{name:y.icon!==null?y.icon:void 0})),c(Te,f?()=>c("div",{class:"text-no-wrap",innerHTML:y.htmlTip}):y.tip?()=>c("div",{class:"text-no-wrap"},y.tip):void 0)])}),s=[e.toolbarBackgroundClass.value,k]}const h=t.highlight&&i!==t.label,C=c(Et,{...e.buttonProps.value,noCaps:!0,noWrap:!0,color:h?e.props.toolbarToggleColor:e.props.toolbarColor,textColor:h&&!e.props.toolbarPush?null:e.props.toolbarTextColor,label:t.fixedLabel?t.label:i,icon:t.fixedIcon?t.icon!==null?t.icon:void 0:l,contentClass:s},()=>r);return C}function $t(e){if(e.caret)return e.buttons.value.filter(t=>!e.isViewingSource.value||t.find(o=>o.cmd==="viewsource")).map(t=>me(t.map(o=>e.isViewingSource.value&&o.cmd!=="viewsource"?!1:o.type==="slot"?j(e.slots[o.slot]):o.type==="dropdown"?Rt(e,o):$e(e,o))))}function Ht(e,t,o,i={}){const l=Object.keys(i);if(l.length===0)return{};const s={default_font:{cmd:"fontName",param:e,icon:o,tip:t}};return l.forEach(r=>{const p=i[r];s[r]={cmd:"fontName",param:p,icon:o,tip:p,htmlTip:`<font face="${p}">${p}</font>`}}),s}function At(e){if(e.caret){const t=e.props.toolbarColor||e.props.toolbarTextColor;let o=e.editLinkUrl.value;const i=()=>{e.caret.restore(),o!==e.editLinkUrl.value&&document.execCommand("createLink",!1,o===""?" ":o),e.editLinkUrl.value=null};return[c("div",{class:`q-mx-xs text-${t}`},`${e.$q.lang.editor.url}: `),c("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:o,onInput:l=>{Pe(l),o=l.target.value},onKeydown:l=>{if(ze(l)!==!0)switch(l.keyCode){case 13:return ye(l),i();case 27:ye(l),e.caret.restore(),(!e.editLinkUrl.value||e.editLinkUrl.value==="https://")&&document.execCommand("unlink"),e.editLinkUrl.value=null;break}}}),me([c(O,{key:"qedt_btm_rem",tabindex:-1,...e.buttonProps.value,label:e.$q.lang.label.remove,noCaps:!0,onClick:()=>{e.caret.restore(),document.execCommand("unlink"),e.editLinkUrl.value=null}}),c(O,{key:"qedt_btm_upd",...e.buttonProps.value,label:e.$q.lang.label.update,noCaps:!0,onClick:i})])]}}const xe=/^on[A-Z]/;function Ft(e,t){const o={listeners:_({}),attributes:_({})};function i(){const l={},s={};for(const r in e)r!=="class"&&r!=="style"&&xe.test(r)===!1&&(l[r]=e[r]);for(const r in t.props)xe.test(r)===!0&&(s[r]=t.props[r]);o.attributes.value=l,o.listeners.value=s}return Ze(i),i(),o}const Nt=Object.prototype.toString,fe=Object.prototype.hasOwnProperty,He={};"Boolean Number String Function Array Date RegExp Object".split(" ").forEach(e=>{He["[object "+e+"]"]=e.toLowerCase()});function V(e){return e===null?String(e):He[Nt.call(e)]||"object"}function Be(e){if(!e||V(e)!=="object"||e.constructor&&!fe.call(e,"constructor")&&!fe.call(e.constructor.prototype,"isPrototypeOf"))return!1;let t;for(t in e);return t===void 0||fe.call(e,t)}function Ae(){let e,t,o,i,l,s,r=arguments[0]||{},p=1,h=!1;const C=arguments.length;for(typeof r=="boolean"&&(h=r,r=arguments[1]||{},p=2),Object(r)!==r&&V(r)!=="function"&&(r={}),C===p&&(r=this,p--);p<C;p++)if((e=arguments[p])!==null)for(t in e)o=r[t],i=e[t],r!==i&&(h&&i&&(Be(i)||(l=V(i)==="array"))?(l?(l=!1,s=o&&V(o)==="array"?o:[]):s=o&&Be(o)?o:{},r[t]=Ae(h,s,i)):i!==void 0&&(r[t]=i));return r}H({name:"QEditor",props:{...ge,...wt,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:e=>e.length===0||e.every(t=>t.length),default(){return[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]}},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:e=>["div","p"].includes(e),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...Tt,"update:modelValue","keydown","click","mouseup","keyup","touchend","focus","blur"],setup(e,{slots:t,emit:o,attrs:i}){const{proxy:l,vnode:s}=Q(),{$q:r}=l,p=ve(e,r),{inFullscreen:h,toggleFullscreen:C}=qt(),b=Ft(i,s),k=_(null),g=_(null),y=_(null),q=_(!1),B=m(()=>!e.readonly&&!e.disable);let f,u,R=e.modelValue;document.execCommand("defaultParagraphSeparator",!1,e.paragraphTag),f=window.getComputedStyle(document.body).fontFamily;const A=m(()=>e.toolbarBg?` bg-${e.toolbarBg}`:""),ee=m(()=>{const n=e.toolbarOutline!==!0&&e.toolbarPush!==!0;return{type:"a",flat:n,noWrap:!0,outline:e.toolbarOutline,push:e.toolbarPush,rounded:e.toolbarRounded,dense:!0,color:e.toolbarColor,disable:!B.value,size:"sm"}}),L=m(()=>{const n=r.lang.editor,a=r.iconSet.editor;return{bold:{cmd:"bold",icon:a.bold,tip:n.bold,key:66},italic:{cmd:"italic",icon:a.italic,tip:n.italic,key:73},strike:{cmd:"strikeThrough",icon:a.strikethrough,tip:n.strikethrough,key:83},underline:{cmd:"underline",icon:a.underline,tip:n.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:a.unorderedList,tip:n.unorderedList},ordered:{cmd:"insertOrderedList",icon:a.orderedList,tip:n.orderedList},subscript:{cmd:"subscript",icon:a.subscript,tip:n.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:a.superscript,tip:n.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:v=>v.caret&&!v.caret.can("link"),icon:a.hyperlink,tip:n.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:a.toggleFullscreen,tip:n.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:a.viewSource,tip:n.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:a.quote,tip:n.quote,key:81},left:{cmd:"justifyLeft",icon:a.left,tip:n.left},center:{cmd:"justifyCenter",icon:a.center,tip:n.center},right:{cmd:"justifyRight",icon:a.right,tip:n.right},justify:{cmd:"justifyFull",icon:a.justify,tip:n.justify},print:{type:"no-state",cmd:"print",icon:a.print,tip:n.print,key:80},outdent:{type:"no-state",disable:v=>v.caret&&!v.caret.can("outdent"),cmd:"outdent",icon:a.outdent,tip:n.outdent},indent:{type:"no-state",disable:v=>v.caret&&!v.caret.can("indent"),cmd:"indent",icon:a.indent,tip:n.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:a.removeFormat,tip:n.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:a.hr,tip:n.hr},undo:{type:"no-state",cmd:"undo",icon:a.undo,tip:n.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:a.redo,tip:n.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:a.heading1||a.heading,tip:n.heading1,htmlTip:`<h1 class="q-ma-none">${n.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:a.heading2||a.heading,tip:n.heading2,htmlTip:`<h2 class="q-ma-none">${n.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:a.heading3||a.heading,tip:n.heading3,htmlTip:`<h3 class="q-ma-none">${n.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:a.heading4||a.heading,tip:n.heading4,htmlTip:`<h4 class="q-ma-none">${n.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:a.heading5||a.heading,tip:n.heading5,htmlTip:`<h5 class="q-ma-none">${n.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:a.heading6||a.heading,tip:n.heading6,htmlTip:`<h6 class="q-ma-none">${n.heading6}</h6>`},p:{cmd:"formatBlock",param:e.paragraphTag,icon:a.heading,tip:n.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:a.code,htmlTip:`<code>${n.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:a.size1||a.size,tip:n.size1,htmlTip:`<font size="1">${n.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:a.size2||a.size,tip:n.size2,htmlTip:`<font size="2">${n.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:a.size3||a.size,tip:n.size3,htmlTip:`<font size="3">${n.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:a.size4||a.size,tip:n.size4,htmlTip:`<font size="4">${n.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:a.size5||a.size,tip:n.size5,htmlTip:`<font size="5">${n.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:a.size6||a.size,tip:n.size6,htmlTip:`<font size="6">${n.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:a.size7||a.size,tip:n.size7,htmlTip:`<font size="7">${n.size7}</font>`}}}),U=m(()=>{const n=e.definitions||{},a=e.definitions||e.fonts?Ae(!0,{},L.value,n,Ht(f,r.lang.editor.defaultFont,r.iconSet.editor.font,e.fonts)):L.value;return e.toolbar.map(v=>v.map(w=>{if(w.options)return{type:"dropdown",icon:w.icon,label:w.label,size:"sm",dense:!0,fixedLabel:w.fixedLabel,fixedIcon:w.fixedIcon,highlight:w.highlight,list:w.list,options:w.options.map(Fe=>a[Fe])};const P=a[w];return P?P.type==="no-state"||n[w]&&(P.cmd===void 0||L.value[P.cmd]&&L.value[P.cmd].type==="no-state")?P:Object.assign({type:"toggle"},P):{type:"slot",slot:w}}))}),S={$q:r,props:e,slots:t,inFullscreen:h,toggleFullscreen:C,runCmd:E,isViewingSource:q,editLinkUrl:y,toolbarBackgroundClass:A,buttonProps:ee,contentRef:g,buttons:U,setContent:$};M(()=>e.modelValue,n=>{R!==n&&(R=n,$(n,!0))});const z=m(()=>e.toolbar&&e.toolbar.length>0),te=m(()=>{const n={},a=v=>{v.key&&(n[v.key]={cmd:v.cmd,param:v.param})};return U.value.forEach(v=>{v.forEach(w=>{w.options?w.options.forEach(a):a(w)})}),n}),K=m(()=>h.value?e.contentStyle:[{minHeight:e.minHeight,height:e.height,maxHeight:e.maxHeight},e.contentStyle]),W=m(()=>`q-editor q-editor--${q.value===!0?"source":"default"}`+(e.disable===!0?" disabled":"")+(h.value===!0?" fullscreen column":"")+(e.square===!0?" q-editor--square no-border-radius":"")+(e.flat===!0?" q-editor--flat":"")+(e.dense===!0?" q-editor--dense":"")+(p.value===!0?" q-editor--dark q-dark":"")),G=m(()=>[e.contentClass,"q-editor__content",{col:h.value,"overflow-auto":h.value||e.maxHeight}]),oe=m(()=>e.disable===!0?{"aria-disabled":"true"}:e.readonly===!0?{"aria-readonly":"true"}:{});function F(){if(g.value!==null){const n=`inner${q.value===!0?"Text":"HTML"}`,a=g.value[n];a!==e.modelValue&&(R=a,o("update:modelValue",a))}}function X(n){if(o("keydown",n),n.ctrlKey!==!0||ze(n)===!0){x();return}const a=n.keyCode,v=te.value[a];if(v!==void 0){const{cmd:w,param:P}=v;he(n),E(w,P,!1)}}function ne(n){x(),o("click",n)}function ie(n){if(g.value!==null){const{scrollTop:a,scrollHeight:v}=g.value;u=v-a}S.caret.save(),o("blur",n)}function ae(n){Ve(()=>{g.value!==null&&u!==void 0&&(g.value.scrollTop=g.value.scrollHeight-u)}),o("focus",n)}function J(n){const a=k.value;if(a!==null&&a.contains(n.target)===!0&&(n.relatedTarget===null||a.contains(n.relatedTarget)!==!0)){const v=`inner${q.value===!0?"Text":"HTML"}`;S.caret.restorePosition(g.value[v].length),x()}}function N(n){const a=k.value;a!==null&&a.contains(n.target)===!0&&(n.relatedTarget===null||a.contains(n.relatedTarget)!==!0)&&(S.caret.savePosition(),x())}function le(){u=void 0}function re(n){S.caret.save(),o("mouseup",n)}function Y(){u=void 0}function Z(n){S.caret.save(),o("keyup",n)}function se(n){S.caret.save(),o("touchend",n)}function $(n,a){if(g.value!==null){a===!0&&S.caret.savePosition();const v=`inner${q.value===!0?"Text":"HTML"}`;g.value[v]=n,a===!0&&(S.caret.restorePosition(g.value[v].length),x())}}function E(n,a,v=!0){D(),S.caret.restore(),S.caret.apply(n,a,()=>{D(),S.caret.save(),v&&x()})}function x(){setTimeout(()=>{y.value=null,l.$forceUpdate()},1)}function D(){Oe(()=>{g.value!==null&&g.value.focus({preventScroll:!0})})}function d(){return g.value}return Object.assign(l,{runCmd:E,refreshToolbar:x,focus:D,getContentEl:d}),_e(()=>{S.caret=l.caret=new zt(g.value,S),$(e.modelValue),x()}),()=>{let n;if(z.value){const a=[c("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+A.value},$t(S))];y.value!==null&&a.push(c("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+A.value},At(S))),n=c("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},a)}return c("div",{ref:k,class:W.value,style:{height:h.value===!0?"100%":null},...oe.value,onFocusin:J,onFocusout:N},[n,c("div",{ref:g,style:K.value,class:G.value,contenteditable:B.value,placeholder:e.placeholder,...b.listeners.value,onInput:F,onKeydown:X,onClick:ne,onBlur:ie,onFocus:ae,onMousedown:le,onTouchstartPassive:Y,onMouseup:re,onKeyup:Z,onTouchend:se})])}}});const jt={__name:"IndexPage",setup(e){const t=xt(),o=t.getActiveBgColor,i=m(()=>t.getCardEditorMetaData.productDesigns.find(h=>h.name==="front").layouts.find(h=>h.id===t.getActiveFrontLayoutId)),l=m(()=>t.getCardEditorMetaData.productDesigns.find(h=>h.name==="back").layouts.find(h=>h.id===t.getActiveBackLayoutId)),s=m(()=>t.getCardEditorMetaData.productShapes.find(h=>h.id===t.getActiveShapeId));function r(){t.changeTab("back")}function p(){t.changeTab("front")}return(h,C)=>(ue(),ce(Bt,{class:"q-page-class",style:{"min-height":"100vh"}},{default:et(()=>[be(O,{round:"",flat:"",color:"primary",icon:"arrow_back_ios",class:"indicator-btn-left",style:{margin:"1%"},onClick:p}),T(t).activeTab==="front"?(ue(),ce(qe,{id:"idxpg-frnt",identity:"main","active-tab":T(t).getActiveTab,layout:T(i),shape:T(s),"disable-interaction":!1,key:T(i).id,bgColor:T(o)(T(t).activeTab,T(i).id)},null,8,["active-tab","layout","shape","bgColor"])):T(t).activeTab==="back"?(ue(),ce(qe,{id:"idxpg-bck",identity:"main","active-tab":T(t).getActiveTab,layout:T(l),shape:T(s),"disable-interaction":!1,key:T(l).id,bgColor:T(o)(T(t).activeTab,T(l).id)},null,8,["active-tab","layout","shape","bgColor"])):tt("",!0),be(O,{round:"",flat:"",color:"primary",icon:"arrow_forward_ios",class:"indicator-btn-right",style:{margin:"1%"},onClick:r})]),_:1}))}};export{jt as default};
