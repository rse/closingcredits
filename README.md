
ClosingCredits
==============

**Closing Credits for OBS Studio or vMix**

Abstract
--------

**ClosingCredits** is a HTML/CSS/JS Browser Source layer for [OBS
Studio](http://obsproject.com/) or [vMix](https://www.vmix.com/) for
displaying classical closing credits. This is usually placed over
the video stream at the end of an event.

Demo
----

A centrally deployed version of **ClosingCredits** is available under
the URL https://rse.github.io/closingcredits/.

Remote Use
----------

1. Add your *Browser Source* source to *OBS Studio*:

   - Local File: **(disabled)**
   - URL: `https://rse.github.io/closingcredits/?`*options*
   - Width: **1920** (or whatever is your stream resolution width)
   - Height: **1080** (or whatever is your stream resolution height)
   - Use custom frame rate: **(disabled)**
   - Control audio via OBS: **(disabled)**
   - Custom CSS: **(empty)**
   - Shutdown source when not visible: **(enabled)**
   - Refresh browser when scene becomes active: **(enabled)**

   Or add your *Web Browser* input to *vMix*:

   - URL: `https://rse.github.io/closingcredits/?`*options*
   - Width: **1920** (or whatever is your stream resolution width)
   - Height: **1080** (or whatever is your stream resolution height)

Local Use
---------

1. Install [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/).

2. Clone the **ClosingCredits** sources:<br/>
   `git clone --depth 1 https://github.com/rse/closingcredits`<br/>
   `cd closingcredits`<br/>

3. Download all dependencies:<br/>
   `$ npm install`

4. Add your *Browser Source* source to *OBS Studio*:

   - Local File: **(disabled)**
   - URL: *local-path*`/closingcredits/index.html?`*options*
   - Width: **1920** (or whatever is your stream resolution width)
   - Height: **1080** (or whatever is your stream resolution height)
   - Use custom frame rate: **(disabled)**
   - Control audio via OBS: **(disabled)**
   - Custom CSS: **(empty)**
   - Shutdown source when not visible: **(enabled)**
   - Refresh browser when scene becomes active: **(enabled)**

   Or add your *Web Browser* input to *vMix*:

   - URL: `file://`*local-path*`/closingcredits/index.html?`*options*
   - Width: **1920** (or whatever is your stream resolution width)
   - Height: **1080** (or whatever is your stream resolution height)

Options
-------

- **canvasColor**=*color*
- **headerColor**=*color*
- **headerFontSize**=*size*
- **headerFontWeight**=*weight*
- **textColor**=*color*
- **textFontSize**=*size*
- **textFontWeight**=*weight*
- **leftColor**=*color*
- **leftFontSize**=*size*
- **leftFontWeight**=*weight*
- **rightColor**=*color*
- **rightFontSize**=*size*
- **rightFontWeight**=*weight*
- **soundLoop**=*id*
- **pageScrollDuration**=*ms*
- **pageTextURL**=*url*

HUDS
----

Alternatively, instead of running **ClosingCredits** as a standalone
application, it can also be run on top of [Head-Up-Display Server
(HUDS)](https://github.com/rse/huds). The advantage is that instead
of having to interactively control **ClosingCredits**, it can be remote
controlled through HTTP and MQTT.

For this, run HUDS with **ClosingCredits** with:

```sh
npx huds -a 0.0.0.0 -p 9999 -d closingcredits:index-huds.html,index-huds.yaml
```

And then use the following URL for rending **ClosingCredits** in OBS Studio or vMix:

`https://localhost:9999/closingcredits/`

License
-------

Copyright &copy; 2024 Dr. Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

