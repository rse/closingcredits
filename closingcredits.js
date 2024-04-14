/*
**  ClosingCredits ~ Closing Credits for OBS Studio or vMix
**  Copyright (c) 2024 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  the closing credits knowledge encapsulation  */
window.ClosingCredits = class ClosingCredits {
    constructor (props = {}) {
        /*  take over properties  */
        this.props = {
            canvasColor:        "#000000e0",
            headerColor:        "#aaaaaa",
            headerFontSize:     "30px",
            headerFontWeight:   "200",
            textColor:          "#ffffff",
            textFontSize:       "30px",
            textFontWeight:     "400",
            leftColor:          "#ffffff",
            leftFontSize:       "30px",
            leftFontWeight:     "500",
            rightColor:         "#dddddd",
            rightFontSize:      "30px",
            rightFontWeight:    "300",
            lineHeight:         "40px",
            soundLoop:          "orchester1",
            pageScrollDuration: "10000",
            pageTextURL:        "closingcredits.txt",
            ...props
        }
    }
    async start () {
        /*  create DOM fragment  */
        const el = $(`
            <div class="closingcredits">
                <div class="canvas">
                </div>
            </div>
        `)
        $(el)
            .css("background-color", this.props.canvasColor)
            .css("line-height", this.props.lineHeight)

        /*  inject DOM fragment into DOM tree  */
        $("body").append(el)

        /*  load and parse text  */
        let text = (await axios.get(this.props.pageTextURL))?.data ?? ""
        text = text
            .replace(/\&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\(c\)/g, "&copy;")
        text.replace(/(^|[^\r\n]+)\r?\n-+\r?\n\s*\r?\n((?:[^\r\n]+\r?\n)+)(?=\s*\r?\n|$)/g, (_, h, b) => {
            /*  create header  */
            $(".canvas", el).append(
                $(`<div class="header">${h}</div>`)
                    .css("color", this.props.headerColor)
                    .css("font-size", this.props.headerFontSize)
                    .css("font-weight", this.props.headerFontWeight))

            /*  split body into individial lines  */
            const lines = b.split(/\r?\n/)
            for (const line of lines) {
                const m = line.match(/^(.+?)\s*\|\s*(.+?)\s*$/)
                let child
                if (m !== null) {
                    /*  render left/right columns  */
                    const [ , left, right ] = m
                    child = $(`
                        <div class="columns">
                            <div class="left">${left}</div>
                            <div class="right">${right}</div>
                        </div>
                    `)
                    $(".left", child)
                        .css("color",       this.props.leftColor)
                        .css("font-size",   this.props.leftFontSize)
                        .css("font-weight", this.props.leftFontWeight)
                    $(".right", child)
                        .css("color",       this.props.rightColor)
                        .css("font-size",   this.props.rightFontSize)
                        .css("font-weight", this.props.rightFontWeight)
                }
                else {
                    /*  render single text column  */
                    child = $(`<div class="text">${line}</div>`)
                        .css("color", this.props.textColor)
                        .css("font-size", this.props.textFontSize)
                        .css("font-weight", this.props.textFontWeight)
                }
                $(".canvas", el).append(child)
            }
        })

        /*  optionally start sound loop  */
        let soundid = 0
        if (this.props.soundLoop !== "none") {
            soundid = soundlp.play(this.props.soundLoop)
            soundlp.fade(0, 1, 2000, soundid)
        }

        /*  fade-in canvas (background and scroll area)  */
        anime({
            targets:   $(el).get(0),
            duration:  2000,
            autoplay:  true,
            direction: "normal",
            easing:    "easeInSine",
            delay:     0,
            opacity:   [ 0.0, 1.0 ]
        })
        anime({
            targets:   $(".canvas", el).get(0),
            duration:  2000,
            autoplay:  true,
            direction: "normal",
            easing:    "easeInSine",
            delay:     0,
            opacity:   [ 0.0, 1.0 ]
        })

        /*  give DOM time to determine size of canvas  */
        await new Promise((resolve) => setTimeout(resolve, 1000))

        /*  scroll text  */
        const ch = $(".canvas", el).height()
        const vh = $(el).height()
        const vd = parseInt(this.props.pageScrollDuration)
        await anime({
            targets:   $(".canvas", el).get(0),
            duration:  vd / vh * Math.abs(-ch - vh),
            autoplay:  true,
            direction: "normal",
            easing:    "linear",
            delay:     0,
            top:       [ vh, -ch ]
        }).finished

        /*  fade-out canvas (background and scroll area)  */
        anime({
            targets:   $(el).get(0),
            duration:  2000,
            autoplay:  true,
            direction: "normal",
            easing:    "easeInSine",
            delay:     0,
            opacity:   [ 1.0, 0.0 ]
        })
        anime({
            targets:   $(".canvas", el).get(0),
            duration:  2000,
            autoplay:  true,
            direction: "normal",
            easing:    "easeInSine",
            delay:     0,
            opacity:   [ 1.0, 0.0 ]
        })

        /*  optionally stop sound loop  */
        if (soundid !== 0) {
            soundlp.fade(1, 0, 2000, soundid)
            soundlp.once("fade", () => {
                soundlp.stop(soundid)
            })
        }
    }
}

