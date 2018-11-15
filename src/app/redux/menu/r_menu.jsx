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
import { MenuActions } from './r_menu_actions.jsx';

const defaultState = {
    opened: []
}//defaultState


const MenuReducer = (state = defaultState, action) => {
    switch (action.type) {

        case MenuActions.OPEN:
            return {
                ...state,
                opened: [
                    ...AddOrRemove(state.opened, action),
                ]
            }//return

        case MenuActions.CLOSE:
            let newList = AddOrRemove(state.opened, action);
            console.log("CLOSE");
            console.log(newList);
            return {
                ...state,
                opened: [
                    ...newList
                ]
            }//return

        case MenuActions.TOGGLE:
            let newOpenedState = AddOrRemove(state.opened, action);
            return {
                ...state,
                opened: [
                    ...newOpenedState
                ]
            }

        default:
            return state;

    }//switch
};


export const IsOpened = (currentlyOpen, targetMenu) => {
    //Don't do any 'undefined' validations here. Make if fail and shout loudly 
    //into the browser console. Because components should send proper types anyways.
    return currentlyOpen.indexOf(targetMenu) >= 0;
}//IsOpened


function AddOrRemove(origList, action) {
    if (typeof action == 'undefined')
        return origList;
    if (typeof action.payload == 'undefined')
        return origList;

    let openedList = [...origList];
    //loop through each menu that Requested to be toggled
    for (let i = 0; i < action.payload.length; i++) {

        //menu that needs to be toggled
        let element = action.payload[i];
        //menu index in the List of Opened menus
        let elementIndex = openedList.indexOf(element);
        let isOpened = elementIndex >= 0;

        switch (action.type) {
            case (MenuActions.OPEN):
                if (isOpened) //menu already opened
                    continue;
                openedList.push(element);
                continue;

            case (MenuActions.CLOSE):
                if (!isOpened) //menu already closed
                    continue;
                openedList.splice(elementIndex, 1) //remove element at index
                continue;

            case (MenuActions.TOGGLE):
                let toggleAction = {
                    type: NaN,
                    payload: [element]
                };
                if (isOpened) //Opened -> toggle to Close
                    toggleAction.type = MenuActions.CLOSE;
                else                //Closed -> toggle to Open
                    toggleAction.type = MenuActions.OPEN;

                openedList = AddOrRemove(openedList, toggleAction);
                continue;

            default:
                continue;
        }//switch
    }//for

    return openedList;
}//AddOrRemove




export default MenuReducer;