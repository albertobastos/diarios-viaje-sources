/*
[align=left]
[img]yyy[/img]
[i]zzz[/i][/align]
*/

(function() {
  // aws & gatsby
  const x = Array.from(document.querySelectorAll('.custom-stage-media a.stage-gallery')).map(a => {
    const text = a.firstElementChild.alt;
    const path = a.href.replace('/large/', '/medium/');
    return [
      '[align=left]',
      '[img]' + path + '[/img]',
      '[i]' + text + '[/i][/align]'
    ].join('\r\n');
  }).join('\r\n\r\n');

  var w = window.open("about:blank");
  var t = w.document.createElement("textarea");
  t.style.width = "100%";
  t.style.height = "100%";
  t.innerHTML = x;
  w.document.body.appendChild(t);
})();