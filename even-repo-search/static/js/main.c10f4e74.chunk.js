(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a.p+"static/media/logo.d2bb62d1.png"},function(e,t,a){e.exports=a(20)},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(9),l=a.n(r),i=a(2),c=a(3),o=a(5),u=a(4),d=a(1),h=a(6);a(17),a(18);var m=function(e){return s.a.createElement("div",{className:"card"},s.a.createElement("div",{className:"card-section"},e.badge&&s.a.createElement("span",{className:"badge"},e.badge),s.a.createElement("h5",{className:"title"},e.url?s.a.createElement("a",{href:e.url},e.title):e.title),s.a.createElement("p",{className:"description"},e.description)),e.sections.map(function(e){return s.a.createElement("div",{key:e.id,className:"card-section"},s.a.createElement("p",null,e.title,": ",s.a.createElement("strong",null,e.value)))}))};var p=function(e){var t=e.fetchError?s.a.createElement("span",null,"There was an error in fetching your results.",s.a.createElement("br",null),"Please try another search or wait 30 seconds and try again."):e.loading?"Looking for matches...":e.results.length?"SEARCH results:":e.hasSearched?"No results found, please try another search.":"Please enter query and click SEARCH button above, results appear here.";return s.a.createElement("div",null,s.a.createElement("p",{className:"message"},t),!!e.results.length&&s.a.createElement("div",{className:"card-group"},e.results.map(function(e){return s.a.createElement(m,{key:e.id,url:e.html_url,title:e.full_name,description:e.description,badge:e.fork?"forked":null,sections:[{id:1,title:"Stars",value:e.stargazers_count},{id:2,title:"License",value:e.license&&e.license.name?e.license.name:"(none set)"}]})})))};var b=function(e){return s.a.createElement("footer",null,s.a.createElement("div",{className:"container vertical-center"},"\xa9 2017 Even Financial, Inc. - CONFIDENTIAL"))},v=a(10),f=a.n(v);var g=function(e){return s.a.createElement("header",null,s.a.createElement("div",{className:"container vertical-center"},s.a.createElement("a",{className:"logo",href:"https://evenfinancial.com/",style:{backgroundImage:"url('".concat(f.a,"')")}})))},E=a(7);a(19);var k=function(e){var t={name:e.name,id:e.name+"-input",type:"checkbox",checked:e.checked};return e.onChange&&(t.onChange=e.onChange),e.onBlur&&(t.onBlur=e.onBlur),e.disabled&&(t.className="disabled",t.tabIndex="-1"),s.a.createElement("div",{className:"input-wrapper"},s.a.createElement("div",{className:"vertical-center"},s.a.createElement("div",{className:"checkbox"},s.a.createElement("input",t),s.a.createElement("label",{htmlFor:t.id},e.label))))};var x=function(e){var t={name:e.name,id:e.name+"-input",value:e.value};return e.onChange&&(t.onChange=e.onChange),e.onBlur&&(t.onBlur=e.onBlur),e.disabled&&(t.className="disabled",t.tabIndex="-1"),s.a.createElement("div",{className:"input-wrapper"},s.a.createElement("label",{htmlFor:t.id},e.label),s.a.createElement("div",{className:"select-wrapper"+(e.disabled?" disabled":"")},s.a.createElement("select",t,e.options.map(function(e){return s.a.createElement("option",{key:"opt-".concat(e.value),value:e.value},e.text)}))))};var N=function(e){var t=[],a={name:e.name,id:e.name+"-input",type:"text",value:e.value};return e.onChange&&(a.onChange=e.onChange),e.validationFxn&&(a.onBlur=function(t){e.validationFxn(t.target.value)}),e.errorMessage&&t.push("has-error"),e.disabled&&(t.push("disabled"),a.tabIndex="-1"),s.a.createElement("div",{className:"input-wrapper"},s.a.createElement("label",{htmlFor:a.id},e.label),s.a.createElement("input",Object.assign({},a,{className:t.join(" ")})),e.errorMessage&&s.a.createElement("span",{className:"input-error-msg"},e.errorMessage))},y=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).state={text:"",stars:"",license:"",forked:!1,starsErrorMessage:""},a.handleInput=a.handleInput.bind(Object(d.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(a)),a.setErrorMessage=a.setErrorMessage.bind(Object(d.a)(a)),a.makeValidationFxn=a.makeValidationFxn.bind(Object(d.a)(a)),a.getInitialParams=a.getInitialParams.bind(Object(d.a)(a)),a.licenseTypes=[{text:"All",value:""},{text:"ISC",value:"isc"},{text:"MIT",value:"mit"},{text:"Apache License 2.0",value:"apache-2.0"},{text:"GNU General Public License",value:"gpl"}],a.starsValidationFxn=a.makeValidationFxn("stars",function(e){if(e.match(/^([0-9]+)\.\.([0-9]+)$/)){var t=e.split("..");if(parseInt(t[0],10)>parseInt(t[1],10))return!1}return null!=e.match(/^([0-9]+|[<>]?(?<=[<>])=?[0-9]+|(\*|[0-9]+)\.\.(\*|[0-9]+))$/)},"Accepted formats: 50, >50, >=50, <50, <=50, 50..100 (range, n1 must be < n2).").bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getInitialParams(),window.addEventListener("popstate",function(t){e.getInitialParams()})}},{key:"getInitialParams",value:function(){if(window.location.search){var e=new URLSearchParams(window.location.search);this.setState({text:e.get("text")||"",stars:e.get("stars")||"",license:this.licenseTypes.map(function(e){return e.value}).includes(e.get("license"))?e.get("license"):"",forked:"true"===e.get("forked")},function(){var e=document.getElementById("search-form"),t=e&&e.querySelector("button[type=submit]");t&&t.click()})}}},{key:"handleInput",value:function(e){if(this.props.loading)return!1;var t=e.target,a=t.name,n="checkbox"===t.type?t.checked:t.value;"stars"===a&&(n=n.replace(/\s/g,"")),this.setState(Object(E.a)({},a,n))}},{key:"handleSubmit",value:function(e){if(e.preventDefault(),this.props.loading)return!1;this.starsValidationFxn(this.state.stars)&&this.props.fetchResults(this.state)}},{key:"setErrorMessage",value:function(e,t){this.setState(Object(E.a)({},e+"ErrorMessage",t))}},{key:"makeValidationFxn",value:function(e,t,a){return function(n){return""===n||t(n)?(this.setErrorMessage(e,null),!0):(this.setErrorMessage(e,a||"Error"),!1)}}},{key:"render",value:function(){return s.a.createElement("form",{id:"search-form",onSubmit:this.handleSubmit},s.a.createElement(N,{label:"Text",name:"text",value:this.state.text,onChange:this.handleInput,disabled:this.props.loading}),s.a.createElement(N,{label:"Stars",name:"stars",value:this.state.stars,onChange:this.handleInput,validationFxn:this.starsValidationFxn,errorMessage:this.state.starsErrorMessage,disabled:this.props.loading}),s.a.createElement(x,{label:"License",name:"license",value:this.state.license,onChange:this.handleInput,options:this.licenseTypes,disabled:this.props.loading}),s.a.createElement(k,{label:"Include Forked",name:"forked",checked:this.state.forked,onChange:this.handleInput,disabled:this.props.loading}),s.a.createElement("button",{type:"submit",className:"btn"+(this.props.loading?" disabled loading":"")},"Search"))}}]),t}(n.Component),I=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).state={results:[],hasSearched:!1,loading:!1,fetchError:!1},a.fetchResults=a.fetchResults.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"fetchResults",value:function(e){var t=this;if(e.text||e.stars||e.license){this.setState({loading:!0}),document.activeElement.blur();var a=[],n=[];e.text=e.text.trim(),e.text&&(a.push(e.text),n.push("text="+encodeURIComponent(e.text))),e.stars&&(a.push("stars:"+e.stars),n.push("stars="+encodeURIComponent(e.stars))),e.license&&(a.push("license:"+e.license),n.push("license="+encodeURIComponent(e.license))),e.forked&&(a.push("fork:true"),n.push("forked="+encodeURIComponent(e.forked)));var s=a.join("+");fetch("https://api.github.com/search/repositories?q="+s).then(function(e){if(!e.ok)throw Error(e.statusText);return e}).then(function(e){return e.json()}).then(function(e){t.setState({results:e.items||[],loading:!1,hasSearched:!0})}).catch(function(e){console.log(e),t.setState({results:[],loading:!1,hasSearched:!0,fetchError:!0})});var r="?"+n.join("&");window.history.pushState(null,"",window.location.origin+window.location.pathname+r)}else this.setState({results:[],hasSearched:!1})}},{key:"render",value:function(){return s.a.createElement("div",{className:"outer-wrap"},s.a.createElement(g,null),s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"section"},s.a.createElement("h1",null,"Even Financial GitHub Repository Search")),s.a.createElement("section",{className:"section"},s.a.createElement(y,{fetchResults:this.fetchResults,loading:this.state.loading})),s.a.createElement("div",{className:"section"},s.a.createElement("hr",null)),s.a.createElement("section",{className:"section"},s.a.createElement(p,{results:this.state.results,hasSearched:this.state.hasSearched,loading:this.state.loading,fetchError:this.state.fetchError}))),s.a.createElement(b,null))}}]),t}(n.Component);l.a.render(s.a.createElement(I,null),document.getElementById("root"))}],[[11,1,2]]]);
//# sourceMappingURL=main.c10f4e74.chunk.js.map