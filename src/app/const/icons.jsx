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

//<div>Icons made by <a href=
//"
//https://www.flaticon.com/authors/those-icons
//"
//<div>Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
import serverSvg from 'assets/svg/server.svg';
import ramSvg from 'assets/svg/ram.svg';
import screenSvg from 'assets/svg/screen.svg';
//https://www.flaticon.com/free-icon/usb-port_73601#term=port&page=1&position=62
import portSvg from 'assets/svg/port.svg';
//https://www.flaticon.com/free-icon/bug_1126229#term=bug&page=1&position=6
import bugSvg from 'assets/svg/bug.svg';
//https://www.flaticon.com/free-icon/artificial-intelligence_247468#term=robot&page=1&position=18
import chipSvg from 'assets/svg/chip.svg';
//https://www.flaticon.com/free-icon/adapter_1086693#term=adapter&page=1&position=45
import adapterSvg from 'assets/svg/adapter.svg';
//<div>Icons made by <a href="https://www.flaticon.com/authors/vitaly-gorbachev" title="Vitaly Gorbachev">Vitaly Gorbachev</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
import bridgeSvg from 'assets/svg/bridge.svg';
//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
import defaultSvg from 'assets/svg/default.svg';

import logo_small from 'assets/logo_small.svg';


export const IconTypes = {
    "server": "switch",
    "logo": "logo",
    "bridge": "discrete_bridge",
    "node": "node",
    "port": "port",
    "debugger": "debugger",
    "qemu": "qemu",
    "chip": "chip",
    "adapter": "adapter"
};

const ViewboxType = {
    "small": "small"
}

export function GetRawSvg(icon_type) {
    let icon_obj = "";
    switch (icon_type) {
        case IconTypes.server:
            icon_obj = serverSvg;
            break;
        case "ram":
            icon_obj = ramSvg;
            break;
        case IconTypes.node:
            icon_obj = screenSvg;
            break;
        case IconTypes.port:
            icon_obj = portSvg;
            break;
        case IconTypes.debugger:
            icon_obj = bugSvg;
            break;
        case IconTypes.qemu:
            icon_obj = chipSvg;
            break;
        case IconTypes.chip:
            icon_obj = chipSvg;
            break;
        case IconTypes.adapter:
            icon_obj = adapterSvg;
            break;
        case IconTypes.logo:
            icon_obj = logo_small;
            break;
        case IconTypes.bridge:
            icon_obj = bridgeSvg;
            break;
        default:
            icon_obj = defaultSvg;
            break;
    }//switch
    return icon_obj;
}//global


// Basically a python's {}.get() imitation. This helps to avoid errors and return
// proper default values (even if its just an empty string, DOM will figure it 
// out... or not).
export function GetViewbox(viewboxTypeName) {
    switch (viewboxTypeName) {
        case (ViewboxType.small):
            return "120 100 200 100";
        default:
            //maybe user sends an actual viewbox size (e.g. 0 0 300 400) - then
            //return it. If it is not that - even gibberish will be set to a viewbox
            //element's property which will be apparent to user during debugging.
            return viewboxTypeName;
    }//switch
}//Getviewbox