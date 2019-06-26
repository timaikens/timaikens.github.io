(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var a=n(0),s=n.n(a),o=n(8),r=n.n(o),l=n(1),i=n(2),d=n(5),u=n(4),c=n(3),p=n(6),h=function(t){function e(t){var n;return Object(l.a)(this,e),(n=Object(d.a)(this,Object(u.a)(e).call(this,t))).state={dots:""},n.animInterval=null,n}return Object(p.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.animInterval=window.setInterval(function(){console.log("ellipsis itvl"),t.setState(function(t){return{dots:"..."===t.dots?".":t.dots+"."}})},300)}},{key:"componentWillUnmount",value:function(){window.clearInterval(this.animInterval),this.animInterval=null}},{key:"render",value:function(){return s.a.createElement("span",{style:{position:"relative",fontWeight:"bold",fontSize:"1.25em"}},this.props.baseMessage,s.a.createElement("span",{style:{position:"absolute",left:"100%"}},this.state.dots))}}]),e}(a.Component);h.defaultProps={baseMessage:"Loading"};var f=h;var m=function(t){var e=t.isTouch?{borderTop:"1px solid lightgrey"}:{},n=t.isTouch?{display:"block",padding:"16px 0",borderBottom:"1px solid lightgrey"}:{},a=t.isTouch?{display:"block",padding:"8px 0"}:{padding:"8px 24px",borderBottom:"1px solid lightgrey"};return s.a.createElement("table",{style:{borderCollapse:"collapse"}},s.a.createElement("tbody",{style:e},!t.isTouch&&s.a.createElement("tr",{style:n},t.headRow.map(function(t){return s.a.createElement("th",{key:t,style:a},t)})),t.dataRows.map(function(e){return s.a.createElement("tr",{key:e.id,style:n},e.data.map(function(n,o){return s.a.createElement("td",{key:e.id+"-"+n,style:a},t.isTouch?s.a.createElement("span",null,s.a.createElement("strong",null,t.headRow[o],": "),n):n)}),e.button&&s.a.createElement("td",{style:t.isTouch?a:{paddingLeft:16}},s.a.createElement("button",{disabled:e.button.disabled,onClick:e.button.handler,style:{whiteSpace:"nowrap"}},e.button.text)))})))};var y=function(t){function e(t){var n;return Object(l.a)(this,e),(n=Object(d.a)(this,Object(u.a)(e).call(this,t))).antAttributes=["name","length","color","weight"],n.oddsStatusKey={pre:"not yet run",during:"in progress",post:"all calculated"},n.state={ants:[],loading:!0,isTouch:window.innerWidth<972},n.fetchAllAntsData=n.fetchAllAntsData.bind(Object(c.a)(n)),n}return Object(p.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){var t=this;window.addEventListener("resize",function(){var e=window.innerWidth<972;t.state.isTouch!==e&&t.setState({isTouch:window.innerWidth<972})}),this.fetchAllAntsData()}},{key:"fetchAllAntsData",value:function(t){var e=this,n=t?"https://cors-anywhere.herokuapp.com/https://guarded-shore-81814.herokuapp.com/graphql":"https://antserver-blocjgjbpw.now.sh/graphql",a="\n      {\n        ants {\n          ".concat(this.antAttributes.join(" "),"\n        }\n      }\n    "),s=n+"?query="+encodeURIComponent(a.replace(/\s\s+/g," "));fetch(s).then(function(t){if(!t.ok)throw Error(t.statusText);return t}).then(function(t){return t.json()}).then(function(t){if(t&&t.data&&t.data.ants){var n=t.data.ants.map(function(t,n){return t.id=n+1,t.odds=null,t.oddsStatus=e.oddsStatusKey.pre,t.calculateOdds=function(){var t=7e3+7e3*Math.random(),e=Math.random();return function(n){setTimeout(function(){n(e)},t)}}(),t});e.setState({ants:n,loading:!1})}}).catch(function(n){console.log(n),t?e.setState({loading:!1}):e.fetchAllAntsData(!0)})}},{key:"calculateOdds",value:function(t){var e=this;(t=t.filter(function(t){return t.oddsStatus===e.oddsStatusKey.pre})).forEach(function(t){e.setState(function(n){return{ants:n.ants.map(function(n){return n===t&&(n.oddsStatus=e.oddsStatusKey.during),n})}}),t.calculateOdds(function(n){e.setState(function(a){return{ants:a.ants.map(function(a){return a===t&&(a.oddsStatus=e.oddsStatusKey.post,a.odds=Math.round(1e4*n)/100+"%"),a})}})})})}},{key:"calculateAllOdds",value:function(){this.calculateOdds(this.state.ants)}},{key:"render",value:function(){var t,e=this,n=this.state.isTouch,a=this.antAttributes.concat("odds"),o=e.state.ants.every(function(t){return t.oddsStatus===e.oddsStatusKey.post})?e.oddsStatusKey.post:e.state.ants.every(function(t){return t.oddsStatus===e.oddsStatusKey.pre})?e.oddsStatusKey.pre:e.oddsStatusKey.during,r=o===this.oddsStatusKey.post||o===this.oddsStatusKey.during&&this.state.ants.every(function(t){return t.oddsStatus!==e.oddsStatusKey.pre}),l=a.map(function(t){return t.charAt(0).toUpperCase()+t.slice(1)}),i=(t=this.state.ants,t.sort(function(t,e){var n=t.odds,a=e.odds;return null!=n&&null!=a?parseFloat(n)>parseFloat(a)?-1:1:null!=n||null!=a?null!=n?-1:1:0})).map(function(t){return{id:t.id,data:a.map(function(e,n){return"odds"===e?null!=t.odds?t.odds:s.a.createElement("em",null,t.oddsStatus):t[e]}),button:{handler:function(){return e.calculateOdds([t])},text:"Calculate Odds",disabled:t.oddsStatus!==e.oddsStatusKey.pre}}});return this.state.loading?s.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",position:"fixed",top:0,right:0,bottom:"40vh",left:0}},s.a.createElement(f,{baseMessage:"Fetching racers"})):s.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",padding:24}},s.a.createElement("div",{style:{display:"inline-flex",flexDirection:"column",alignItems:"flex-start"}},s.a.createElement("h1",{style:n?{}:{paddingLeft:24}},"Ant Racers"),s.a.createElement("div",{style:{display:"inline-flex",flexDirection:"column",alignItems:n?"flex-start":"flex-end",margin:"0 auto"}},s.a.createElement("div",{style:{paddingBottom:24,display:n?"flex":"",flexDirection:"row-reverse",alignItems:"center"}},s.a.createElement("span",{style:n?{paddingLeft:16}:{paddingRight:16}},s.a.createElement("em",null,o)),s.a.createElement("button",{disabled:r,onClick:function(){return e.calculateOdds(e.state.ants)}},"Calculate All Odds")),s.a.createElement(m,{headRow:l,dataRows:i,isTouch:n}))))}}]),e}(a.Component);n(15);r.a.render(s.a.createElement(y,null),document.getElementById("root"))},9:function(t,e,n){t.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.76e43d83.chunk.js.map