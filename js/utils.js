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

var loadingBarAnimation; // Animación de la barra de carga
var staticUrl = location.protocol + '//' + location.host + location.pathname; // Ubicación del archivo web

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

// Redondea un número
function roundNumber(num, scale) {
    if (!("" + num).includes("e")) {
        return +(Math.round(num + "e+" + scale) + "e-" + scale);
    } else {
        var arr = ("" + num).split("e");
        var sig = ""
        if (+arr[1] + scale > 0) {
            sig = "+";
        }
        var i = +arr[0] + "e" + sig + (+arr[1] + scale);
        var j = Math.round(i);
        var k = +(j + "e-" + scale);
        return k;
    }
}

// Crea un loadingbar
function loadingBarTrigger() {
    $('#progressLoading').html(' ');
    switch (processBarAnimationStyle) {
        case 1:
            var bar = new ProgressBar.Circle('#progressLoading', {
                strokeWidth: processBarStrokeWidth,
                easing: 'easeInOut',
                duration: timeDurationProcessBar,
                color: processBarColor,
                trailColor: processBarColor,
                trailWidth: 0.01,
                svgStyle: null
            });
            bar.animate(1);
            break;
        case 2:
            var circle = new ProgressBar.Circle('#progressLoading', {
                color: processBarColor,
                trailColor: processBarLColor,
                strokeWidth: processBarStrokeWidth,
                duration: 2500,
                easing: 'easeInOut'
            });

            circle.set(0.05);

            setTimeout(function() {
                circle.animate(0.3);
            }, 1000);

            setTimeout(function() {
                circle.animate(0.4);
            }, 3500);

            setTimeout(function() {
                circle.animate(0.8);
            }, 5500);

            setTimeout(function() {
                circle.animate(1);
            }, 8000);
            break;
    }
}

// Crea una fecha a partir de un string
function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}

// Hace la diferencia entre dos días
function daydiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

// Ajusta las versiones de desarrollo para gráficos
function parseDevVersion(version) {
    if (version.length > 7) {
        version = version.substring(0, 7);
    }
    return version;
}

// Obtiene parámetro url
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

// Cambia el parámetro de la url
function changeUrlParam(param, value) {
    var currentURL = window.location.href + '&';
    var change = new RegExp('(' + param + ')=(.*)&', 'g');
    var newURL = currentURL.replace(change, '$1=' + value + '&');
    if (getURLParameter(param) !== null) {
        try {
            window.history.replaceState('', '', newURL.slice(0, -1));
        } catch (e) {
            console.log(e);
        }
    } else {
        var currURL = window.location.href;
        if (currURL.indexOf("?") !== -1) {
            window.history.replaceState('', '', currentURL.slice(0, -1) + '&' + param + '=' + value);
        } else {
            window.history.replaceState('', '', currentURL.slice(0, -1) + '?' + param + '=' + value);
        }
    }
}

// Agrega plugins a Chart.js
function initializeChartjsPlugins() {
    Chart.pluginService.register({
        beforeRender: function(chart) {
            if (chart.config.options.showAllTooltips) {
                chart.pluginTooltips = [];
                chart.config.data.datasets.forEach(function(dataset, i) {
                    chart.getDatasetMeta(i).data.forEach(function(sector, j) {
                        chart.pluginTooltips.push(new Chart.Tooltip({
                            _chart: chart.chart,
                            _chartInstance: chart,
                            _data: chart.data,
                            _options: chart.options.tooltips,
                            _active: [sector]
                        }, chart));
                    });
                });
                chart.options.tooltips.enabled = false;
            }
        },
        afterDraw: function(chart, easing) {
            if (chart.config.options.showAllTooltips) {
                if (!chart.allTooltipsOnce) {
                    if (easing !== 1)
                        return;
                    chart.allTooltipsOnce = true;
                }
                chart.options.tooltips.enabled = true;
                Chart.helpers.each(chart.pluginTooltips, function(tooltip) {
                    tooltip.initialize();
                    tooltip.update();
                    tooltip.pivot();
                    tooltip.transition(easing).draw();
                });
                chart.options.tooltips.enabled = false;
            }
        }
    });
}

// Carga un template y genera gráficos
function loadTemplate(templateid) {

    // Limpia errores anteriores
    cleanErrorMsg();
    console.log(String.format('Cargando ID <{0}> ...', templateid));

    // Carga el id
    try {
        st = stat[templateid];
    } catch (e) {
        throwErrorID(errorID.badtemplateid);
        return;
    } finally {}

    // Muestra barra progreso y nombre template
    try {
        $('#templateNameTxt').html(String.format('<a href="{1}">{0}</a>', st.header, st.link));
        $(document).prop('title', 'Stats - ' + st.header);
        $('#progressLoading').fadeTo('slow', processBarSetOpacity);
        loadingBarTrigger();
        loadingBarAnimation = setInterval(function() {
            loadingBarTrigger();
        }, timeDurationProcessBar + 50);
    } catch (e) {
        throwErrorID(errorID.loadingbarsetup);
        return;
    } finally {}

    // Actualiza url
    changeUrlParam('template', st.tag);

    // Limpia estado anterior
    writeGraphCanvases();
    $('#tableMem').html('');
    if (!hasLoaded) {
        $("#mainSelector option[value='none']").remove();
    } else {
        $('#footer').css('display', 'none');
        $('#mainContent').css('display', 'none');
        try {
            if ($.fn.DataTable.isDataTable('#mainTable')) {
                $('#mainTable').DataTable().clear().destroy();
                writeTableHeader();
            }
        } catch (e) {
            throwErrorID(errorID.deletetable, e);
            return;
        } finally {}
    }

    // Se carga archivo de estadísticas
    jQuery.get(String.format('{0}{1}', mainUrl, st.data), function(data) {
        try {
            data = data.split('\n');

            // Se cargan datos a listas
            var plot_id = [];
            var plot_ctime = [];
            var plot_nline = [];
            var plot_ver = [];
            var loadedData = [];

            try {
                for (var i = 1; i < data.length; i++) {
                    a = [];
                    line = data[i].split(' ');
                    for (var j = 0; j < line.length; j++) {
                        if (line[j] != '') {
                            a.push(line[j]);
                        }
                    }
                    loadedData.push(a);
                    plot_id.push(parseInt(a[0]));
                    plot_ctime.push(parseFloat(a[2]));
                    plot_nline.push(parseInt(a[4]));
                    plot_ver.push(parseDevVersion(a[1]));
                    $('#tableMem').append(String.format('<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td></tr>', a[0], a[1], a[2], a[3], a[4], a[5]));
                }
            } catch (e) {
                throwErrorID(errorID.parsedata, e);
                return;
            } finally {}

            // Se genera la tabla
            try {
                lenghtmenuoption = [];
                if (loadedData.length >= tableMaxReg) {
                    lenghtmenuoption = [tableMinReg, tableMedReg, tableHighReg, tableMaxReg];
                } else if (tableHighReg <= loadedData.length && loadedData.length < tableMaxReg) {
                    lenghtmenuoption = [tableMinReg, tableMedReg, tableHighReg, loadedData.length];
                } else if (tableMedReg <= loadedData.length && loadedData.length < tableHighReg) {
                    lenghtmenuoption = [tableMinReg, tableMedReg, loadedData.length];
                } else if (tableMinReg <= loadedData.length && loadedData.length < tableMedReg) {
                    lenghtmenuoption = [tableMinReg, loadedData.length];
                } else {
                    lenghtmenuoption = [loadedData.length];
                }
                $('#mainTable').DataTable({
                    "language": {
                        "url": "http://latex.ppizarror.com/stats/res/tableSpanish.json"
                    },
                    "order": [
                        [0, "desc"]
                    ],
                    "lengthMenu": lenghtmenuoption
                });
            } catch (e) {
                throwErrorID(errorID.generatetable, e);
                return;
            } finally {}
            hasLoaded = true;

            // Estadística tiempos de compilación
            try {
                mean_ctime = roundNumber(jStat.mean(plot_ctime), 2);
                plot_mean_ctime = [];
                plot_partial_mean_ctime = [];
                total_sum = 0.0;
                for (k = 0; k < loadedData.length; k++) {
                    plot_mean_ctime.push(mean_ctime);
                    total_sum += plot_ctime[k];
                    plot_partial_mean_ctime.push(roundNumber(total_sum / (k + 1), 2));
                }
            } catch (e) {
                throwErrorID(errorID.calcctimemean, e);
                return;
            } finally {}

            // Estadística versiones por día
            try {
                day_activity = [];
                day_activity_counter = [];
                for (var i = 0; i < loadedData.length; i++) {
                    k = jQuery.inArray(loadedData[i][3], day_activity);
                    if (k == -1) {
                        day_activity.push(loadedData[i][3]);
                        day_activity_counter.push(1);
                    } else {
                        day_activity_counter[k] += 1;
                    }
                }
            } catch (e) {
                throwErrorID(errorID.errorcreatedayactivitystat, e);
                return;
            } finally {}

            // Plotea las estadísticas
            try {
                if (day_activity.length > 1) {
                    new Chart($('#plot-activityday'), {
                        type: "bar",
                        data: {
                            labels: day_activity,
                            datasets: [{
                                data: day_activity_counter,
                                label: "Número de versiones por día",
                                borderColor: "#7e0042",
                                backgroundColor: "#7e0042"
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                                text: "Actividad por día",
                                fontSize: plotTitleFontSize,
                                fontStyle: plotTitleFontStyle
                            },
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Número de versiones"
                                    },
                                    ticks: {
                                        min: 0
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Fecha"
                                    }
                                }]
                            },
                            legend: {
                                display: false
                            }
                        }
                    });
                } else {
                    $('#plot-activityday').remove();
                }
                if (plotXaxisID) {
                    new Chart($('#plot-ctime'), {
                        type: "line",
                        data: {
                            labels: plot_id,
                            datasets: [{
                                    data: plot_ctime,
                                    label: "Tiempo de compilación (s)",
                                    borderColor: "#8436d7",
                                    backgroundColor: "#8436d7",
                                    fill: false,
                                    borderWidth: plotLineWidth,
                                    radius: 1
                                },
                                {
                                    data: plot_mean_ctime,
                                    label: "Promedio (s)",
                                    borderColor: "#e470f6",
                                    backgroundColor: "#e470f6",
                                    borderDash: [5, 5],
                                    borderWidth: plotLineWidth,
                                    fill: false,
                                    radius: 0
                                },
                                {
                                    data: plot_partial_mean_ctime,
                                    label: "Promedio parcial (s)",
                                    borderColor: "#fccf5f",
                                    backgroundColor: "#fccf5f",
                                    borderWidth: 2,
                                    fill: false,
                                    radius: 0
                                }
                            ]
                        },
                        options: {
                            title: {
                                display: true,
                                text: "Tiempo de compilación",
                                fontSize: plotTitleFontSize,
                                fontStyle: plotTitleFontStyle
                            },
                            tooltips: {
                                mode: "index",
                                intersect: false,
                                callbacks: {
                                    title: function(tooltipItem, data) {
                                        elemindex = plot_id.indexOf(parseInt(tooltipItem[0].xLabel));
                                        if (elemindex != -1) {
                                            return String.format('ID:{2} v{0} ({1}) ', loadedData[elemindex][1], loadedData[elemindex][3], tooltipItem[0].xLabel);
                                        } else {
                                            return tooltipItem[0].xLabel;
                                        }
                                    }
                                }
                            },
                            responsive: true,
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Tiempo de compilación (s)"
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "ID de compilación"
                                    }
                                }]
                            },
                            legend: {
                                display: true
                            }
                        }
                    });
                    new Chart($('#plot-nline'), {
                        type: "line",
                        data: {
                            labels: plot_id,
                            datasets: [{
                                data: plot_nline,
                                label: "Número de líneas de código",
                                borderColor: "#3e95cd",
                                backgroundColor: "#3e95cd",
                                fill: false,
                                radius: 0,
                                tension: 0,
                                borderWidth: plotLineWidth
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                                text: "Número líneas de código en el tiempo",
                                fontSize: plotTitleFontSize,
                                fontStyle: plotTitleFontStyle
                            },
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Líneas de código"
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "ID de compilación"
                                    }
                                }]
                            },
                            legend: {
                                display: false
                            },
                            responsive: true,
                            tooltips: {
                                mode: "index",
                                intersect: false,
                                callbacks: {
                                    title: function(tooltipItem, data) {
                                        elemindex = plot_id.indexOf(parseInt(tooltipItem[0].xLabel));
                                        if (elemindex != -1) {
                                            return String.format('ID:{2} v{0} ({1}) ', loadedData[elemindex][1], loadedData[elemindex][3], tooltipItem[0].xLabel);
                                        } else {
                                            return tooltipItem[0].xLabel;
                                        }
                                    }
                                }
                            }
                        }
                    });
                } else {
                    new Chart($('#plot-ctime'), {
                        type: "line",
                        data: {
                            labels: plot_ver,
                            datasets: [{
                                    data: plot_ctime,
                                    label: "Tiempo de compilación (s)",
                                    borderColor: "#8436d7",
                                    backgroundColor: "#8436d7",
                                    fill: false,
                                    borderWidth: plotLineWidth,
                                    radius: 1
                                },
                                {
                                    data: plot_mean_ctime,
                                    label: "Promedio (s)",
                                    borderColor: "#e470f6",
                                    backgroundColor: "#e470f6",
                                    borderDash: [5, 5],
                                    borderWidth: plotLineWidth,
                                    fill: false,
                                    radius: 0
                                },
                                {
                                    data: plot_partial_mean_ctime,
                                    label: "Promedio parcial (s)",
                                    borderColor: "#fccf5f",
                                    backgroundColor: "#fccf5f",
                                    borderWidth: 2,
                                    fill: false,
                                    radius: 0
                                }
                            ]
                        },
                        options: {
                            title: {
                                display: true,
                                text: "Tiempo de compilación (ctime)",
                                fontSize: plotTitleFontSize,
                                fontStyle: plotTitleFontStyle
                            },
                            tooltips: {
                                mode: "index",
                                intersect: false
                            },
                            responsive: true,
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Tiempo de compilación (s)"
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Número de versión"
                                    }
                                }]
                            },
                            legend: {
                                display: true
                            }
                        }
                    });
                    new Chart($('#plot-nline'), {
                        type: "line",
                        data: {
                            labels: plot_ver,
                            datasets: [{
                                data: plot_nline,
                                label: "Número de líneas de código",
                                borderColor: "#3e95cd",
                                backgroundColor: "#3e95cd",
                                fill: false,
                                radius: 0,
                                tension: 0,
                                borderWidth: plotLineWidth
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                                text: "Línea de código en el tiempo",
                                fontSize: plotTitleFontSize,
                                fontStyle: plotTitleFontStyle
                            },
                            scales: {
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Líneas de código"
                                    }
                                }],
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Número de versión"
                                    }
                                }]
                            },
                            legend: {
                                display: false
                            }
                        }
                    });
                }
            } catch (e) {
                throwErrorID(errorID.genplots, e);
                return;
            } finally {}

            // Obtiene descargas de la versión
            downloads_link_compact = [];
            downloads_link_normal = [];
            downloads_total = [];
            lastday_released = [];
            var lastday_released_str = [];
            lastdownloads_compact_size = [];
            lastdownloads_normal_size = [];
            lastdownloads_total = [];
            lastversion_releases = [];
            sum_compactdownloads = 0;
            sum_normaldownloads = 0;
            var version_releases = [];
            try {
                $.getJSON(st.json, function(json) {
                    for (i = json.length - 1; i >= 0; i--) {
                        try {
                            downloads_link_compact.push(json[i].assets[0].download_count);
                            downloads_link_normal.push(json[i].assets[1].download_count);
                            downloads_total.push(json[i].assets[0].download_count + json[i].assets[1].download_count);
                            lastday_released_str.push(json[i].published_at.substring(0, 10));
                            lastday_released.push(parseDate(json[i].published_at.substring(0, 10)));
                            lastdownloads_compact_size.push(roundNumber(json[i].assets[0].size / 1000, 2));
                            lastdownloads_normal_size.push(roundNumber(json[i].assets[1].size / 1000, 2));
                            lastdownloads_total.push(json[i].assets[0].download_count + json[i].assets[1].download_count);
                            lastversion_releases.push(json[i].tag_name);
                            sum_compactdownloads += json[i].assets[0].download_count;
                            sum_normaldownloads += json[i].assets[1].download_count;
                            version_releases.push(json[i].tag_name);
                        } catch (err) {}
                    }

                    // Obtiene descargas anteriores
                    try {
                        prev_downloads = getDownloadCounter(st.name);
                    } catch (e) {
                        throwErrorID(errorID.retrievedownloadcounter, e);
                        return;
                    } finally {}

                    prev_downloads.reverse();
                    for (var i = 0; i < prev_downloads.length; i++) {
                        version_releases.unshift(prev_downloads[i][1]);
                        downloads_total.unshift(prev_downloads[i][0]);
                    }

                    // Genera descargas acumulado
                    acum_downloads = [downloads_total[0]];
                    for (var i = 1; i < downloads_total.length; i++) {
                        acum_downloads.push(downloads_total[i] + acum_downloads[i - 1]);
                    }
                    sum_lastdownloads = sum_compactdownloads + sum_normaldownloads;

                    // Calcula días de cada versión disponibles
                    lastday_total = [];
                    for (var i = 0; i < lastday_released.length - 1; i++) {
                        lastday_total.push(Math.max(daydiff(lastday_released[i], lastday_released[i + 1]), 1));
                    }
                    lastday_total.push(Math.max(daydiff(lastday_released[lastday_released.length - 1], new Date()), 1));

                    // Descargas por día
                    downloads_compact_per_day = [];
                    downloads_normal_per_day = [];
                    downloads_per_day = [];
                    for (var i = 0; i < lastday_total.length; i++) {
                        downloads_compact_per_day.push(roundNumber(downloads_link_compact[i] / lastday_total[i], 2));
                        downloads_normal_per_day.push(roundNumber(downloads_link_normal[i] / lastday_total[i], 2));
                        downloads_per_day.push(roundNumber(lastdownloads_total[i] / lastday_total[i], 2));
                    }

                    // Número de versión correcto en últimas n-versiones
                    last_n_version = Math.min(30, json.length);

                    // Genera el gráfico de descargas
                    try {
                        if (json.length >= 1) {
                            if (json.length > 1) {
                                new Chart($('#plot-downloadsperday'), {
                                    type: "line",
                                    data: {
                                        labels: lastversion_releases,
                                        datasets: [{
                                                data: downloads_per_day,
                                                label: "Total descargas por día",
                                                borderColor: "#2b2b2b",
                                                backgroundColor: "#2b2b2b",
                                                fill: false,
                                                radius: 1,
                                                borderWidth: plotLineWidth
                                            },
                                            {
                                                data: downloads_normal_per_day,
                                                label: "Modo normal",
                                                borderColor: "#606060",
                                                backgroundColor: "#606060",
                                                fill: false,
                                                radius: 1,
                                                borderWidth: plotLineWidth
                                            },
                                            {
                                                data: downloads_compact_per_day,
                                                label: "Modo compacto",
                                                borderColor: "#a4a4a4",
                                                backgroundColor: "#a4a4a4",
                                                fill: false,
                                                radius: 1,
                                                borderWidth: plotLineWidth
                                            }
                                        ]
                                    },
                                    options: {
                                        title: {
                                            display: true,
                                            text: String.format("Descargas por día últimas {0} versiones", last_n_version),
                                            fontSize: plotTitleFontSize,
                                            fontStyle: plotTitleFontStyle
                                        },
                                        scales: {
                                            yAxes: [{
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: "Descargas por día"
                                                }
                                            }],
                                            xAxes: [{
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: "Número de versión"
                                                }
                                            }]
                                        },
                                        legend: {
                                            display: true
                                        },
                                        responsive: true,
                                        tooltips: {
                                            enabled: true,
                                            mode: "index",
                                            callbacks: {
                                                title: function(tooltipItem, data) {
                                                    elemindex = lastversion_releases.indexOf(tooltipItem[0].xLabel);
                                                    if (elemindex != -1) {
                                                        return String.format('Versión {0} ({1})', tooltipItem[0].xLabel, lastday_released_str[elemindex]);
                                                    } else {
                                                        return tooltipItem[0].xLabel;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                });
                                new Chart($('#plot-acumdownloads'), {
                                    type: "line",
                                    data: {
                                        labels: version_releases,
                                        datasets: [{
                                            data: acum_downloads,
                                            label: "N° de descargas acumuladas",
                                            borderColor: "#9f0000",
                                            backgroundColor: "#9f0000",
                                            fill: false,
                                            borderWidth: plotLineWidth,
                                            radius: 0,
                                            tension: 0,
                                            pointStyle: "circle"
                                        }]
                                    },
                                    options: {
                                        title: {
                                            display: true,
                                            text: "N° de descargas acumuladas",
                                            fontSize: plotTitleFontSize,
                                            fontStyle: plotTitleFontStyle
                                        },
                                        scales: {
                                            yAxes: [{
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: "Descargas acumuladas"
                                                }
                                            }],
                                            xAxes: [{
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: "Número de versión"
                                                }
                                            }]
                                        },
                                        legend: {
                                            display: false
                                        },
                                        tooltips: {
                                            mode: "index",
                                            intersect: false,
                                            callbacks: {
                                                title: function(tooltipItem, data) {
                                                    return String.format('Versión {0}', tooltipItem[0].xLabel);
                                                }
                                            }
                                        },
                                        responsive: true
                                    }
                                });
                                new Chart($('#plot-pielastdays'), {
                                    type: "pie",
                                    data: {
                                        labels: ["Versión compacta", "Versión normal"],
                                        datasets: [{
                                            data: [sum_compactdownloads, sum_normaldownloads],
                                            label: "N° descargas de cada versión",
                                            borderColor: ["#ff6000", "#afac1a"],
                                            backgroundColor: ["#ff6000", "#afac1a"]
                                        }]
                                    },
                                    options: {
                                        title: {
                                            display: true,
                                            text: String.format("Distribución descargas últimas {1} versiones ({0} descargas)", sum_lastdownloads, last_n_version),
                                            fontSize: plotTitleFontSize,
                                            fontStyle: plotTitleFontStyle
                                        },
                                        legend: {
                                            display: true,
                                            position: "right"
                                        },
                                        showAllTooltips: false,
                                        tooltips: {
                                            callbacks: {
                                                label: function(tooltipItem, data) {
                                                    var allData = data.datasets[tooltipItem.datasetIndex].data;
                                                    var tooltipLabel = data.labels[tooltipItem.index];
                                                    var tooltipData = allData[tooltipItem.index];
                                                    var total = 0;
                                                    for (var i in allData) {
                                                        total += allData[i];
                                                    }
                                                    var tooltipPercentage = Math.round((tooltipData / total) * 100);
                                                    return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
                                                }
                                            }
                                        }
                                    }
                                });
                                new Chart($('#plot-totaldownloads'), {
                                    type: downloadTotalChartType,
                                    data: {
                                        labels: version_releases,
                                        datasets: [{
                                            data: downloads_total,
                                            label: "Número de descargas de versión",
                                            borderColor: "#004f16",
                                            backgroundColor: "#004f16",
                                            fill: false,
                                            borderWidth: plotLineWidth,
                                            radius: 2,
                                            pointStyle: "circle"
                                        }]
                                    },
                                    options: {
                                        title: {
                                            display: true,
                                            text: "Total de descargas",
                                            fontSize: plotTitleFontSize,
                                            fontStyle: plotTitleFontStyle
                                        },
                                        scales: {
                                            yAxes: [{
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: "Descargas de cada versión"
                                                },
                                                ticks: {
                                                    min: 0
                                                }
                                            }],
                                            xAxes: [{
                                                scaleLabel: {
                                                    display: true,
                                                    labelString: "Número de versión"
                                                }
                                            }]
                                        },
                                        legend: {
                                            display: false
                                        },
                                        tooltips: {
                                            mode: "index",
                                            intersect: false,
                                            callbacks: {
                                                title: function(tooltipItem, data) {
                                                    return String.format('Versión {0}', tooltipItem[0].xLabel);
                                                }
                                            }
                                        },
                                        responsive: true
                                    }
                                });
                                switch (downloadPartChartType) {
                                    case 'style1':
                                        new Chart($('#plot-partdownloads'), {
                                            type: "bar",
                                            data: {
                                                labels: lastversion_releases,
                                                datasets: [{
                                                        data: lastday_total,
                                                        label: "Días activo",
                                                        borderColor: "#530071",
                                                        backgroundColor: "#530071",
                                                        fill: false,
                                                        borderWidth: plotLineWidth,
                                                        radius: 1,
                                                        pointStyle: "circle",
                                                        yAxisID: "y-axis-2",
                                                        type: "line"
                                                    },
                                                    {
                                                        data: downloads_link_normal,
                                                        label: "Descargas normal",
                                                        borderColor: "#057375",
                                                        backgroundColor: "#057375",
                                                        yAxisID: "y-axis-1"
                                                    },
                                                    {
                                                        data: downloads_link_compact,
                                                        label: "Descargas compacta",
                                                        borderColor: "#aab104",
                                                        backgroundColor: "#aab104",
                                                        yAxisID: "y-axis-1"
                                                    }
                                                ]
                                            },
                                            options: {
                                                title: {
                                                    display: true,
                                                    text: String.format("Descargas por versión y días activos últimas {0} versiones", last_n_version),
                                                    fontSize: plotTitleFontSize,
                                                    fontStyle: plotTitleFontStyle
                                                },
                                                scales: {
                                                    yAxes: [{
                                                        display: true,
                                                        position: "left",
                                                        id: "y-axis-1",
                                                        scaleLabel: {
                                                            labelString: "Número de descargas",
                                                            display: true,
                                                        },
                                                        stacked: true
                                                    }, {
                                                        position: "right",
                                                        id: "y-axis-2",
                                                        gridLines: {
                                                            drawOnChartArea: false,
                                                        },
                                                        scaleLabel: {
                                                            labelString: "Días activo",
                                                            display: true,
                                                        },
                                                        stacked: false
                                                    }],
                                                    xAxes: [{
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: "Número de versión"
                                                        },
                                                        stacked: true
                                                    }]
                                                },
                                                legend: {
                                                    display: true
                                                },
                                                tooltips: {
                                                    mode: "index",
                                                    intersect: true,
                                                    callbacks: {
                                                        title: function(tooltipItem, data) {
                                                            elemindex = lastversion_releases.indexOf(tooltipItem[0].xLabel);
                                                            if (elemindex != -1) {
                                                                return String.format('Versión {0} ({1})', tooltipItem[0].xLabel, lastday_released_str[elemindex]);
                                                            } else {
                                                                return tooltipItem[0].xLabel;
                                                            }
                                                        }
                                                    }
                                                },
                                                responsive: true
                                            }
                                        });
                                        break;
                                    case 'style2':
                                        new Chart($('#plot-partdownloads'), {
                                            type: "line",
                                            data: {
                                                labels: lastversion_releases,
                                                datasets: [{
                                                        data: downloads_link_normal,
                                                        label: "Versión normal",
                                                        borderColor: "#057375",
                                                        backgroundColor: "#057375",
                                                        fill: false,
                                                        borderWidth: plotLineWidth,
                                                        radius: 2,
                                                        pointStyle: 'circle',
                                                        tension: 0,
                                                        yAxisID: "y-axis-1"
                                                    },
                                                    {
                                                        data: downloads_link_compact,
                                                        label: "Versión compacta",
                                                        borderColor: "#aab104",
                                                        backgroundColor: "#aab104",
                                                        fill: false,
                                                        borderWidth: plotLineWidth,
                                                        radius: 2,
                                                        pointStyle: 'rect',
                                                        tension: 0,
                                                        yAxisID: "y-axis-1"
                                                    },
                                                    {
                                                        data: lastdownloads_total,
                                                        label: "Suma",
                                                        borderColor: "#001471",
                                                        backgroundColor: "#001471",
                                                        fill: false,
                                                        borderWidth: plotLineWidth,
                                                        radius: 2,
                                                        borderDash: [5, 5],
                                                        pointStyle: 'cross',
                                                        tension: 0,
                                                        yAxisID: "y-axis-1"
                                                    },
                                                    {
                                                        data: lastday_total,
                                                        label: "Días activo",
                                                        borderColor: "#530071",
                                                        backgroundColor: "#530071",
                                                        fill: false,
                                                        borderWidth: plotLineWidth,
                                                        radius: 1,
                                                        pointStyle: 'triangle',
                                                        tension: 0,
                                                        yAxisID: "y-axis-2"
                                                    }
                                                ]
                                            },
                                            options: {
                                                title: {
                                                    display: false,
                                                    text: "Descargas por modo",
                                                    fontSize: plotTitleFontSize,
                                                    fontStyle: plotTitleFontStyle
                                                },
                                                scales: {
                                                    yAxes: [{
                                                        display: true,
                                                        position: "left",
                                                        id: "y-axis-1",
                                                        scaleLabel: {
                                                            labelString: "Número de descargas",
                                                            display: true,
                                                        }
                                                    }, {
                                                        display: true,
                                                        position: "right",
                                                        id: "y-axis-2",
                                                        gridLines: {
                                                            drawOnChartArea: false,
                                                        },
                                                        scaleLabel: {
                                                            labelString: "Días activo",
                                                            display: true
                                                        }
                                                    }],
                                                    xAxes: [{
                                                        scaleLabel: {
                                                            display: true,
                                                            labelString: "Número de versión"
                                                        }
                                                    }]
                                                },
                                                legend: {
                                                    display: true
                                                },
                                                tooltips: {
                                                    mode: "index",
                                                    intersect: false,
                                                    callbacks: {
                                                        title: function(tooltipItem, data) {
                                                            elemindex = lastversion_releases.indexOf(tooltipItem[0].xLabel);
                                                            if (elemindex != -1) {
                                                                return String.format('Versión {0} ({1})', tooltipItem[0].xLabel, lastday_released_str[elemindex]);
                                                            } else {
                                                                return tooltipItem[0].xLabel;
                                                            }
                                                        }
                                                    }
                                                },
                                                responsive: true
                                            }
                                        });
                                        break;
                                    default:
                                        throwErrorID(errorID.invalidchartdownloadparttype, '');
                                        return;
                                }
                            } else {
                                $('#plot-downloadsperday').remove();
                                $('#plot-acumdownloads').remove();
                                $('#plot-pielastdays').remove();
                                $('#plot-totaldownloads').remove();
                                $('#plot-partdownloads').remove();
                            }
                            if ((downloads_link_compact[json.length - 1] + downloads_link_normal[json.length - 1]) > 0) {
                                new Chart($('#plot-pielastversion'), {
                                    type: "pie",
                                    data: {
                                        labels: ["Versión compacta", "Versión normal"],
                                        datasets: [{
                                            data: [downloads_link_compact[json.length - 1], downloads_link_normal[json.length - 1]],
                                            label: "N° descargas de cada versión",
                                            borderColor: ["#70dad0", "#535eda"],
                                            backgroundColor: ["#70dad0", "#535eda"]
                                        }]
                                    },
                                    options: {
                                        title: {
                                            display: true,
                                            text: String.format("Distribución descargas última versión v{0} ({1} descargas)", lastversion_releases[json.length - 1], downloads_link_compact[json.length - 1] + downloads_link_normal[json.length - 1]),
                                            fontSize: plotTitleFontSize,
                                            fontStyle: plotTitleFontStyle
                                        },
                                        legend: {
                                            display: true,
                                            position: "right"
                                        },
                                        showAllTooltips: false,
                                        tooltips: {
                                            callbacks: {
                                                label: function(tooltipItem, data) {
                                                    var allData = data.datasets[tooltipItem.datasetIndex].data;
                                                    var tooltipLabel = data.labels[tooltipItem.index];
                                                    var tooltipData = allData[tooltipItem.index];
                                                    var total = 0;
                                                    for (var i in allData) {
                                                        total += allData[i];
                                                    }
                                                    var tooltipPercentage = Math.round((tooltipData / total) * 100);
                                                    return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
                                                }
                                            }
                                        }
                                    }
                                });
                            } else {
                                $('#plot-pielastversion').remove();
                            }
                            new Chart($('#plot-sizeversion'), {
                                type: "line",
                                data: {
                                    labels: lastversion_releases,
                                    datasets: [{
                                            data: lastdownloads_normal_size,
                                            label: "Versión normal",
                                            borderColor: "#ff8f2e",
                                            backgroundColor: "#ff8f2e",
                                            fill: false,
                                            borderWidth: plotLineWidth,
                                            radius: 2,
                                            pointStyle: 'circle'
                                        },
                                        {
                                            data: lastdownloads_compact_size,
                                            label: "Versión compacta",
                                            borderColor: "#ff346f",
                                            backgroundColor: "#ff346f",
                                            fill: false,
                                            borderWidth: plotLineWidth,
                                            radius: 2,
                                            pointStyle: "triangle"
                                        }
                                    ]
                                },
                                options: {
                                    title: {
                                        display: true,
                                        text: String.format("Peso en KB de últimas {0} versiones", last_n_version),
                                        fontSize: plotTitleFontSize,
                                        fontStyle: plotTitleFontStyle
                                    },
                                    scales: {
                                        yAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: "Peso (KB)"
                                            }
                                        }],
                                        xAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: "Número de versión"
                                            }
                                        }]
                                    },
                                    legend: {
                                        display: true
                                    },
                                    tooltips: {
                                        mode: "index",
                                        intersect: true,
                                        callbacks: {
                                            label: function(tooltipItem, data) {
                                                var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                                value = value.toString();
                                                value = value.replace('.', ',');
                                                return String.format('{0}: {1} KB', data.datasets[tooltipItem.datasetIndex].label, value);
                                            },
                                            title: function(tooltipItem, data) {
                                                elemindex = lastversion_releases.indexOf(tooltipItem[0].xLabel);
                                                if (elemindex != -1) {
                                                    return String.format('Versión {0} ({1})', tooltipItem[0].xLabel, lastday_released_str[elemindex]);
                                                } else {
                                                    return tooltipItem[0].xLabel;
                                                }
                                            }
                                        }
                                    },
                                    responsive: true
                                }
                            });
                            // Genera gráfico torta
                            if (showPieDownloadChart) {
                                $('#plot-piedownloads').css('display', 'block');
                                total_downloads_colors_pie = [];
                                for (var i = 0; i < downloads_total.length; i++) {
                                    total_downloads_colors_pie.push('#' + (Math.random().toString(16) + '0000000').slice(2, 8));
                                };
                                new Chart($('#plot-piedownloads'), {
                                    type: "pie",
                                    data: {
                                        labels: version_releases,
                                        datasets: [{
                                            label: "Descargas por versión",
                                            backgroundColor: total_downloads_colors_pie,
                                            borderColor: total_downloads_colors_pie,
                                            data: downloads_total
                                        }]
                                    },
                                    options: {
                                        title: {
                                            display: true,
                                            text: "Descargas por versión",
                                            fontSize: plotTitleFontSize,
                                            fontStyle: plotTitleFontStyle
                                        },
                                        legend: {
                                            display: false
                                        }
                                    }
                                });
                            }
                        } else {
                            $('#plot-totaldownloads').remove();
                            $('#plot-partdownloads').remove();
                            $('#plot-downloadsperday').remove();
                            $('#plot-pielastdays').remove();
                            $('#plot-acumdownloads').remove();
                            $('#plot-sizeversion').remove();
                            $('#plot-piedownloads').remove();
                            $('#plot-pielastversion').remove();
                        }
                    } catch (e) {
                        throwErrorID(errorID.downloadgraph, e);
                        return;
                    } finally {}

                    // Muestra el contenido final con efecto
                    setTimeout(function() {
                        $('#mainContent').fadeIn('slow', function() {
                            $('#footer').css('display', 'inline-block');
                            clearInterval(loadingBarAnimation);
                            $('#progressLoading').html('');
                            $('#progressLoading').fadeTo('slow', 1.0);
                        });
                        console.log('Carga exitosa')
                    }, timeShowContentOnLoad);
                });
            } catch (e) {
                throwErrorID(errorID.getdownloads, e);
                return;
            } finally {}
        } catch (e) {
            throwErrorID(errorID.criticaltemplateloading, e);
            return;
        } finally {}
    });
}

// Regenera los datos de la tabla
function writeTableHeader() {
    $('#tableData').html('<table id="mainTable" class="display" width="100%" cellspacing="0"><thead><tr><th>ID</th><th>Versión</th><th>ctime</th><th>Fecha</th><th>Líneas</th><th>HASH</th></tr></thead><tfoot><tr><th>ID</th><th>Versión</th><th>ctime</th><th>Fecha</th><th>Líneas</th><th>HASH</th></tr></tfoot><tbody id="tableMem"></tbody></table>');
}

// Regenera la sección de los gráficos
function writeGraphCanvases() {
    $('#graphSection').html('<canvas id="plot-ctime" class="graphCanvas" style="margin-top:-8.5px;"></canvas><canvas id="plot-totaldownloads" class="graphCanvas"></canvas><canvas id="plot-partdownloads" class="graphCanvas"></canvas><canvas id="plot-downloadsperday" class="graphCanvas"></canvas><canvas id="plot-pielastdays" class="graphCanvas"></canvas><canvas id="plot-pielastversion" class="graphCanvas"></canvas><canvas id="plot-acumdownloads" class="graphCanvas"></canvas><canvas id="plot-sizeversion" class="graphCanvas"></canvas><canvas id="plot-nline" class="graphCanvas"></canvas><canvas id="plot-piedownloads" class="graphCanvas"></canvas><canvas id="plot-activityday" class="graphCanvas"></canvas>');
}

// Obtiene la lista de descargas y versiones de un id
function getDownloadCounter(templateid) {
    updateDownloadCounter(0, templateid);
    return download_list_counter;
}
