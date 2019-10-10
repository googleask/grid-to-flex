class gridToFlex{constructor(){this.init()}init(){this.initValues(),this.cacheDOM(),this.assignDefaults(),this.bindEvents(),this.addDefaultBreakpoints(),this.generateGridItems()}cacheDOM(){this.minCol=document.querySelector("#itemWidth"),this.gridColGap=document.querySelector("#gridColGap"),this.gridRowGap=document.querySelector("#gridRowGap"),this.unifyGap=document.querySelector("#unifyGap"),this.gridWrapper=document.querySelector(".js-grid"),this.breakPointsList=document.querySelector(".flex-breakpoints-list"),this.addBreakpointBtn=document.querySelector("#addBreakpoint"),this.generateCSS=document.querySelector("#generateCSS"),this.resultModal=document.querySelector("#resultModal"),this.modalBody=document.querySelector("#modalBody"),this.resultCode=document.querySelector("#resultCode"),this.copyCSS=document.querySelector("#copyCSS"),this.closeModal=document.querySelector("#close")}initValues(){this.minColWidth=200,this.gridColGapValue=16,this.gridRowGapValue=16,this.isUnify=!1,this.flexBreakpoints=[],this.flexBreakpointsInfo=[]}assignDefaults(){this.minCol.value=this.minColWidth,this.gridColGap.value=this.gridColGapValue,this.gridRowGap.value=this.gridRowGapValue}bindEvents(){this.minCol.addEventListener("input",this.colChange.bind(this)),this.gridColGap.addEventListener("input",this.colGapChange.bind(this)),this.gridRowGap.addEventListener("input",this.rowGapChange.bind(this)),this.addBreakpointBtn.addEventListener("click",this.addBreakpointEvent.bind(this)),this.generateCSS.addEventListener("click",this.generateResult.bind(this)),this.copyCSS.addEventListener("click",this.copyResult.bind(this)),this.closeModal.addEventListener("click",this.closeResult.bind(this))}colChange(){this.minCol.value<0||(this.minColWidth=this.minCol.value,this.generateGridItems())}colGapChange(){this.gridColGapValue=this.gridColGap.value,this.generateGridItems()}rowGapChange(){this.gridRowGapValue=this.gridRowGap.value,this.generateGridItems()}generateGridItems(){if(this.unifyGap.checked?this.isUnify=!0:this.isUnify=!1,this.isUnify){let e=document.activeElement;"gridColGap"==e.getAttribute("id")&&(this.gridRowGapValue=this.gridColGapValue),"gridRowGap"==e.getAttribute("id")&&(this.gridColGapValue=this.gridRowGapValue),this.gridColGap.value=this.gridColGapValue,this.gridRowGap.value=this.gridRowGapValue}let e="display: grid; \ngrid-template-columns: "+`repeat(auto-fit, minmax(<span>${this.minColWidth}px</span>, 1fr));`+"\n"+`grid-gap: <span>${this.gridRowGapValue}px ${this.gridColGapValue}px</span>;`;document.querySelector("#gridCodePreview").innerHTML=e,this.gridWrapper.style.gridTemplateColumns=`repeat(auto-fit, minmax(${this.minColWidth}px, 1fr))`,this.gridWrapper.style.gridColumnGap=`${this.gridColGapValue}px`,this.gridWrapper.style.gridRowGap=`${this.gridRowGapValue}px`}addBreakpointEvent(e){e.preventDefault();let t=this.addBreakpoint();this.breakPointsList.appendChild(t)}addBreakpoint(e=0){let t=e>0?e:this.breakPointsList.children.length,i=document.createElement("div");i.classList.add("flex-breakpoints-item");let r=document.createElement("button");r.innerHTML="remove",r.setAttribute("aria-label","Remove Breakpoint"),r.addEventListener("click",this.deleteBreakpoint.bind(this));let n=document.createElement("h3");n.innerHTML=`Breakpoint ${t+1}`;let a=document.createElement("div");a.classList.add("o-grid--2");let s=document.createElement("div"),l=document.createElement("label");l.classList.add("c-label"),l.setAttribute("for",`fromWidth-${t+1}`),l.innerHTML="Min Width";let o=document.createElement("input");o.classList.add("c-input"),o.setAttribute("type","number"),o.setAttribute("id",`fromWidth-${t+1}`),o.setAttribute("placeholder","e.g: 500px"),o.setAttribute("required","");let d=document.createElement("div"),p=document.createElement("label");p.classList.add("c-label"),p.setAttribute("for",`itemsToShow-${t+1}`),p.innerHTML="Items";let u=document.createElement("input");return u.classList.add("c-input"),u.setAttribute("type","number"),u.setAttribute("id",`itemsToShow-${t+1}`),u.setAttribute("placeholder","e.g: 3"),u.setAttribute("required",""),s.appendChild(l),s.appendChild(o),d.appendChild(p),d.appendChild(u),a.appendChild(s),a.appendChild(d),i.appendChild(r),i.appendChild(n),i.appendChild(a),this.flexBreakpointsInfo.push({firstInput:o.getAttribute("id"),secondInput:u.getAttribute("id")}),this.flexBreakpointsInfo.length>0&&this.generateCSS.removeAttribute("disabled"),i}renameFlexbreakpointsInfo(e){this.flexBreakpointsInfo=[],console.log(e);for(let t=0;t<e;t++)this.flexBreakpointsInfo.push({firstInput:`fromWidth-${t+1}`,secondInput:`itemsToShow-${t+1}`})}updateBreakpoints(){let e=this.breakPointsList.children.length,t=document.querySelectorAll(".flex-breakpoints-item");e>0?this.generateCSS.removeAttribute("disabled"):this.generateCSS.setAttribute("disabled","");for(let i=0;i<e;i++){t[i].querySelector("h3").innerHTML=`Breakpoint ${i+1}`;let e=t[i].querySelector(".o-grid--2 > div:first-child label"),r=t[i].querySelector(".o-grid--2 > div:first-child input");e.setAttribute("for",`fromWidth-${i+1}`),r.setAttribute("id",`fromWidth-${i+1}`);let n=t[i].querySelector(".o-grid--2 > div:last-child label"),a=t[i].querySelector(".o-grid--2 > div:last-child input");n.setAttribute("for",`itemsToShow-${i+1}`),a.setAttribute("id",`itemsToShow-${i+1}`)}}getBreakpoints(){this.flexBreakpoints=[];for(var e=0;e<this.flexBreakpointsInfo.length;e++){var t=this.flexBreakpointsInfo[e].firstInput,i=this.flexBreakpointsInfo[e].secondInput,r=document.querySelector("#"+t).value,n=document.querySelector("#"+i).value;this.flexBreakpoints.push({breakpointFrom:r,numOfItems:n})}}deleteBreakpoint(e){e.preventDefault(),e.target.parentNode.parentNode.removeChild(e.target.parentNode),this.updateBreakpoints();let t=e.target.parentNode.querySelector(".c-label").getAttribute("for"),i=parseInt(t.replace(/[^0-9]/g,""),10);this.flexBreakpointsInfo.splice(i-1,1),this.renameFlexbreakpointsInfo(this.flexBreakpointsInfo.length),console.log(this.flexBreakpointsInfo)}addDefaultBreakpoints(){for(var e=0;e<3;e++){var t=this.addBreakpoint(e),i=t.querySelector("h3"),r=t.querySelectorAll("input");this.breakPointsList.appendChild(t),0===e&&(i.innerHTML="Small",r[0].value="320",r[1].value="2"),1===e&&(i.innerHTML="Medium",r[0].value="768",r[1].value="3"),2===e&&(i.innerHTML="Large",r[0].value="1024",r[1].value="4")}}generateResult(e){e.preventDefault(),this.getBreakpoints();let t=[],i=`@mixin grid() {\n        display: flex;\n        flex-wrap: wrap;\n\n        @supports(grid-area: auto) {\n            display: grid;\n            grid-gap: ${this.gridColGapValue}px ${this.gridRowGapValue}px;\n        }\n    }\n    @mixin gridAuto() {\n            margin-left: -${this.gridColGapValue}px;\n\n            > * {\n                margin-bottom: ${this.gridRowGapValue}px;\n                margin-left: ${this.gridColGapValue}px;\n            }\n        `;for(var r=0;r<this.flexBreakpoints.length;r++)if(""!=this.flexBreakpoints[r].breakpointFrom&&""!=this.flexBreakpoints[r].numOfItems){var n=`\n                @media (min-width: ${this.flexBreakpoints[r].breakpointFrom}px) {\n                    > * {\n                        width: calc((99%/ #{${this.flexBreakpoints[r].numOfItems}}) - ${this.gridColGapValue}px);\n                        flex: 0 0 calc((99% / #{${this.flexBreakpoints[r].numOfItems}}) - ${this.gridColGapValue}px);\n                    }\n                }\n            `;t.push(n)}var a=`\n        @supports(grid-area: auto) {\n            grid-template-columns: repeat(auto-fit, minmax(${this.minColWidth}px, 1fr));\n            margin-left: 0;\n\n            > * {\n                width: auto;\n                margin-left: 0;\n                margin-bottom: 0;\n            }\n        }\n\n    }`;let s=i+"\n"+t.join("\n")+"\n"+a;this.resultCode.innerHTML=s,this.resultModal.classList.add("is-active");let l=this.resultModal.querySelectorAll("a[href]:not([disabled]), button:not([disabled])"),o=l[0],d=l[l.length-1];this.resultModal.addEventListener("keydown",function(e){"Tab"!==e.key&&9!==e.keyCode||(e.shiftKey?document.activeElement===o&&(d.focus(),e.preventDefault()):document.activeElement===d&&(o.focus(),e.preventDefault()))})}copyResult(e){e.preventDefault(),this.resultCode.select(),document.execCommand("copy")}closeResult(e){e.preventDefault(),this.resultModal.classList.remove("is-active")}}new gridToFlex;