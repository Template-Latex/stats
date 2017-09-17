/*
TEMPLATE-LATEX STATS

Author: Pablo Pizarro R. @ ppizarror.com
Licence:
    The MIT License (MIT)
    Copyright 2017 Pablo Pizarro R.

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Variables globales
var hasLoaded = false; // Indica si se ha cargado ya un template
var initTemplate = ''; // Template pasado por get en url
var loadedData = []; // Datos cargados
var mainUrl = 'http://latex.ppizarror.com/stats/'; // Url principal de los datos

// Analizar parámetros de entrada y establecer subtemplates disponibles
jQuery(document).ready(function($) {

    // Escribe los templates disponibles en el selector
    for (var i = 0; i < Object.keys(stat).length; i++) {
        if (stat[Object.keys(stat)[i]].avaiable) {
            $('#mainSelector').append($('<option>', {
                value: Object.keys(stat)[i],
                text: stat[Object.keys(stat)[i]].name
            }));
        }
    }

    // Añade evento change en selector
    $("#mainSelector").change(function() {
        loadTemplate($("#mainSelector").val());
    });

    // Obtiene el template desde $GET
    initTemplate = $.urlParam('template');
    if (initTemplate != '') {
        for (var i = 0; i < Object.keys(stat).length; i++) {
            if (stat[Object.keys(stat)[i]].tag == initTemplate && stat[Object.keys(stat)[i]].avaiable) {
                $("#mainSelector").val(Object.keys(stat)[i]);
                loadTemplate(Object.keys(stat)[i]);
            }
        }
    }
});
