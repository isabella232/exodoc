function getElementsByTagNames(list,obj) {
  if (!obj) var obj = document;
  var tagNames = list.split(",");
  var resultArray = new Array();
  for (var i=0;i<tagNames.length;i++) {
    var tags = obj.getElementsByTagName(tagNames[i]);
    for (var j=0;j<tags.length;j++) {
      resultArray.push(tags[j]);
    }
  }
  var testNode = resultArray[0];
  if (!testNode) return [];
  if (testNode.sourceIndex) {
    resultArray.sort(function (a,b) {
        return a.sourceIndex - b.sourceIndex;
    });
  }
  else if (testNode.compareDocumentPosition) {
    resultArray.sort(function (a,b) {
        return 3 - (a.compareDocumentPosition(b) & 6);
    });
  }
  return resultArray;
}

document.write('<link rel="stylesheet" href="support/format_and_toc.css" type="text/css">')

window.onload = function() {
  document.body.innerHTML=document.body.innerHTML.replace(/<toc>(<\/toc>)?/g, '<center><div id="metadata"></div><div id="toc"></div></center><div id="body">')
  
  var toc = document.getElementById("toc");
  if (toc) {
    var headings = getElementsByTagNames('h2,h3,h4,h5,h6');
    headings.forEach(function(element) {
      toc.innerHTML = toc.innerHTML + '<a class=' + element.tagName + ' href="#'+element.id+'">' + (element.outerHTML.replace(/id=".*"/g, "") + '</a>');
    });
  }
  
  var metadata = document.getElementById("metadata");
  if (metadata) {
    Array.prototype.slice.apply(document.getElementsByTagName("meta")).forEach(function(meta) {
      if(meta.name == "author" || meta.name == "subtitle") {
        metadata.innerHTML += meta.content + "<br>";
      }
    });
  }
}
