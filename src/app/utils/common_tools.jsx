/**
 * (C) Copyright 2018 Hewlett Packard Enterprise Development LP” on your code
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
 * of the Software, and to permit persons to whom the Software is furnished to do 
 * so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import * as d3 from 'd3';

/* @param elementName: <string> class name of the element to get dimensions of.
 *                        default = 'svgBody'
*/
export function GetDimensions(elementName = 'svgBody') {
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName(elementName)[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

    return { width: width, height: height }
}//GetDimensions


export function GetNodes() {
    let datum = d3.select('.node').attr("x1");
    let coords = {}
    d3.selectAll(".node").each(function (d, i) {
        let obj = d3.select(this);
        let prop = {
            cx: obj.attr("cx"),
            cy: obj.attr("cy")
        }
        coords[this.id] = prop;
    });

    return coords
}