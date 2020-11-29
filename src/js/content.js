//Подключаем jquery
(function(d) {
	let injectScript = d.createElement('script');
	injectScript.type = 'text/javascript';
	injectScript.async = true;
	injectScript.src = 'https://code.jquery.com/jquery-3.5.1.min.js';
	injectScript.charset = 'UTF-8';
	(d.head || d.documentElement).appendChild(injectScript);
})(window.document);

/* Подключаем на страницу файл с JS */
(function(d) {
	let injectScript = d.createElement('script');
	injectScript.type = 'text/javascript';
	injectScript.async = true;
	injectScript.src = chrome.runtime.getURL("inject.bundle.js");
	injectScript.charset = 'UTF-8';
	(d.head || d.documentElement).appendChild(injectScript);
})(window.document);
/* Подключаем на страницу файл со стилями */
(function(d){
    var link  = d.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL("css/inject.min.css");
    link.media = 'all';
	link.lazyload = true;
    (d.head || d.documentElement).appendChild(link);
})(window.document);