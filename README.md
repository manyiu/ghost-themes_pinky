========================================
===                                  ===
===      Pinky Theme for Ghost       ===
===                                  ===
========================================



*************************
***                   ***
***   Installation    ***
***                   ***
*************************

1. Stop your Ghost process.
2. Backup contents, themes of your blog.
3. Copy the whole "pinky/" directory in your Ghost's themes folder (i.e. "content/themes").
4. (Optional) Edit the pinky.js file inside the pinky theme assests folder (content/themes/pinky/assets/js/pinky.js) to enable the Infinite Scroll, Google Analytics or Disqus function.
5. Start your Ghost process. (Please read )
6. (Optional) If you enabled the Infinite Scroll in the pinky.js settings file, YOU MUST enable the Public API feature on your Ghost Admin page. (Admin Page --> Settings --> Labs --> Enable Beta Features --> Public API)
7. Apply Pinky Theme under the Admin page. (Admin Page --> Settings --> General --> Theme)



*************************
***                   ***
***  Infinite Scroll  ***
***                   ***
*************************

>>> Important Notes on Infinite Scroll Function. <<<
Infinite scroll function in this theme is built on the Ghost API. Since the API is still in the beta status, and under heavy development, we cannot guarantee this function will work on the future Ghost versions. This function may not compatable with the future release.

The Ghost API was introduce in 0.7.2.
All version prior than 0.7.2 IS NOT SUPPORTED.

This function is tested on 0.7.4 and 0.7.5.

Due to the limitation of API, infinite scroll can only be activated on index page; authors and tags page are not supported yet.

You can turn on this function in assets/js/pinky.js. Change the INFINITE_SCROLL from "0" to "1". i.e.
from 
const INFINITE_SCROLL = 0;
to
const INFINITE_SCROLL = 1;

You can control the how many charaters are shown in the excerpt by changing the INFINITE_SCROLL_EXCERPT_LIMIT_S and INFINITE_SCROLL_EXCERPT_LIMIT_M value.



*************************
***                   ***
***  GOOGLE_ANALYTICS ***
***                   ***
*************************

You can easily enable the Google Analytics tracking code on all page and post by editing assets/js/pinky.js file:
const GOOGLE_ANALYTICS_ID = "UA-12345678-1"; // Your Google Analytics Tracking ID (i.e. UA-12345678-1).

If you need help to find your Google Analytics Tracking ID, please visit:
https://support.google.com/analytics/answer/1032385?hl=en



*************************
***                   ***
***      DISQUS       ***
***                   ***
*************************

You can easily enable the Disqus on all post by editing assets/js/pinky.js file:
const DISQUS_SHORTNAME = "pinkytheme"; // Your Disqus shortname. Do not include '.disqus.com' at the end.

If you need help to find your Disqus shortname, please visit:
https://help.disqus.com/customer/portal/articles/466208-what-s-a-shortname-










All brand icons used in this theme are trademarks of their respective owners.

2016 Vazue