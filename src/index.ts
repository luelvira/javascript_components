/**
 * @fileoverview
 * This file is part of the javascript_components library. It is a collection of	
 * javascript components that I have created and that I use in my projects.
 *
 * The library is divided into several files, each one with a different component.
 * The components are:
 * - Toast: A toast component that allows you to display messages on the screen
 *   on the same way as Android.
 * - Modal: A modal component that allows you to display a modal window on the screen.
 * - helper: A file with some helper functions. It contains the following functions:
 *   - $: A function that allows you to select elements by id, class or tag
 *   using the querySelector and querySelectorAll methods.
 *   - preventDefault: A function that allows you to prevent the default action
 *   of an event. Combine the preventDefault with the stopPropagation
 *   - cookie2object: A function that allows you to convert a cookie string into an object.
 *   - Extended interfaces: Also contains the extended interfaces for the HTMLElemnts
 *
 * @author Lucas Elvira Martín
 * @version 1.0
 * @license MIT
 * @updated 2022-11
 * @link https://github.com/luelvira/javascript_components
 */


import Toast from './Toast.js';
import Modal from './Modal.js';
import helper from './helper';

export {Toast, Modal, helper};

