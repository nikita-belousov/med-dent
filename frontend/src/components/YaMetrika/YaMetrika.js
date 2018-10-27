import React, { Fragment } from 'react'


const YaMetrika = () => (
  <Fragment>
    <script type="text/javascript" >
      {(function (d, w, c) {
        (w[c] = w[c] || []).push(function() {
          try {
            w.yaCounter50894339 = new global.Ya.Metrika2({
              id:50894339,
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          } catch(e) { }
        });

        var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://mc.yandex.ru/metrika/tag.js";

        if (w.opera === "[object Opera]") {
          d.addEventListener("DOMContentLoaded", f, false);
        } else { f(); }
      })(document, window, "yandex_metrika_callbacks2")}
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/50894339" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div></noscript>
  </Fragment>
);


export { YaMetrika }
