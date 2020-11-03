/**
 TEMPLATE-LATEX STATS

 Author: Pablo Pizarro R. @ ppizarror.com
 Licence:
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
 * Actualizador de descargas.
 *
 * @param {number} downloads - Número de descargas
 * @param {string} source - Tipo de fuente
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
                [1229, '<1.8.5'],
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
                [[29, 5], '4.2.8'],
                [[16, 2], '4.3.1'],
                [[4, 3], '4.3.3'],
                [[93, 23], '4.3.6'],
                [[87, 23], '4.3.7'],
                [[67, 24], '4.3.8'],
                [[2, 3], '4.4.3'],
                [[3, 5], '4.4.4'],
                [[22, 10], '4.4.5'],
                [[140, 40], '4.5.0'],
                [[17, 6], '4.5.5'],
                [[32, 8], '4.5.7'],
                [[8, 4], '4.6.0'],
                [[48, 17], '4.6.1'],
                [[150, 47], '4.6.2'],
                [[133, 29], '4.6.3'],
                [[166, 46], '4.6.6'],
                [[68, 17], '4.6.7'],
                [[35, 14], '4.6.8'],
                [[43, 37], '4.7.0'],
                [[39, 32], '4.7.1'],
                [[303, 100], '4.7.2'],
                [[500, 142], '4.7.3'],
                [[523, 124], '4.7.4'],
                [[66, 31], '5.0.0'],
                [[165, 81], '5.0.5'],
                [[118, 67], '5.1.1'],
                [[162, 73], '5.1.2'],
                [[95, 68], '5.1.5'],
                [[174, 94], '5.4.0'],
                [[59, 48], '5.4.5'],
                [[104, 62], '5.4.6'],
                [[438, 151], '5.4.7'],
                [[114, 74], '5.4.8'],
                [[71, 48], '5.5.0'],
                [[47, 51], '5.5.2'],
                [[119, 69], '5.5.3'],
                [[241, 97], '5.5.4'],
                [[89, 53], '5.5.5'],
                [[378, 135], '5.5.7'],
                [[190, 80], '6.0.0'],
                [[101, 53], '6.0.1'],
                [[154, 77], '6.0.2'],
                [[117, 59], '6.0.3'],
                [[81, 65], '6.0.6'],
                [[607, 193], '6.1.0'],
                [[46, 29], '6.1.2'],
                [[57, 24], '6.1.3'],
                [[30, 20], '6.1.4'],
                [[23, 16], '6.1.5'],
                [[72, 42], '6.1.6'],
                [[39, 28], '6.1.7'],
                [[61, 38], '6.2.0'],
                [[207, 67], '6.2.1'],
                [[638, 219], '6.2.2'],
                [[350, 117], '6.2.3'],
                [[348, 116], '6.2.4'],
                [[383, 143], '6.2.5'],
                [[393, 125], '6.2.6'],
                [[91, 67], '6.2.7'],
                [[137, 64], '6.3.0'],
                [[129, 68], '6.3.3'],
                [[152, 89], '6.3.5'],
                [[131, 74], '6.3.7'],
                [[104, 68], '6.4.0'],
                [[396, 125], '6.4.3'],
                [[216, 125], '6.4.4'],
                [[173, 76], '6.4.5'],
                [[160, 86], '6.5.0'],
                [[163, 59], '6.5.2'],
                [[72, 63], '6.5.5'],
                [[97, 61], '6.5.6'],
                [[236, 95], '6.5.7'],
                [[69, 62], '6.5.8'],
                [[219, 103], '6.6.0'],
                [[459, 169], '6.6.2'],
                [[377, 122], '6.7.0'],
                [[247, 149], '6.7.2'],
                [[449, 158], '6.7.3'],
                [[78, 43], '6.7.4'],
                [[156, 61], '6.8.0'],
                [[483, 154], '6.8.1'],
                [[821, 241], '6.8.3'],
                [[135, 71], '6.8.4'],
                [[225, 87], '6.8.5'],
                [[121, 0], '7.0.0'],
                [[664, 0], '7.0.1'],
                [[814, 0], '7.0.3'],
                [[396, 0], '7.0.4'],
                [[325, 0], '7.0.5'],
                [[99, 0], '7.0.6'],
            ];
            break;
        case 'Template-Auxiliares':
            download_list_counter = [
                [[21, 5], '2.0'],
                [[2, 3], '2.2'],
                [[18, 9], '2.4'],
                [[4, 1], '3.0'],
                [[24, 4], '3.1'],
                [[1, 5], '3.5.0'],
                [[1, 1], '4.0'],
                [[2, 1], '4.1.5'],
                [[1, 1], '4.1.6'],
                [[3, 1], '4.1.8'],
                [[2, 1], '4.2.1'],
                [[2, 1], '4.2.4'],
                [[19, 5], '4.2.5'],
                [[14, 4], '4.2.6'],
                [[1, 1], '4.2.7'],
                [[7, 4], '4.3.0'],
                [[2, 1], '4.3.2'],
                [[1, 1], '4.3.3'],
                [[1, 1], '4.3.4'],
                [[9, 3], '4.3.5'],
                [[20, 5], '4.3.7'],
                [[13, 4], '4.4.0'],
                [[11, 3], '4.4.1'],
                [[19, 6], '4.4.2'],
                [[133, 34], '4.4.3'],
                [[6, 0], '5.0.0'],
                [[0, 0], '5.0.4'],
                [[10, 2], '5.0.5'],
                [[4, 0], '5.0.8'],
                [[5, 0], '5.1.0'],
                [[8, 2], '5.1.4'],
                [[10, 2], '5.2.0'],
                [[0, 0], '5.2.1'],
                [[43, 18], '5.2.2'],
                [[6, 1], '5.2.6'],
                [[0, 0], '5.2.7'],
                [[55, 11], '5.2.8'],
                [[7, 3], '5.2.9'],
                [[29, 4], '5.3.0'],
                [[9, 2], '6.0.0'],
                [[7, 0], '6.0.1'],
                [[4, 0], '6.0.2'],
                [[19, 10], '6.0.3'],
                [[16, 8], '6.0.4'],
                [[11, 4], '6.0.5'],
                [[4, 2], '6.0.6'],
                [[2, 3], '6.0.7'],
                [[9, 6], '6.0.8'],
                [[77, 22], '6.0.9'],
                [[30, 12], '6.1.1'],
                [[27, 12], '6.1.2'],
                [[14, 2], '6.1.3'],
                [[24, 5], '6.1.4'],
                [[6, 2], '6.1.5'],
                [[3, 4], '6.2.0'],
                [[8, 2], '6.2.1'],
                [[1, 1], '6.2.2'],
                [[7, 2], '6.2.3'],
                [[7, 3], '6.2.4'],
                [[49, 12], '6.2.8'],
                [[15, 4], '6.2.9'],
                [[9, 4], '6.3.0'],
                [[12, 5], '6.3.3'],
                [[14, 2], '6.3.4'],
                [[3, 2], '6.3.7'],
                [[6, 2], '6.3.8'],
                [[23, 10], '6.4.0'],
                [[7, 4], '6.4.1'],
                [[18, 6], '6.4.2'],
                [[57, 20], '6.4.3'],
                [[36, 9], '6.4.5'],
                [[10, 5], '6.4.7'],
                [[49, 14], '6.4.8'],
                [[4, 1], '6.4.9'],
                [[18, 2], '6.5.0'],
                [[37, 7], '6.5.2'],
                [[97, 19], '6.5.3'],
                [[14, 4], '6.5.4'],
                [[26, 8], '6.5.5'],
                [[7, 0], '7.0.0'],
                [[53, 0], '7.0.1'],
                [[138, 0], '7.0.3'],
                [[38, 0], '7.0.4'],
                [[33, 0], '7.0.5'],
                [[12, 0], '7.0.6'],
                [[8, 0], '7.0.7'],
            ];
            break;
        case 'Template-Controles':
            download_list_counter = [
                [[2, 2], '1.0.0'],
                [[1, 2], '1.0.6'],
                [[2, 1], '1.0.8'],
                [[1, 1], '1.1.3'],
                [[6, 2], '1.1.4'],
                [[3, 1], '1.1.5'],
                [[1, 1], '1.1.6'],
                [[1, 1], '1.1.8'],
                [[1, 1], '1.2.0'],
                [[1, 1], '1.2.1'],
                [[1, 1], '1.2.2'],
                [[5, 2], '1.2.3'],
                [[5, 1], '1.2.4'],
                [[6, 1], '1.2.6'],
                [[4, 3], '1.2.7'],
                [[8, 5], '1.2.8'],
                [[43, 8], '1.2.9'],
                [[0, 0], '2.0.0'],
                [[0, 0], '2.0.3'],
                [[2, 2], '2.0.5'],
                [[2, 2], '2.0.6'],
                [[1, 0], '2.0.8'],
                [[0, 0], '2.1.1'],
                [[4, 1], '2.1.5'],
                [[0, 0], '2.1.8'],
                [[15, 5], '2.1.9'],
                [[0, 0], '2.2.1'],
                [[1, 0], '2.2.2'],
                [[19, 1], '2.2.3'],
                [[0, 0], '2.2.4'],
                [[7, 3], '2.2.5'],
                [[4, 0], '3.0.0'],
                [[4, 0], '3.0.1'],
                [[2, 0], '3.0.2'],
                [[3, 1], '3.0.3'],
                [[8, 5], '3.0.4'],
                [[6, 2], '3.0.5'],
                [[3, 0], '3.0.6'],
                [[1, 1], '3.0.7'],
                [[2, 3], '3.0.8'],
                [[18, 8], '3.0.9'],
                [[13, 6], '3.1.1'],
                [[5, 2], '3.1.2'],
                [[7, 1], '3.1.3'],
                [[10, 2], '3.1.4'],
                [[3, 1], '3.1.5'],
                [[7, 2], '3.2.0'],
                [[2, 1], '3.2.1'],
                [[1, 1], '3.2.2'],
                [[2, 1], '3.2.3'],
                [[2, 1], '3.2.4'],
                [[6, 4], '3.2.8'],
                [[7, 5], '3.2.9'],
                [[2, 2], '3.3.0'],
                [[4, 4], '3.3.3'],
                [[3, 1], '3.3.4'],
                [[3, 1], '3.3.7'],
                [[1, 1], '3.3.8'],
                [[5, 2], '3.4.0'],
                [[1, 1], '3.4.1'],
                [[7, 2], '3.4.2'],
                [[10, 3], '3.4.3'],
                [[15, 6], '3.4.5'],
                [[3, 1], '3.4.7'],
                [[10, 3], '3.4.8'],
                [[0, 0], '3.4.9'],
                [[0, 0], '3.5.0'],
                [[10, 1], '3.5.1'],
                [[26, 7], '3.5.3'],
                [[7, 2], '3.5.4'],
                [[14, 3], '3.5.5'],
                [[4, 0], '4.0.0'],
                [[37, 0], '4.0.1'],
                [[42, 0], '4.0.3'],
                [[16, 0], '4.0.4'],
                [[19, 0], '4.0.5'],
                [[8, 0], '4.0.6'],
                [[3, 0], '4.0.7'],
            ];
            break;
        case 'Professional-CV':
            download_list_counter = [
                [[43, 15], '1.0.3'],
                [[10, 8], '1.0.6'],
                [[16, 9], '1.0.7'],
                [[18, 11], '1.2.0'],
                [[184, 50], '1.2.2'],
                [[21, 12], '1.2.3'],
                [[39, 16], '1.2.4'],
                [[110, 101], '1.2.5'],
                [[122, 35], '1.2.6'],
                [[27, 9], '1.3.0'],
                [[321, 95], '1.3.1'],
                [[96, 25], '1.3.2']
            ];
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
        case 'Template-Tesis':
            download_list_counter = [
                [[41, 40], '0.1.3'],
                [[57, 42], '1.0.0'],
                [[29, 19], '1.0.1'],
                [[30, 19], '1.0.5'],
                [[41, 44], '1.1.1'],
                [[44, 44], '1.1.2'],
                [[60, 45], '1.1.3'],
                [[51, 40], '1.1.5'],
                [[65, 50], '1.1.6'],
                [[89, 52], '1.1.7'],
                [[89, 48], '1.2.0'],
                [[62, 40], '1.2.1'],
                [[105, 52], '1.2.2'],
                [[32, 21], '1.2.3'],
                [[44, 25], '1.2.4'],
                [[69, 20], '1.2.5'],
                [[168, 39], '1.2.6'],
                [[37, 19], '1.2.7'],
                [[59, 35], '1.2.8'],
                [[37, 0], '2.0.0'],
                [[119, 0], '2.0.1'],
                [[160, 0], '2.0.3'],
                [[51, 0], '2.0.4'],
                [[63, 0], '2.0.5'],
                [[19, 0], '2.0.6'],
            ];
            break;
        case 'Template-Reporte':
            download_list_counter = [
                [[17, 4], '1.0.0'],
                [[82, 41], '1.1.0'],
                [[62, 43], '1.1.2'],
                [[41, 23], '1.1.3'],
                [[43, 41], '1.1.5'],
                [[49, 41], '1.1.6'],
                [[65, 49], '1.1.7'],
                [[59, 61], '1.1.8'],
                [[53, 40], '1.1.9'],
                [[105, 67], '1.2.0'],
                [[97, 57], '1.2.2'],
                [[64, 45], '1.2.3'],
                [[94, 39], '1.2.4'],
                [[25, 23], '1.2.5'],
                [[44, 22], '1.2.7'],
                [[76, 22], '1.2.8'],
                [[169, 51], '1.2.9'],
                [[19, 17], '1.3.0'],
                [[32, 18], '1.3.1'],
                [[49, 22], '1.3.2'],
                [[30, 0], '2.0.0'],
                [[97, 0], '2.0.1'],
                [[145, 0], '2.0.3'],
                [[72, 0], '2.0.4'],
                [[43, 0], '2.0.5'],
                [[2, 0], '2.0.6'],
                [[14, 0], '2.0.7'],
            ];
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