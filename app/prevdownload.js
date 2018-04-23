/**
 The MIT License (MIT)

 Copyright 2017-2018 Pablo Pizarro R.

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

var download_list_counter;

/**
 * Actualizador de descargas
 * @param downloads
 * @param source
 * @return {*}
 */
function updateDownloadCounter(downloads, source) {
    switch (source) {
        /**
         * Ajuste por json de Template-Informe
         * https://api.github.com/repos/Template-Latex/Template-Informe/releases
         */
        case 'Template-Informe':
            download_list_counter = [
                [129, '<1.8.5'],
                [60, '1.9.6'],
                [138, '2.0.6'],
                [3, '2.0.7'],
                [3, '2.0.8'],
                [1, '2.0.9'],
                [4, '2.1.1'],
                [55, '2.1.5'],
                [115, '2.2.1'],
                [74, '2.2.2'],
                [17, '2.2.3'],
                [3, '2.2.4'],
                [18, '2.2.5'],
                [7, '2.2.6'],
                [68, '2.3.0'],
                [71, '2.3.1'],
                [12, '2.3.2'],
                [9, '2.3.3'],
                [4, '2.3.4'],
                [33, '2.3.5'],
                [1, '2.3.6'],
                [60, '2.4.0'],
                [3, '2.4.1'],
                [20, '2.4.5'],
                [38, '2.4.6'],
                [6, '2.4.7'],
                [146, '3.0.0'],
                [62, '3.0.1'],
                [28, '3.0.2'],
                [28, '3.0.3'],
                [84, '3.1.0'],
                [3, '3.1.2'],
                [12, '3.1.3'],
                [110, '3.2.0'],
                [31, '3.2.1'],
                [2, '3.2.2'],
                [8, '3.2.3'],
                [110, '3.3.0'],
                [55, '3.4.5'],
                [6, '3.5.0'],
                [8, '3.6.0'],
                [45, '3.6.3'],
                [8, '3.6.7'],
                [1, '3.7.0'],
                [1, '3.7.3'],
                [4, '3.7.4'],
                [4, '3.7.5'],
                [[34, 10], '3.7.7'],
                [[25, 6], '3.8.0'],
                [[2, 1], '3.8.5'],
                [[5, 1], '3.8.6'],
                [[62, 8], '3.8.7'],
                [[23, 5], '3.9.0'],
                [[55, 12], '3.9.1'],
                [[46, 4], '4.0.0'],
                [[4, 2], '4.0.1'],
                [[13, 3], '4.0.2'],
                [[88, 21], '4.0.5'],
                [[7, 3], '4.1.3'],
                [[15, 2], '4.2.0'],
                [[6, 1], '4.2.7'],
                [[27, 5], '4.2.8'],
                [[14, 1], '4.3.1'],
                [[4, 3], '4.3.3'],
                [[93, 23], '4.3.6'],
                [[87, 23], '4.3.7'],
                [[65, 24], '4.3.8'],
                [[2, 2], '4.4.3'],
                [[3, 5], '4.4.4'],
                [[22, 10], '4.4.5'],
                [[140, 40], '4.5.0'],
                [[17, 6], '4.5.5'],
                [[32, 8], '4.5.7'],
                [[8, 4], '4.6.0'],
                [[48, 17], '4.6.1'],
                [[149, 47], '4.6.2'],
                [[133, 29], '4.6.3'],
                [[166, 46], '4.6.6'],
                [[68, 17], '4.6.7'],
                [[35, 14], '4.6.8'],
                [[43, 36], '4.7.0'],
                [[37, 32], '4.7.1'],
                [[293, 100], '4.7.2'],
                [[478, 122], '4.7.3'],
                [[411, 81], '4.7.4']
            ];
            break;
        case 'Template-Auxiliares':
            download_list_counter = [];
            break;
        case 'Template-Tareas':
            download_list_counter = [];
            break;
        case 'Template-Apunte':
            download_list_counter = [];
            break;
        case 'Template-Pautas':
            download_list_counter = [];
            break;
        case 'Template-Controles':
            download_list_counter = [];
            break;
        case 'Template-Tesis':
            download_list_counter = [];
            break;
        case 'Professional-CV':
            download_list_counter = [];
            break;
    }

    let tdownld;
    for (let i = 0; i < download_list_counter.length; i++) {
        tdownld = download_list_counter[i][0];
        if (Array.isArray(tdownld)) {
            downloads += (tdownld[0] + tdownld[1]);
        } else {
            downloads += tdownld;
        }
    }
    return downloads;
}