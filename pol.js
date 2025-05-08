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
        // PC 向け
        hideElement('#articleCommentModule');
        hideElement('div:has(> a[data-cl-params*="cmtfloat"])');

        // SP 向け
        hideElement('div#comModule');

        // CO (コメントページなど)
        hideElement('a[data-cl-params*="cmtmod"]');
        hideElement('button[data-cl-params*="cmtmod"]');
        hideElement('section:has(a[data-cl-params*="vote_mod"])');

        // コメントページのリダイレクト（オプション：URLマッチでブロック）
        if (location.href.match(/\/articles\/[^/]+\/comments/)) {
            document.body.innerHTML = document.body.innerHTML = '<h1><b>コメントページはブロックされています。</b></h1><br>アクセス記録が送信されました。';

        }
    }

    // DOMが完全に読み込まれてから実行
    window.addEventListener('load', () => {
        runHidingLogic();
        // 動的に変わる可能性がある場合にも対応
        const observer = new MutationObserver(runHidingLogic);
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();
