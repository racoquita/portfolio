this.raco=this.raco||{};this.raco.selectedWork=Handlebars.template(function(e,t,n,r,i){this.compilerInfo=[4,">= 1.0.0"];n=this.merge(n,e.helpers);i=i||{};var s,o,u="function",a=this.escapeExpression;if(o=n.data)s=o.call(t,{hash:{},data:i});else{o=t&&t.data;s=typeof o===u?o.call(t,{hash:{},data:i}):o}return a(s)});