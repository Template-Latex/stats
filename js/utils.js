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

// Añade format a los strings
if (!String.format) {
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}

// Obtiene parámetros de la url
$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return decodeURI(results[1]) || 0;
    }
}

function FileHelper() {
    FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom) {
        var request = new XMLHttpRequest();
        request.open("GET", pathOfFileToReadFrom, false);
        request.send(null);
        var returnValue = request.responseText;
        return returnValue;
    }
}

// Carga un template y genera gráficos
function loadTemplate(templateid) {
    if (!hasLoaded) {
        $("#mainSelector option[value='none']").remove();
    } else {
        $('#mainContent').css('display', 'none');
        if ($.fn.DataTable.isDataTable('#mainTable')) {
            $('#mainTable').DataTable().clear().destroy();
            writeTableHeader();
        }
    }
    st = stat[templateid];
    $('#templateName').html(String.format('<img src="res/icon.png" /> {0}', st.name));
    $('#tableMem').html('');
    jQuery.get(String.format('{0}{1}', mainUrl, st.data), function(data) {
        data = data.split('\n');
        loadedData = [];
        for (var i = 1; i < data.length; i++) {
            a = [];
            line = data[i].split(' ');
            for (var j = 0; j < line.length; j++) {
                if (line[j] != '') {
                    a.push(line[j]);
                }
            }
            loadedData.push(a);
            $('#tableMem').append(String.format('<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td></tr>', a[0], a[1], a[2], a[3], a[4], a[5]));
        }
        for (var i = 0; i < loadedData.length; i++) {
            $('#graphSection').html(loadedData[0]);
        }
        $('#mainTable').DataTable({
            "language": {
                "url": "http://latex.ppizarror.com/stats/res/tableSpanish.json"
            },
            "order": [
                [0, "desc"]
            ],
            "lengthMenu": [15, 50, 100]
        });
        hasLoaded = true;

        // Show element
        setTimeout(function() {
            $('#mainContent').fadeIn('slow', function() {});
        }, 100);

    });
}

function writeTableHeader() {
    $('#tableData').html('<table id="mainTable" class="display" width="100%" cellspacing="0"><thead><tr><th>ID</th><th>Versión</th><th>Ctime</th><th>Fecha</th><th>Líneas</th><th>HASH</th></tr></thead><tfoot><tr><th>ID</th><th>Versión</th><th>Ctime</th><th>Fecha</th><th>Líneas</th><th>HASH</th></tr></tfoot><tbody id="tableMem"></tbody></table>');
}
