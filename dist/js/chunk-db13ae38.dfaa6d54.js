(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-db13ae38"],{"0bc6":function(t,e,i){},"34ef":function(t,e,i){"use strict";var s=i("cc20");e["a"]=s["a"]},"68dd":function(t,e,i){},"8adc":function(t,e,i){},"8ce9":function(t,e,i){},b974:function(t,e,i){"use strict";i("4ff9"),i("68dd");var s=i("34ef"),n=(i("ee6f"),i("480e")),a=i("4ad4"),o=i("16b7"),l=i("b848"),h=i("75eb"),r=i("f573"),c=i("e4d3"),d=i("f2e7"),u=i("7560"),p=i("a293"),m=i("dc22"),f=i("58df"),g=i("d9bd"),v=i("80d2");const b=Object(f["a"])(l["a"],o["a"],h["a"],r["a"],c["a"],d["a"],u["a"]);var x=b.extend({name:"v-menu",provide(){return{isInMenu:!0,theme:this.theme}},directives:{ClickOutside:p["a"],Resize:m["a"]},props:{auto:Boolean,closeOnClick:{type:Boolean,default:!0},closeOnContentClick:{type:Boolean,default:!0},disabled:Boolean,disableKeys:Boolean,maxHeight:{type:[Number,String],default:"auto"},offsetX:Boolean,offsetY:Boolean,openOnClick:{type:Boolean,default:!0},openOnHover:Boolean,origin:{type:String,default:"top left"},transition:{type:[Boolean,String],default:"v-menu-transition"}},data(){return{calculatedTopAuto:0,defaultOffset:8,hasJustFocused:!1,listIndex:-1,resizeTimeout:0,selectedIndex:null,tiles:[]}},computed:{activeTile(){return this.tiles[this.listIndex]},calculatedLeft(){const t=Math.max(this.dimensions.content.width,parseFloat(this.calculatedMinWidth));return this.auto?Object(v["f"])(this.calcXOverflow(this.calcLeftAuto(),t))||"0":this.calcLeft(t)||"0"},calculatedMaxHeight(){const t=this.auto?"200px":Object(v["f"])(this.maxHeight);return t||"0"},calculatedMaxWidth(){return Object(v["f"])(this.maxWidth)||"0"},calculatedMinWidth(){if(this.minWidth)return Object(v["f"])(this.minWidth)||"0";const t=Math.min(this.dimensions.activator.width+Number(this.nudgeWidth)+(this.auto?16:0),Math.max(this.pageWidth-24,0)),e=isNaN(parseInt(this.calculatedMaxWidth))?t:parseInt(this.calculatedMaxWidth);return Object(v["f"])(Math.min(e,t))||"0"},calculatedTop(){const t=this.auto?Object(v["f"])(this.calcYOverflow(this.calculatedTopAuto)):this.calcTop();return t||"0"},hasClickableTiles(){return Boolean(this.tiles.find(t=>t.tabIndex>-1))},styles(){return{maxHeight:this.calculatedMaxHeight,minWidth:this.calculatedMinWidth,maxWidth:this.calculatedMaxWidth,top:this.calculatedTop,left:this.calculatedLeft,transformOrigin:this.origin,zIndex:this.zIndex||this.activeZIndex}}},watch:{isActive(t){t||(this.listIndex=-1)},isContentActive(t){this.hasJustFocused=t},listIndex(t,e){if(t in this.tiles){const e=this.tiles[t];e.classList.add("v-list-item--highlighted"),this.$refs.content.scrollTop=e.offsetTop-e.clientHeight}e in this.tiles&&this.tiles[e].classList.remove("v-list-item--highlighted")}},created(){this.$attrs.hasOwnProperty("full-width")&&Object(g["d"])("full-width",this)},mounted(){this.isActive&&this.callActivate()},methods:{activate(){this.updateDimensions(),requestAnimationFrame(()=>{this.startTransition().then(()=>{this.$refs.content&&(this.calculatedTopAuto=this.calcTopAuto(),this.auto&&(this.$refs.content.scrollTop=this.calcScrollPosition()))})})},calcScrollPosition(){const t=this.$refs.content,e=t.querySelector(".v-list-item--active"),i=t.scrollHeight-t.offsetHeight;return e?Math.min(i,Math.max(0,e.offsetTop-t.offsetHeight/2+e.offsetHeight/2)):t.scrollTop},calcLeftAuto(){return parseInt(this.dimensions.activator.left-2*this.defaultOffset)},calcTopAuto(){const t=this.$refs.content,e=t.querySelector(".v-list-item--active");if(e||(this.selectedIndex=null),this.offsetY||!e)return this.computedTop;this.selectedIndex=Array.from(this.tiles).indexOf(e);const i=e.offsetTop-this.calcScrollPosition(),s=t.querySelector(".v-list-item").offsetTop;return this.computedTop-i-s-1},changeListIndex(t){if(this.getTiles(),this.isActive&&this.hasClickableTiles)if(t.keyCode!==v["q"].tab){if(t.keyCode===v["q"].down)this.nextTile();else if(t.keyCode===v["q"].up)this.prevTile();else{if(t.keyCode!==v["q"].enter||-1===this.listIndex)return;this.tiles[this.listIndex].click()}t.preventDefault()}else this.isActive=!1},closeConditional(t){const e=t.target;return this.isActive&&!this._isDestroyed&&this.closeOnClick&&!this.$refs.content.contains(e)},genActivatorAttributes(){const t=a["a"].options.methods.genActivatorAttributes.call(this);return this.activeTile&&this.activeTile.id?{...t,"aria-activedescendant":this.activeTile.id}:t},genActivatorListeners(){const t=r["a"].options.methods.genActivatorListeners.call(this);return this.disableKeys||(t.keydown=this.onKeyDown),t},genTransition(){const t=this.genContent();return this.transition?this.$createElement("transition",{props:{name:this.transition}},[t]):t},genDirectives(){const t=[{name:"show",value:this.isContentActive}];return!this.openOnHover&&this.closeOnClick&&t.push({name:"click-outside",value:()=>{this.isActive=!1},args:{closeConditional:this.closeConditional,include:()=>[this.$el,...this.getOpenDependentElements()]}}),t},genContent(){const t={attrs:{...this.getScopeIdAttrs(),role:"role"in this.$attrs?this.$attrs.role:"menu"},staticClass:"v-menu__content",class:{...this.rootThemeClasses,"v-menu__content--auto":this.auto,"v-menu__content--fixed":this.activatorFixed,menuable__content__active:this.isActive,[this.contentClass.trim()]:!0},style:this.styles,directives:this.genDirectives(),ref:"content",on:{click:t=>{const e=t.target;e.getAttribute("disabled")||this.closeOnContentClick&&(this.isActive=!1)},keydown:this.onKeyDown}};return!this.disabled&&this.openOnHover&&(t.on=t.on||{},t.on.mouseenter=this.mouseEnterHandler),this.openOnHover&&(t.on=t.on||{},t.on.mouseleave=this.mouseLeaveHandler),this.$createElement("div",t,this.getContentSlot())},getTiles(){this.$refs.content&&(this.tiles=Array.from(this.$refs.content.querySelectorAll(".v-list-item")))},mouseEnterHandler(){this.runDelay("open",()=>{this.hasJustFocused||(this.hasJustFocused=!0,this.isActive=!0)})},mouseLeaveHandler(t){this.runDelay("close",()=>{this.$refs.content.contains(t.relatedTarget)||requestAnimationFrame(()=>{this.isActive=!1,this.callDeactivate()})})},nextTile(){const t=this.tiles[this.listIndex+1];if(!t){if(!this.tiles.length)return;return this.listIndex=-1,void this.nextTile()}this.listIndex++,-1===t.tabIndex&&this.nextTile()},prevTile(){const t=this.tiles[this.listIndex-1];if(!t){if(!this.tiles.length)return;return this.listIndex=this.tiles.length,void this.prevTile()}this.listIndex--,-1===t.tabIndex&&this.prevTile()},onKeyDown(t){if(t.keyCode===v["q"].esc){setTimeout(()=>{this.isActive=!1});const t=this.getActivator();this.$nextTick(()=>t&&t.focus())}else!this.isActive&&[v["q"].up,v["q"].down].includes(t.keyCode)&&(this.isActive=!0);this.$nextTick(()=>this.changeListIndex(t))},onResize(){this.isActive&&(this.$refs.content.offsetWidth,this.updateDimensions(),clearTimeout(this.resizeTimeout),this.resizeTimeout=window.setTimeout(this.updateDimensions,100))}},render(t){const e={staticClass:"v-menu",class:{"v-menu--attached":""===this.attach||!0===this.attach||"attach"===this.attach},directives:[{arg:"500",name:"resize",value:this.onResize}]};return t("div",e,[!this.activator&&this.genActivator(),this.showLazyContent(()=>[this.$createElement(n["a"],{props:{root:!0,light:this.light,dark:this.dark}},[this.genTransition()])])])}}),I=x,C=(i("cf36"),i("5607")),y=i("a026"),$=i("132d"),T=i("a9ad"),A=y["a"].extend({name:"v-simple-checkbox",functional:!0,directives:{ripple:C["a"]},props:{...T["a"].options.props,...u["a"].options.props,disabled:Boolean,ripple:{type:Boolean,default:!0},value:Boolean,indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},onIcon:{type:String,default:"$checkboxOn"},offIcon:{type:String,default:"$checkboxOff"}},render(t,{props:e,data:i}){const s=[];if(e.ripple&&!e.disabled){const i=t("div",T["a"].options.methods.setTextColor(e.color,{staticClass:"v-input--selection-controls__ripple",directives:[{name:"ripple",value:{center:!0}}]}));s.push(i)}let n=e.offIcon;e.indeterminate?n=e.indeterminateIcon:e.value&&(n=e.onIcon),s.push(t($["a"],T["a"].options.methods.setTextColor(e.value&&e.color,{props:{disabled:e.disabled,dark:e.dark,light:e.light}}),n));const a={"v-simple-checkbox":!0,"v-simple-checkbox--disabled":e.disabled};return t("div",{...i,class:a,on:{click:t=>{t.stopPropagation(),i.on&&i.on.input&&!e.disabled&&Object(v["w"])(i.on.input).forEach(t=>t(!e.value))}}},s)}}),w=(i("8ce9"),u["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render(t){let e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:{"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical,...this.themeClasses},attrs:{role:"separator","aria-orientation":e,...this.$attrs},on:this.$listeners})}})),k=w,O=(i("0bc6"),Object(f["a"])(u["a"]).extend({name:"v-subheader",props:{inset:Boolean},render(t){return t("div",{staticClass:"v-subheader",class:{"v-subheader--inset":this.inset,...this.themeClasses},attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})),S=O,M=i("da13"),D=i("1800"),B=i("5d23"),L=i("8860"),j=Object(f["a"])(T["a"],u["a"]).extend({name:"v-select-list",directives:{ripple:C["a"]},props:{action:Boolean,dense:Boolean,hideSelected:Boolean,items:{type:Array,default:()=>[]},itemDisabled:{type:[String,Array,Function],default:"disabled"},itemText:{type:[String,Array,Function],default:"text"},itemValue:{type:[String,Array,Function],default:"value"},noDataText:String,noFilter:Boolean,searchInput:null,selectedItems:{type:Array,default:()=>[]}},computed:{parsedItems(){return this.selectedItems.map(t=>this.getValue(t))},tileActiveClass(){return Object.keys(this.setTextColor(this.color).class||{}).join(" ")},staticNoDataTile(){const t={attrs:{role:void 0},on:{mousedown:t=>t.preventDefault()}};return this.$createElement(M["a"],t,[this.genTileContent(this.noDataText)])}},methods:{genAction(t,e){return this.$createElement(D["a"],[this.$createElement(A,{props:{color:this.color,value:e},on:{input:()=>this.$emit("select",t)}})])},genDivider(t){return this.$createElement(k,{props:t})},genFilteredText(t){if(t=t||"",!this.searchInput||this.noFilter)return Object(v["i"])(t);const{start:e,middle:i,end:s}=this.getMaskedCharacters(t);return`${Object(v["i"])(e)}${this.genHighlight(i)}${Object(v["i"])(s)}`},genHeader(t){return this.$createElement(S,{props:t},t.header)},genHighlight(t){return`<span class="v-list-item__mask">${Object(v["i"])(t)}</span>`},getMaskedCharacters(t){const e=(this.searchInput||"").toString().toLocaleLowerCase(),i=t.toLocaleLowerCase().indexOf(e);if(i<0)return{start:"",middle:t,end:""};const s=t.slice(0,i),n=t.slice(i,i+e.length),a=t.slice(i+e.length);return{start:s,middle:n,end:a}},genTile({item:t,index:e,disabled:i=null,value:s=!1}){s||(s=this.hasItem(t)),t===Object(t)&&(i=null!==i?i:this.getDisabled(t));const n={attrs:{"aria-selected":String(s),id:`list-item-${this._uid}-${e}`,role:"option"},on:{mousedown:t=>{t.preventDefault()},click:()=>i||this.$emit("select",t)},props:{activeClass:this.tileActiveClass,disabled:i,ripple:!0,inputValue:s}};if(!this.$scopedSlots.item)return this.$createElement(M["a"],n,[this.action&&!this.hideSelected&&this.items.length>0?this.genAction(t,s):null,this.genTileContent(t,e)]);const a=this,o=this.$scopedSlots.item({parent:a,item:t,attrs:{...n.attrs,...n.props},on:n.on});return this.needsTile(o)?this.$createElement(M["a"],n,o):o},genTileContent(t,e=0){const i=this.genFilteredText(this.getText(t));return this.$createElement(B["a"],[this.$createElement(B["c"],{domProps:{innerHTML:i}})])},hasItem(t){return this.parsedItems.indexOf(this.getValue(t))>-1},needsTile(t){return 1!==t.length||null==t[0].componentOptions||"v-list-item"!==t[0].componentOptions.Ctor.options.name},getDisabled(t){return Boolean(Object(v["l"])(t,this.itemDisabled,!1))},getText(t){return String(Object(v["l"])(t,this.itemText,t))},getValue(t){return Object(v["l"])(t,this.itemValue,this.getText(t))}},render(){const t=[],e=this.items.length;for(let i=0;i<e;i++){const e=this.items[i];this.hideSelected&&this.hasItem(e)||(null==e?t.push(this.genTile({item:e,index:i})):e.header?t.push(this.genHeader(e)):e.divider?t.push(this.genDivider(e)):t.push(this.genTile({item:e,index:i})))}return t.length||t.push(this.$slots["no-data"]||this.staticNoDataTile),this.$slots["prepend-item"]&&t.unshift(this.$slots["prepend-item"]),this.$slots["append-item"]&&t.push(this.$slots["append-item"]),this.$createElement(L["a"],{staticClass:"v-select-list",class:this.themeClasses,attrs:{role:"listbox",tabindex:-1},props:{dense:this.dense}},t)}}),E=i("c37a"),F=i("8654"),V=y["a"].extend({name:"comparable",props:{valueComparator:{type:Function,default:v["h"]}}}),_=y["a"].extend({name:"filterable",props:{noDataText:{type:String,default:"$vuetify.noDataText"}}}),H=i("d9f7");const P={closeOnClick:!1,closeOnContentClick:!1,disableKeys:!0,openOnClick:!1,maxHeight:304},W=Object(f["a"])(F["a"],V,_);e["a"]=W.extend().extend({name:"v-select",directives:{ClickOutside:p["a"]},props:{appendIcon:{type:String,default:"$dropdown"},attach:{type:null,default:!1},cacheItems:Boolean,chips:Boolean,clearable:Boolean,deletableChips:Boolean,disableLookup:Boolean,eager:Boolean,hideSelected:Boolean,items:{type:Array,default:()=>[]},itemColor:{type:String,default:"primary"},itemDisabled:{type:[String,Array,Function],default:"disabled"},itemText:{type:[String,Array,Function],default:"text"},itemValue:{type:[String,Array,Function],default:"value"},menuProps:{type:[String,Array,Object],default:()=>P},multiple:Boolean,openOnClear:Boolean,returnObject:Boolean,smallChips:Boolean},data(){return{cachedItems:this.cacheItems?this.items:[],menuIsBooted:!1,isMenuActive:!1,lastItem:20,lazyValue:void 0!==this.value?this.value:this.multiple?[]:void 0,selectedIndex:-1,selectedItems:[],keyboardLookupPrefix:"",keyboardLookupLastTime:0}},computed:{allItems(){return this.filterDuplicates(this.cachedItems.concat(this.items))},classes(){return{...F["a"].options.computed.classes.call(this),"v-select":!0,"v-select--chips":this.hasChips,"v-select--chips--small":this.smallChips,"v-select--is-menu-active":this.isMenuActive,"v-select--is-multi":this.multiple}},computedItems(){return this.allItems},computedOwns(){return`list-${this._uid}`},computedCounterValue(){return this.multiple?this.selectedItems.length:(this.getText(this.selectedItems[0])||"").toString().length},directives(){return this.isFocused?[{name:"click-outside",value:this.blur,args:{closeConditional:this.closeConditional}}]:void 0},dynamicHeight(){return"auto"},hasChips(){return this.chips||this.smallChips},hasSlot(){return Boolean(this.hasChips||this.$scopedSlots.selection)},isDirty(){return this.selectedItems.length>0},listData(){const t=this.$vnode&&this.$vnode.context.$options._scopeId,e=t?{[t]:!0}:{};return{attrs:{...e,id:this.computedOwns},props:{action:this.multiple,color:this.itemColor,dense:this.dense,hideSelected:this.hideSelected,items:this.virtualizedItems,itemDisabled:this.itemDisabled,itemText:this.itemText,itemValue:this.itemValue,noDataText:this.$vuetify.lang.t(this.noDataText),selectedItems:this.selectedItems},on:{select:this.selectItem},scopedSlots:{item:this.$scopedSlots.item}}},staticList(){return(this.$slots["no-data"]||this.$slots["prepend-item"]||this.$slots["append-item"])&&Object(g["b"])("assert: staticList should not be called if slots are used"),this.$createElement(j,this.listData)},virtualizedItems(){return this.$_menuProps.auto?this.computedItems:this.computedItems.slice(0,this.lastItem)},menuCanShow:()=>!0,$_menuProps(){let t="string"===typeof this.menuProps?this.menuProps.split(","):this.menuProps;return Array.isArray(t)&&(t=t.reduce((t,e)=>(t[e.trim()]=!0,t),{})),{...P,eager:this.eager,value:this.menuCanShow&&this.isMenuActive,nudgeBottom:t.offsetY?1:0,...t}}},watch:{internalValue(t){this.initialValue=t,this.setSelectedItems()},menuIsBooted(){window.setTimeout(()=>{this.getContent()&&this.getContent().addEventListener&&this.getContent().addEventListener("scroll",this.onScroll,!1)})},isMenuActive(t){window.setTimeout(()=>this.onMenuActiveChange(t)),t&&(this.menuIsBooted=!0)},items:{immediate:!0,handler(t){this.cacheItems&&this.$nextTick(()=>{this.cachedItems=this.filterDuplicates(this.cachedItems.concat(t))}),this.setSelectedItems()}}},methods:{blur(t){F["a"].options.methods.blur.call(this,t),this.isMenuActive=!1,this.isFocused=!1,this.selectedIndex=-1},activateMenu(){this.disabled||this.readonly||this.isMenuActive||(this.isMenuActive=!0)},clearableCallback(){this.setValue(this.multiple?[]:void 0),this.setMenuIndex(-1),this.$nextTick(()=>this.$refs.input&&this.$refs.input.focus()),this.openOnClear&&(this.isMenuActive=!0)},closeConditional(t){return!this.isMenuActive||!this._isDestroyed&&(!this.getContent()||!this.getContent().contains(t.target))&&this.$el&&!this.$el.contains(t.target)&&t.target!==this.$el},filterDuplicates(t){const e=new Map;for(let i=0;i<t.length;++i){const s=t[i],n=this.getValue(s);!e.has(n)&&e.set(n,s)}return Array.from(e.values())},findExistingIndex(t){const e=this.getValue(t);return(this.internalValue||[]).findIndex(t=>this.valueComparator(this.getValue(t),e))},getContent(){return this.$refs.menu&&this.$refs.menu.$refs.content},genChipSelection(t,e){const i=this.disabled||this.readonly||this.getDisabled(t);return this.$createElement(s["a"],{staticClass:"v-chip--select",attrs:{tabindex:-1},props:{close:this.deletableChips&&!i,disabled:i,inputValue:e===this.selectedIndex,small:this.smallChips},on:{click:t=>{i||(t.stopPropagation(),this.selectedIndex=e)},"click:close":()=>this.onChipInput(t)},key:JSON.stringify(this.getValue(t))},this.getText(t))},genCommaSelection(t,e,i){const s=e===this.selectedIndex&&this.computedColor,n=this.disabled||this.getDisabled(t);return this.$createElement("div",this.setTextColor(s,{staticClass:"v-select__selection v-select__selection--comma",class:{"v-select__selection--disabled":n},key:JSON.stringify(this.getValue(t))}),`${this.getText(t)}${i?"":", "}`)},genDefaultSlot(){const t=this.genSelections(),e=this.genInput();return Array.isArray(t)?t.push(e):(t.children=t.children||[],t.children.push(e)),[this.genFieldset(),this.$createElement("div",{staticClass:"v-select__slot",directives:this.directives},[this.genLabel(),this.prefix?this.genAffix("prefix"):null,t,this.suffix?this.genAffix("suffix"):null,this.genClearIcon(),this.genIconSlot(),this.genHiddenInput()]),this.genMenu(),this.genProgress()]},genIcon(t,e,i){const s=E["a"].options.methods.genIcon.call(this,t,e,i);return"append"===t&&(s.children[0].data=Object(H["a"])(s.children[0].data,{attrs:{tabindex:s.children[0].componentOptions.listeners&&"-1","aria-hidden":"true","aria-label":void 0}})),s},genInput(){const t=F["a"].options.methods.genInput.call(this);return delete t.data.attrs.name,t.data=Object(H["a"])(t.data,{domProps:{value:null},attrs:{readonly:!0,type:"text","aria-readonly":String(this.readonly),"aria-activedescendant":Object(v["k"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(v["k"])(t.data,"attrs.autocomplete","off")},on:{keypress:this.onKeyPress}}),t},genHiddenInput(){return this.$createElement("input",{domProps:{value:this.lazyValue},attrs:{type:"hidden",name:this.attrs$.name}})},genInputSlot(){const t=F["a"].options.methods.genInputSlot.call(this);return t.data.attrs={...t.data.attrs,role:"button","aria-haspopup":"listbox","aria-expanded":String(this.isMenuActive),"aria-owns":this.computedOwns},t},genList(){return this.$slots["no-data"]||this.$slots["prepend-item"]||this.$slots["append-item"]?this.genListWithSlot():this.staticList},genListWithSlot(){const t=["prepend-item","no-data","append-item"].filter(t=>this.$slots[t]).map(t=>this.$createElement("template",{slot:t},this.$slots[t]));return this.$createElement(j,{...this.listData},t)},genMenu(){const t=this.$_menuProps;return t.activator=this.$refs["input-slot"],""===this.attach||!0===this.attach||"attach"===this.attach?t.attach=this.$el:t.attach=this.attach,this.$createElement(I,{attrs:{role:void 0},props:t,on:{input:t=>{this.isMenuActive=t,this.isFocused=t}},ref:"menu"},[this.genList()])},genSelections(){let t=this.selectedItems.length;const e=new Array(t);let i;i=this.$scopedSlots.selection?this.genSlotSelection:this.hasChips?this.genChipSelection:this.genCommaSelection;while(t--)e[t]=i(this.selectedItems[t],t,t===e.length-1);return this.$createElement("div",{staticClass:"v-select__selections"},e)},genSlotSelection(t,e){return this.$scopedSlots.selection({attrs:{class:"v-chip--select"},parent:this,item:t,index:e,select:t=>{t.stopPropagation(),this.selectedIndex=e},selected:e===this.selectedIndex,disabled:this.disabled||this.readonly})},getMenuIndex(){return this.$refs.menu?this.$refs.menu.listIndex:-1},getDisabled(t){return Object(v["l"])(t,this.itemDisabled,!1)},getText(t){return Object(v["l"])(t,this.itemText,t)},getValue(t){return Object(v["l"])(t,this.itemValue,this.getText(t))},onBlur(t){t&&this.$emit("blur",t)},onChipInput(t){this.multiple?this.selectItem(t):this.setValue(null),0===this.selectedItems.length?this.isMenuActive=!0:this.isMenuActive=!1,this.selectedIndex=-1},onClick(t){this.isDisabled||(this.isAppendInner(t.target)||(this.isMenuActive=!0),this.isFocused||(this.isFocused=!0,this.$emit("focus")))},onEscDown(t){t.preventDefault(),this.isMenuActive&&(t.stopPropagation(),this.isMenuActive=!1)},onKeyPress(t){if(this.multiple||this.readonly||this.disableLookup)return;const e=1e3,i=performance.now();i-this.keyboardLookupLastTime>e&&(this.keyboardLookupPrefix=""),this.keyboardLookupPrefix+=t.key.toLowerCase(),this.keyboardLookupLastTime=i;const s=this.allItems.findIndex(t=>{const e=(this.getText(t)||"").toString();return e.toLowerCase().startsWith(this.keyboardLookupPrefix)}),n=this.allItems[s];-1!==s&&(this.setValue(this.returnObject?n:this.getValue(n)),setTimeout(()=>this.setMenuIndex(s)))},onKeyDown(t){const e=t.keyCode,i=this.$refs.menu;if([v["q"].enter,v["q"].space].includes(e)&&this.activateMenu(),this.$emit("keydown",t),i)return this.isMenuActive&&e!==v["q"].tab&&this.$nextTick(()=>{i.changeListIndex(t),this.$emit("update:list-index",i.listIndex)}),!this.isMenuActive&&[v["q"].up,v["q"].down].includes(e)?this.onUpDown(t):e===v["q"].esc?this.onEscDown(t):e===v["q"].tab?this.onTabDown(t):e===v["q"].space?this.onSpaceDown(t):void 0},onMenuActiveChange(t){if(this.multiple&&!t||this.getMenuIndex()>-1)return;const e=this.$refs.menu;if(e&&this.isDirty)for(let i=0;i<e.tiles.length;i++)if("true"===e.tiles[i].getAttribute("aria-selected")){this.setMenuIndex(i);break}},onMouseUp(t){this.hasMouseDown&&3!==t.which&&!this.isDisabled&&(this.isAppendInner(t.target)?this.$nextTick(()=>this.isMenuActive=!this.isMenuActive):this.isEnclosed&&(this.isMenuActive=!0)),F["a"].options.methods.onMouseUp.call(this,t)},onScroll(){if(this.isMenuActive){if(this.lastItem>=this.computedItems.length)return;const t=this.getContent().scrollHeight-(this.getContent().scrollTop+this.getContent().clientHeight)<200;t&&(this.lastItem+=20)}else requestAnimationFrame(()=>this.getContent().scrollTop=0)},onSpaceDown(t){t.preventDefault()},onTabDown(t){const e=this.$refs.menu;if(!e)return;const i=e.activeTile;!this.multiple&&i&&this.isMenuActive?(t.preventDefault(),t.stopPropagation(),i.click()):this.blur(t)},onUpDown(t){const e=this.$refs.menu;if(!e)return;if(t.preventDefault(),this.multiple)return this.activateMenu();const i=t.keyCode;e.isBooted=!0,window.requestAnimationFrame(()=>{e.getTiles(),v["q"].up===i?e.prevTile():e.nextTile(),e.activeTile&&e.activeTile.click()})},selectItem(t){if(this.multiple){const e=(this.internalValue||[]).slice(),i=this.findExistingIndex(t);if(-1!==i?e.splice(i,1):e.push(t),this.setValue(e.map(t=>this.returnObject?t:this.getValue(t))),this.$nextTick(()=>{this.$refs.menu&&this.$refs.menu.updateDimensions()}),!this.multiple)return;const s=this.getMenuIndex();if(this.setMenuIndex(-1),this.hideSelected)return;this.$nextTick(()=>this.setMenuIndex(s))}else this.setValue(this.returnObject?t:this.getValue(t)),this.isMenuActive=!1},setMenuIndex(t){this.$refs.menu&&(this.$refs.menu.listIndex=t)},setSelectedItems(){const t=[],e=this.multiple&&Array.isArray(this.internalValue)?this.internalValue:[this.internalValue];for(const i of e){const e=this.allItems.findIndex(t=>this.valueComparator(this.getValue(t),this.getValue(i)));e>-1&&t.push(this.allItems[e])}this.selectedItems=t},setValue(t){const e=this.internalValue;this.internalValue=t,t!==e&&this.$emit("change",t)},isAppendInner(t){const e=this.$refs["append-inner"];return e&&(e===t||e.contains(t))}}})},cc20:function(t,e,i){"use strict";i("8adc");var s=i("58df"),n=i("0789"),a=i("9d26"),o=i("a9ad"),l=i("4e82"),h=i("7560"),r=i("f2e7"),c=i("1c87"),d=i("af2b"),u=i("d9bd");e["a"]=Object(s["a"])(o["a"],d["a"],c["a"],h["a"],Object(l["a"])("chipGroup"),Object(r["b"])("inputValue")).extend({name:"v-chip",props:{active:{type:Boolean,default:!0},activeClass:{type:String,default(){return this.chipGroup?this.chipGroup.activeClass:""}},close:Boolean,closeIcon:{type:String,default:"$delete"},disabled:Boolean,draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,outlined:Boolean,pill:Boolean,tag:{type:String,default:"span"},textColor:String,value:null},data:()=>({proxyClass:"v-chip--active"}),computed:{classes(){return{"v-chip":!0,...c["a"].options.computed.classes.call(this),"v-chip--clickable":this.isClickable,"v-chip--disabled":this.disabled,"v-chip--draggable":this.draggable,"v-chip--label":this.label,"v-chip--link":this.isLink,"v-chip--no-color":!this.color,"v-chip--outlined":this.outlined,"v-chip--pill":this.pill,"v-chip--removable":this.hasClose,...this.themeClasses,...this.sizeableClasses,...this.groupClasses}},hasClose(){return Boolean(this.close)},isClickable(){return Boolean(c["a"].options.computed.isClickable.call(this)||this.chipGroup)}},created(){const t=[["outline","outlined"],["selected","input-value"],["value","active"],["@input","@active.sync"]];t.forEach(([t,e])=>{this.$attrs.hasOwnProperty(t)&&Object(u["a"])(t,e,this)})},methods:{click(t){this.$emit("click",t),this.chipGroup&&this.toggle()},genFilter(){const t=[];return this.isActive&&t.push(this.$createElement(a["a"],{staticClass:"v-chip__filter",props:{left:!0}},this.filterIcon)),this.$createElement(n["b"],t)},genClose(){return this.$createElement(a["a"],{staticClass:"v-chip__close",props:{right:!0,size:18},on:{click:t=>{t.stopPropagation(),t.preventDefault(),this.$emit("click:close"),this.$emit("update:active",!1)}}},this.closeIcon)},genContent(){return this.$createElement("span",{staticClass:"v-chip__content"},[this.filter&&this.genFilter(),this.$slots.default,this.hasClose&&this.genClose()])}},render(t){const e=[this.genContent()];let{tag:i,data:s}=this.generateRouteLink();s.attrs={...s.attrs,draggable:this.draggable?"true":void 0,tabindex:this.chipGroup&&!this.disabled?0:s.attrs.tabindex},s.directives.push({name:"show",value:this.active}),s=this.setBackgroundColor(this.color,s);const n=this.textColor||this.outlined&&this.color;return t(i,this.setTextColor(n,s),e)}})},cf36:function(t,e,i){},ee6f:function(t,e,i){},f573:function(t,e,i){"use strict";var s=i("fe6c"),n=i("21be"),a=i("4ad4"),o=i("58df"),l=i("80d2");const h=Object(o["a"])(n["a"],s["a"],a["a"]);e["a"]=h.extend().extend({name:"menuable",props:{allowOverflow:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[Number,String],default:"auto"},minWidth:[Number,String],nudgeBottom:{type:[Number,String],default:0},nudgeLeft:{type:[Number,String],default:0},nudgeRight:{type:[Number,String],default:0},nudgeTop:{type:[Number,String],default:0},nudgeWidth:{type:[Number,String],default:0},offsetOverflow:Boolean,openOnClick:Boolean,positionX:{type:Number,default:null},positionY:{type:Number,default:null},zIndex:{type:[Number,String],default:null}},data:()=>({absoluteX:0,absoluteY:0,activatedBy:null,activatorFixed:!1,dimensions:{activator:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0,offsetLeft:0},content:{top:0,left:0,bottom:0,right:0,width:0,height:0,offsetTop:0,scrollHeight:0}},hasJustFocused:!1,hasWindow:!1,inputActivator:!1,isContentActive:!1,pageWidth:0,pageYOffset:0,stackClass:"v-menu__content--active",stackMinZIndex:6}),computed:{computedLeft(){const t=this.dimensions.activator,e=this.dimensions.content,i=(!1!==this.attach?t.offsetLeft:t.left)||0,s=Math.max(t.width,e.width);let n=0;if(n+=this.left?i-(s-t.width):i,this.offsetX){const e=isNaN(Number(this.maxWidth))?t.width:Math.min(t.width,Number(this.maxWidth));n+=this.left?-e:t.width}return this.nudgeLeft&&(n-=parseInt(this.nudgeLeft)),this.nudgeRight&&(n+=parseInt(this.nudgeRight)),n},computedTop(){const t=this.dimensions.activator,e=this.dimensions.content;let i=0;return this.top&&(i+=t.height-e.height),!1!==this.attach?i+=t.offsetTop:i+=t.top+this.pageYOffset,this.offsetY&&(i+=this.top?-t.height:t.height),this.nudgeTop&&(i-=parseInt(this.nudgeTop)),this.nudgeBottom&&(i+=parseInt(this.nudgeBottom)),i},hasActivator(){return!!this.$slots.activator||!!this.$scopedSlots.activator||!!this.activator||!!this.inputActivator}},watch:{disabled(t){t&&this.callDeactivate()},isActive(t){this.disabled||(t?this.callActivate():this.callDeactivate())},positionX:"updateDimensions",positionY:"updateDimensions"},beforeMount(){this.hasWindow="undefined"!==typeof window},methods:{absolutePosition(){return{offsetTop:0,offsetLeft:0,scrollHeight:0,top:this.positionY||this.absoluteY,bottom:this.positionY||this.absoluteY,left:this.positionX||this.absoluteX,right:this.positionX||this.absoluteX,height:0,width:0}},activate(){},calcLeft(t){return Object(l["f"])(!1!==this.attach?this.computedLeft:this.calcXOverflow(this.computedLeft,t))},calcTop(){return Object(l["f"])(!1!==this.attach?this.computedTop:this.calcYOverflow(this.computedTop))},calcXOverflow(t,e){const i=t+e-this.pageWidth+12;return t=(!this.left||this.right)&&i>0?Math.max(t-i,0):Math.max(t,12),t+this.getOffsetLeft()},calcYOverflow(t){const e=this.getInnerHeight(),i=this.pageYOffset+e,s=this.dimensions.activator,n=this.dimensions.content.height,a=t+n,o=i<a;return o&&this.offsetOverflow&&s.top>n?t=this.pageYOffset+(s.top-n):o&&!this.allowOverflow?t=i-n-12:t<this.pageYOffset&&!this.allowOverflow&&(t=this.pageYOffset+12),t<12?12:t},callActivate(){this.hasWindow&&this.activate()},callDeactivate(){this.isContentActive=!1,this.deactivate()},checkForPageYOffset(){this.hasWindow&&(this.pageYOffset=this.activatorFixed?0:this.getOffsetTop())},checkActivatorFixed(){if(!1!==this.attach)return;let t=this.getActivator();while(t){if("fixed"===window.getComputedStyle(t).position)return void(this.activatorFixed=!0);t=t.offsetParent}this.activatorFixed=!1},deactivate(){},genActivatorListeners(){const t=a["a"].options.methods.genActivatorListeners.call(this),e=t.click;return t.click=t=>{this.openOnClick&&e&&e(t),this.absoluteX=t.clientX,this.absoluteY=t.clientY},t},getInnerHeight(){return this.hasWindow?window.innerHeight||document.documentElement.clientHeight:0},getOffsetLeft(){return this.hasWindow?window.pageXOffset||document.documentElement.scrollLeft:0},getOffsetTop(){return this.hasWindow?window.pageYOffset||document.documentElement.scrollTop:0},getRoundedBoundedClientRect(t){const e=t.getBoundingClientRect();return{top:Math.round(e.top),left:Math.round(e.left),bottom:Math.round(e.bottom),right:Math.round(e.right),width:Math.round(e.width),height:Math.round(e.height)}},measure(t){if(!t||!this.hasWindow)return null;const e=this.getRoundedBoundedClientRect(t);if(!1!==this.attach){const i=window.getComputedStyle(t);e.left=parseInt(i.marginLeft),e.top=parseInt(i.marginTop)}return e},sneakPeek(t){requestAnimationFrame(()=>{const e=this.$refs.content;e&&"none"===e.style.display?(e.style.display="inline-block",t(),e.style.display="none"):t()})},startTransition(){return new Promise(t=>requestAnimationFrame(()=>{this.isContentActive=this.hasJustFocused=this.isActive,t()}))},updateDimensions(){this.hasWindow="undefined"!==typeof window,this.checkActivatorFixed(),this.checkForPageYOffset(),this.pageWidth=document.documentElement.clientWidth;const t={activator:{...this.dimensions.activator},content:{...this.dimensions.content}};if(!this.hasActivator||this.absolute)t.activator=this.absolutePosition();else{const e=this.getActivator();if(!e)return;t.activator=this.measure(e),t.activator.offsetLeft=e.offsetLeft,!1!==this.attach?t.activator.offsetTop=e.offsetTop:t.activator.offsetTop=0}this.sneakPeek(()=>{this.$refs.content&&(t.content=this.measure(this.$refs.content)),this.dimensions=t})}}})}}]);
//# sourceMappingURL=chunk-db13ae38.dfaa6d54.js.map