"use strict";(self.webpackChunkcrest_v2=self.webpackChunkcrest_v2||[]).push([[3047],{93205:e=>{function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,r,o){if(t.language===a){var c=t.tokenStack=[];t.code=t.code.replace(r,(function(e){if("function"==typeof o&&!o(e))return e;for(var r,s=c.length;-1!==t.code.indexOf(r=n(a,s));)++s;return c[s]=e,r})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var r=0,o=Object.keys(t.tokenStack);!function c(s){for(var u=0;u<s.length&&!(r>=o.length);u++){var i=s[u];if("string"==typeof i||i.content&&"string"==typeof i.content){var l=o[r],p=t.tokenStack[l],g="string"==typeof i?i:i.content,f=n(a,l),k=g.indexOf(f);if(k>-1){++r;var h=g.substring(0,k),m=new e.Token(a,e.tokenize(p,t.grammar),"language-"+a,p),v=g.substring(k+f.length),d=[];h&&d.push.apply(d,c([h])),d.push(m),v&&d.push.apply(d,c([v])),"string"==typeof i?s.splice.apply(s,[u,1].concat(d)):i.content=d}}else i.content&&c(i.content)}return s}(t.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);