/**
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

/**
 * Variables globales
 */
let hasLoaded = false; // Indica si se ha cargado ya un template
let initTemplate = ''; // Template pasado por get en url
let mainUrl = 'https://latex.ppizarror.com/stats/'; // Url principal de los datos

/**
 * Inicio de la aplicación
 * Analizar parámetros de entrada y establecer subtemplates disponibles
 */
$(function () {

    /**
     * Genera los acerca de
     */
    printAboutInfo();
    generateFooter();

    /**
     * Escribe el header de la tabla
     */
    writeTableHeader();

    /**
     * Se agregan plugins a Chart.js
     */
    initializeChartjsPlugins();

    /**
     * Escribe los templates disponibles en el selector
     */
    try {
        let $mainsection = $('#mainSelector');
        for (let $i = 0; $i < Object.keys(stat).length; $i += 1) {
            if (stat[Object.keys(stat)[$i]].available) {
                $mainsection.append($('<option>', {
                    value: Object.keys(stat)[$i],
                    text: stat[Object.keys(stat)[$i]].name
                }));
            }
        }

        // Añade evento change en selector
        $mainsection.on('change', function () {
            loadTemplate($mainsection.val());
        });

        // Desactiva primera opción en el selector
        // noinspection JSCheckFunctionSignatures
        $($mainsection).find('option[value=\'none\']').attr('disabled', 'disabled');

    } catch ($e) {
        throwErrorID(errorID.errorretrievetemplatelist, $e);
        return;
    } finally {
    }

    /**
     * Obtiene el template desde $GET
     */
    initTemplate = $.urlParam('template');
    let $found;
    if (initTemplate != null) {
        $found = false;
        for (let $i = 0; $i < Object.keys(stat).length; $i += 1) {
            if (stat[Object.keys(stat)[$i]].tag === initTemplate && stat[Object.keys(stat)[$i]].available) {
                $('#mainSelector').val(Object.keys(stat)[$i]);
                setTimeout(function () {
                    loadTemplate(Object.keys(stat)[$i]);
                }, timeProcessOnGETurl);
                $found = true;
                break;
            }
        }
        if (!$found) {
            throwErrorID(errorID.badtemplateid, '');
            return;
        }
    }

    /**
     * Se fija tabla al hacer scroll
     */
    let $lockScrollUpClass = false;
    let $lockScrollDownClass = false;
    // noinspection JSDeprecatedSymbols
    $(window).scroll(function () {
        let $tabledata = $('#tableData');

        // noinspection JSValidateTypes
        if ($(window).scrollTop() > pxScrollDownToFixTable) {
            $lockScrollDownClass = false;
            if (!$lockScrollUpClass && $(window).height() >= $tabledata.height()) {
                $tabledata.removeClass('nonFixedTableData');
                $tabledata.addClass('fixedTableData');
                $lockScrollUpClass = true;
            }
        } else {
            $lockScrollUpClass = false;
            if (!$lockScrollDownClass) {
                $tabledata.addClass('nonFixedTableData');
                $tabledata.removeClass('fixedTableData');
                $lockScrollDownClass = true;
            }
        }
    });
    // noinspection JSDeprecatedSymbols
    $(window).resize(function () {
        let $tabledata = $('#tableData');

        $lockScrollDownClass = false;
        $lockScrollUpClass = false;
        if ($(window).height() < $tabledata.height()) {
            $tabledata.addClass('nonFixedTableData');
            $tabledata.removeClass('fixedTableData');
        } else {
            // noinspection JSValidateTypes
            if ($(window).scrollTop() > pxScrollDownToFixTable) {
                $tabledata.removeClass('nonFixedTableData');
                $tabledata.addClass('fixedTableData');
            }
        }
    });
});