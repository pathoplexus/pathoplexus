import{j as e}from"./jsx-runtime.C9E4cUVc.js";import{u as m,O as u}from"./useOffCanvas.D0yfKLZw.js";import{r as x}from"./routes.B4evqrXf.js";import"./lapis.BMBLPoxt.js";import"./config.CimgolCL.js";import"./runtimeConfig.CVbULwPe.js";import b from"./AccessionSearchBox.B38fEj_P.js";import"./index.BOC3FD3Q.js";import"./SubmissionRoute.C0UznQB_.js";const h=[{text:"API docs",path:x.apiDocumentationPage()},{text:"Governance",path:"/about/governance"},{text:"Funding",path:"/about/funding"},{text:"Contact",path:"/contact"},{text:"Status",path:"https://status.pathoplexus.org/"}],g={bottom:h},p=`
    .hamburger {
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: space-around;
        flex-flow: column nowrap;
        z-index: 1001;
    }
    
    .burger {                     
        width: 2rem;
        height: 0.25rem;
        border-radius: 10px;
        transform-origin: 1px;
        transition: all 0.3s linear;
    }
    
    .burger1--open {
        transform: rotate(45deg);
    }
    
    .burger1--closed {
        transform: rotate(0);
    }
    
    .burger2--open {
      opacity: 0;
    }
    
    .burger2--closed {
      opacity: 1;
    }
      
    .burger3--open {
      transform: rotate(-45deg);
    }
    
    .burger3--closed {
      transform: rotate(0);
    }
`,c=({isOpen:r})=>e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"hamburger",children:[e.jsx("div",{className:`burger bg-primary-600 burger1--${r?"open":"closed"}`}),e.jsx("div",{className:`burger bg-primary-600 burger2--${r?"open":"closed"}`}),e.jsx("div",{className:`burger bg-primary-600  burger3--${r?"open":"closed"}`})]}),e.jsx("style",{children:p})]}),$=({topNavigationItems:r,gitHubMainUrl:n,siteName:a})=>{const{isOpen:s,toggle:o,close:i}=m();return e.jsxs("div",{className:"relative",children:[s?e.jsx(u,{onClick:i}):e.jsx("button",{className:"absolute z-50 bg-transparent border-none cursor-pointer",onClick:o,"aria-label":"Open main menu",children:e.jsx(c,{isOpen:s})}),e.jsxs("div",{className:`fixed top-0 right-0 bg-white w-64 min-h-screen flex flex-col offCanvasTransform ${s?"translate-x-0":"translate-x-full"}`,children:[e.jsx("button",{className:"absolute z-50 bg-transparent border-none cursor-pointer right-3 top-4",onClick:o,"aria-label":"Close main menu",children:e.jsx(c,{isOpen:s})}),e.jsxs("div",{className:"font-bold p-5 flex flex-col justify-between min-h-screen max-h-screen overflow-y-auto",children:[e.jsxs("div",{children:[e.jsx("div",{className:"h-10",children:e.jsx("a",{href:"/",children:a})}),e.jsx("div",{className:"py-3 pr-2",children:e.jsx(b,{defaultOpen:!0,fullWidth:!0,onSubmitSuccess:i})}),e.jsx("div",{className:"flex-grow divide-y-2 divide-gray-300 divide-solid border-t-2 border-b-2 border-gray-300 border-solid ",children:r.map(({text:l,path:t})=>e.jsx(d,{text:l,level:1,path:t},t))})]}),e.jsxs("div",{className:"mt-auto mb-10",children:[e.jsx("div",{className:"flex justify-end items-center py-5",children:e.jsx("a",{href:n??"https://github.com/loculus-project",children:e.jsx("img",{src:"/github-mark.svg",className:"w-8",alt:"GitHub logo"})})}),e.jsx("div",{className:"font-light divide-y-2 divide-gray-300 divide-solid border-t-2 border-b-2 border-gray-300 border-solid ",children:g.bottom.map(({text:l,path:t})=>e.jsx(d,{text:l,level:1,path:t,type:"small"},t))})]})]})]})]})},d=({text:r,level:n,path:a,type:s})=>{const o=s==="small"?"py-1":"py-3",i={1:"ml-4",2:"ml-8"};return e.jsx("div",{children:e.jsx("div",{className:"flex items-center",children:e.jsx("div",{className:`${i[n]} ${o}`,children:a===!1?r:e.jsxs("a",{href:a,children:[" ",r]})})})})};export{$ as SandwichMenu};
