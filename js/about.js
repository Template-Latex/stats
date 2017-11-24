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

// About
var aboutinfo = {
    "version": "0.81",
    "date": "24/11/2017",
    "author": {
        "name": "Pablo Pizarro R.",
        "tag": "@ppizarror",
        "email": "pablo.pizarro@ing.uchile.cl",
        "website": "http://ppizarror.com/",
        "github": "https://github.com/ppizarror"
    },
    "productname": "Template-Latex Stats",
    "productnamefooter": "Stats",
    "productsource": "https://github.com/Template-Latex/stats"
};

// Imprime un acerca-de en consola
function printAboutInfo() {
    console.log(String.format('{0} v{1} ({2})', aboutinfo.productname, aboutinfo.version, aboutinfo.date));
    console.log(String.format('{0} | {1}', aboutinfo.author.name, aboutinfo.author.website));
    console.log(' ');
}

// Muestra el footer
function generateFooter() {
    $('#footer').html(String.format('<a href="{5}"><img src="res/github.png" /> {0}</a> v{1} ({2}) | Autor: <a href="{4}" title="{6}">{3}</a>', aboutinfo.productnamefooter, aboutinfo.version, aboutinfo.date, aboutinfo.author.tag, aboutinfo.author.website, aboutinfo.productsource, aboutinfo.author.name));
}
