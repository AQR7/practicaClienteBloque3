function objetoXHR() {
        if (window.XMLHttpRequest) {
            
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            var versionesIE = new Array('Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP');
            for (var i = 0; i < versionesIE.length; i++) {
                try {

                    return new ActiveXObject(versionesIE[i]);
                } catch (errorControlado) {} 
            }
        }

        throw new Error("No se pudo crear el objeto XMLHttpRequest");
    }


var crearEvento = function() {
    function w3c_crearEvento(elemento, evento, mifuncion) {
        elemento.addEventListener(evento, mifuncion, false);
    }

    function ie_crearEvento(elemento, evento, mifuncion) {
        var fx = function() {
            mifuncion.call(elemento);
        };

        elemento.attachEvent('on' + evento, fx);
    }
    if (typeof window.addEventListener !== 'undefined') {
        return w3c_crearEvento;
    } else if (typeof window.attachEvent !== 'undefined') {
        return ie_crearEvento;
    }
}


function textoDIV(nodo, texto) {
  
    while (nodo.firstChild) nodo.removeChild(nodo.firstChild); 
    nodo.appendChild(document.createTextNode(texto));
}