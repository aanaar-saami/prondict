/*
 * Copyright (C) 2007 Universitat d'Alacant / Universidad de Alicante
 * Author: Enrique Benimeli Bofarull
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA
 * 02111-1307, USA.
 */

var xmlHttp;
var timerId;
//var direction = document.forms[0].direction.value;
ajaxFunction(direction);


function ajaxFunction(dir) {
  //alert("ajaxFunction('" + dir + "')");
  message("Cleaning results...");
  cleanResult();
  //updateOptions(dir);
  try {
    // Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  } catch (e) {
    // Internet Explorer
    try {
      xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
	alert("Your browser does not support AJAX!");
	return false;
      }
    }
  }
  xmlHttp.onreadystatechange=loadXML;
  var fileName = "dics/" + dir + "-trie.xml";
  xmlHttp.open("GET", fileName, true);
  xmlHttp.send(null);
  message("Loading dictionary...");
  startLoadingIndicator();
}

function loadXML() {
  if(xmlHttp.readyState==4) {
    if (xmlHttp.status == 200) {
      stopLoadingIndicator();
      message("");
      var wordE = document.getElementById('word');
      var selectE = document.getElementById('direction');
      delayLookUp( wordE.value, true, selectE.value );
    } else {
      if ( xmlHttp.status == 404 ) {
	stopLoadingIndicator();
	message("Dictionary not found!");
      } else {
        message("Dictionary loaded");
        stopLoadingIndicator();
      }
    }
  }
}

function delayLookUp(value, showLexicalInfo, dir) {
    cleanResult();
    message("");
    if(value.length > 0) {
        startLoadingIndicator();
        cmd = 'lookUp("' + value + '", ' + showLexicalInfo + ', "' + dir + '")';
        clearTimeout(timerId);
        timerId = setTimeout(cmd, 500);
        //message("Retrieving entries starting with <b>" + value + "</b>...");
    }
    
}

function lookUp(value, showLexicalInfo, dir){
    if( value.length >= 1 ) { //cip: here >=3
        var xmldoc = xmlHttp.responseXML;
        var root = xmldoc.getElementsByTagName('root')[0];
        value = value.toLowerCase();
        lookUpRecursive(root, value, showLexicalInfo, dir);
        //message("Entries starting with <b>" + value + "</b>");
        stopLoadingIndicator();
    }
    
}

function lookUpRecursive(parentNode, value, showLexicalInfo, dir) {
    for (var iNode = 0; iNode < parentNode.childNodes.length; iNode++ ) {
        var node = parentNode.childNodes[iNode];
        if( node.nodeName == "w") {
            var source = node.getAttribute("v");
            if(source.length >= value.length) {
                if(showLexicalInfo) {
                    showEntryDetailed(node, dir);
                } else {
                showEntrySimple(node, dir);
            }
        }
    } else {
    var attr = node.attributes;
    if( attr != undefined) {
        var nodevalue = node.getAttribute("v");
        nodevalue = nodevalue.toLowerCase();
        var nodevalueLength = nodevalue.length;
        var valueLength = value.length;
        if( valueLength < nodevalueLength ) {
            var subst = nodevalue.substring(0,valueLength);
            
            if( value == subst ) {
                lookUpRecursive(node, value, showLexicalInfo, dir);
            }
        }
        if( valueLength >= nodevalueLength ) {
            var subst = value.substring(0,nodevalueLength);
            if( nodevalue == subst ) {
                lookUpRecursive(node, value, showLexicalInfo, dir);
            } 
            
        }
    }
}

}
}

function message(text) {
    var divE = document.getElementById('message');
    divE.innerHTML = text;
}

function startLoadingIndicator() {
    var divE = document.getElementById('message2');
    divE.innerHTML = '<img src="src/images/indicator_medium.gif"/>';
}

function stopLoadingIndicator() {
    var divE = document.getElementById('message2');
    divE.innerHTML = '';
}

function showEntrySimple(parentNode, dir) {
    var divE = document.getElementById('result');
    if( parentNode.hasChildNodes() ) {
        for (var iNode = 0; iNode < parentNode.childNodes.length; iNode++) {
            var node = parentNode.childNodes[iNode];
            if(node.nodeName == "l") {
                var left = inner_text(node);
                var bE = document.createElement("b");
                var aE = document.createElement("a");
                aE.appendChild(document.createTextNode(left));
                var sl = getSourceLang(dir);
                var url = "http://" + sl + ".wiktionary.org/wiki/" + left;
                aE.setAttribute("href",url);
                aE.setAttribute("target","_blank");
                bE.appendChild(aE);
                divE.appendChild(bE);
                divE.appendChild(document.createTextNode("   "));
            } 
            if(node.nodeName == "r") {
                var right = inner_text(node);
                var aE = document.createElement("a");
                var url = "http://" + getTargetLang(dir) + ".wiktionary.org/wiki/" + right;
                aE.setAttribute("href", url);
                aE.setAttribute("target","_blank");
                aE.appendChild(document.createTextNode(right));
                divE.appendChild(aE);
                divE.appendChild(document.createElement("br"));
            }
        }
    }
}

function showEntryDetailed(parentNode, dir) {
    var divE = document.getElementById('result');
    if( parentNode.hasChildNodes() ) {
        for (var iNode = 0; iNode < parentNode.childNodes.length; iNode++) {
            var node = parentNode.childNodes[iNode];
            if(node.nodeName == "l") {
                processNodeLeft(node, divE, "leftValue");
                divE.appendChild(document.createTextNode("   "));									
            } 
            if(node.nodeName == "r") {
                processNodeRight(node, divE, "rightValue");
                divE.appendChild(document.createElement("br"));
            }
        }
    }
}

function getSourceLang(dir) {
    var data = new Array();
    data = dir.split("-");
    var sl = data[0];
    var tl = data[1];	
    var dir = data[2];
    if(dir == "lr") {
        return sl;
    } else {
    return tl;
    }
}

function getTargetLang(dir) {
    var data = new Array();
    data = dir.split("-");
    var sl = data[0];
    var tl = data[1];	
    var dir = data[2];
    if(dir == "lr") {
        return tl;
    } else {
    return sl;
    }
}

function processNodeLeft(node, divE, clase) {
    //var trgLabel = document.getElementById('trg_label').innerHTML;
    //message("trgLabel ... " + trgLabel);
    var leftV = inner_text(node);
    var pTree = document.createElement("p");
    pTree.setAttribute("class", "tree");
    var spanLeft = document.createElement("span");
    spanLeft.setAttribute("class", "lemma");
    var leftElement = document.createTextNode(leftV + " ");
    spanLeft.appendChild(leftElement);
    pTree.appendChild(spanLeft);
    if( node.hasChildNodes() ) {
        for (var jNode = 0; jNode < node.childNodes.length; jNode++) {
            var sNode = node.childNodes[jNode];
            if (sNode.nodeName == "s" ) {
                var nAttr = sNode.getAttribute("n");
                var spanElement = document.createElement("span");
		
                    spanElement.setAttribute("class","attribute");
                    spanElement.setAttribute("data-balloon-pos","down-left");
		    
                    var pos_tag = '_pos_';
		    
		    switch (nAttr) {
                    case "n":
			pos_tag = 'noun';
			break;
                    case "a":
			pos_tag = 'adjektiv';
			break;
                    case "adv":
			pos_tag = 'adverb';
			break;
                    case "v":
			pos_tag = 'verb';
			break;
                    case "pn":
			pos_tag = 'proper noun';
			break;
		    default:
			pos_tag = '_pos_';
                    }
                spanElement.setAttribute("aria-label",pos_tag);
                var textE = document.createTextNode(nAttr);
		spanElement.appendChild(textE);
		var spanTT = document.createElement("span");
		pTree.appendChild(spanElement);
		divE.appendChild(pTree);
            }
	}
    }
}

function processNodeRight(node, divE, clase) {
    /*
    var trgLabel = document.getElementById('trg_label').innerHTML;
    message("trgLabel ... " + trgLabel);
    var spanLeft = document.createElement("span");
    spanLeft.setAttribute("class", clase);
    var leftElement = document.createTextNode("");
    spanLeft.appendChild(leftElement);
    divE.appendChild(spanLeft);
    */
    var ulTree = document.createElement("ul");
    ulTree.setAttribute("class", "tree");
    var liSg = document.createElement("li");
    var liSgSpan = document.createElement("span");
    liSgSpan.setAttribute("class","attr");
    var liSgPl = document.createElement("li");
    var liSgPlSpan = document.createElement("span");
    liSgPlSpan.setAttribute("class","attr");
    var liPl = document.createElement("li");
    var liPlSpan = document.createElement("span");
    liPlSpan.setAttribute("class","attr");
    var ulSg = document.createElement("ul");
    var ulSgPl = document.createElement("ul");
    var ulPl = document.createElement("ul");
    
    if( node.hasChildNodes() ) {
        for (var jNode = 0; jNode < node.childNodes.length; jNode++) {
            var sNode = node.childNodes[jNode];
            if (sNode.nodeName == "s" ) {
                var arrayOfStrings = sNode.getAttribute("n").split(':');
                var nAttrType = sNode.getAttribute("n").split(':')[0];
                var nAttrValue = sNode.getAttribute("n").split(':')[1];
                if (arrayOfStrings.length >= 3) {
                    nAttrValue = nAttrValue.concat(":").concat(sNode.getAttribute("n").split(':')[2]);
                }
		var liElement = document.createElement("li");
                var liSpanElement = document.createElement("span");
		liSpanElement.setAttribute("class","attr");
		
		switch (nAttrType) {
		case "NR":
		    nAttrValue = "[".concat(nAttrValue.concat("]"));
		    var textE = document.createTextNode(nAttrValue);
		    switch (nAttrValue) {
		    case "[Sg]":
			liSgSpan.appendChild(textE);
			liSg.appendChild(liSgSpan);
		    	break;
		    case "[Sg/Pl]":
			liSgPlSpan.appendChild(textE);
			liSgPl.appendChild(liSgPlSpan);
		    	break;
		    case "[Pl]":
			liPlSpan.appendChild(textE);
			liPl.appendChild(liPlSpan);
		    	break;
		    }
		    break;
		case "SgCS":
		    nAttrValue = "[".concat(nAttrValue.concat("]"));
		    var textE = document.createTextNode(nAttrValue);
		    liSpanElement.appendChild(textE);
		    liElement.appendChild(liSpanElement);
		    var nextSiblingValue =  node.childNodes[jNode+1].getAttribute("n").split(':')[1];
		    var textV = document.createTextNode(nextSiblingValue);
		    liElement.appendChild(textV);
		    ulSg.appendChild(liElement);
		    break;
		case "SgPlCS":
		    nAttrValue = "[".concat(nAttrValue.concat("]"));
		    var textE = document.createTextNode(nAttrValue);
		    liSpanElement.appendChild(textE);
		    liElement.appendChild(liSpanElement);
		    var nextSiblingValue =  node.childNodes[jNode+1].getAttribute("n").split(':')[1];
		    var textV = document.createTextNode(nextSiblingValue);
		    liElement.appendChild(textV);
		    ulSgPl.appendChild(liElement);
		    break;
		case "PlCS":
		    nAttrValue = "[".concat(nAttrValue.concat("]"));
		    var textE = document.createTextNode(nAttrValue);
		    liSpanElement.appendChild(textE);
		    liElement.appendChild(liSpanElement);
		    var nextSiblingValue =  node.childNodes[jNode+1].getAttribute("n").split(':')[1];
		    var textV = document.createTextNode(nextSiblingValue);
		    liElement.appendChild(textV);
		    ulPl.appendChild(liElement);
		    break;
		}
		liSg.appendChild(ulSg);
		liSgPl.appendChild(ulSgPl);
		liPl.appendChild(ulPl);
		ulTree.appendChild(liSg);
		ulTree.appendChild(liSgPl);
		ulTree.appendChild(liPl);
		divE.appendChild(ulTree);
	    }
	}
    }
}



function cleanResult() {
    var divE = document.getElementById('result');
    if ( divE.hasChildNodes() ) {
        while ( divE.childNodes.length >= 1 ) {
            divE.removeChild( divE.firstChild );
        }
    }
}

function lexicalInfo(checkBox) {
    var inputE = document.getElementById('word');
    if(checkBox.checked==true) {
        inputE.setAttribute("onkeyup","lookUp(this.value, true, document.forms[0].direction.value);");
    } else {
    if(checkBox.checked == false) {
        inputE.setAttribute("onkeyup","lookUp(this.value, false, document.forms[0].direction.value);");
    }
}
}

function inner_text(node){
    if( node != undefined) {
        for (var jNode = 0; jNode < node.childNodes.length; jNode++) {
            var sNode = node.childNodes[jNode];
            if (sNode.nodeType == 3) {
                return sNode.data;
            }
        }
    }
}
