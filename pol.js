// ==UserScript==
// @name         Y
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Y
// @match        https://news.yahoo.co.jp/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hideElement(selector) {
        const elems = document.querySelectorAll(selector);
        elems.forEach(elem => elem.style.display = 'none');
    }

    function runHidingLogic() {
        // PC
        hideElement('#articleCommentModule');
        hideElement('div:has(> a[data-cl-params*="cmtfloat"])');

        // SP
        hideElement('div#comModule');

        // CO
        hideElement('a[data-cl-params*="cmtmod"]');
        hideElement('button[data-cl-params*="cmtmod"]');
        hideElement('section:has(a[data-cl-params*="vote_mod"])');

        //
        if (location.href.match(/\/articles\/[^/]+\/comments/)) {
            document.body.innerHTML = document.body.innerHTML = '<h1>Blocked<h1>';

        }
    }
    window.addEventListener('load', () => {
        runHidingLogic();
        const observer = new MutationObserver(runHidingLogic);
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();
