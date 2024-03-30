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
class ClosingCredits {
    constructor (props = {}) {
        /*  take over properties  */
        this.props = {
            canvasColor:        "#000000c0",
            headerColor:        "#999999",
            headerFontSize:     "40px",
            headerFontWeight:   "200",
            textColor:          "#ffffff",
            textFontSize:       "40px",
            textFontWeight:     "400",
            leftColor:          "#ffffff",
            leftFontSize:       "40px",
            leftFontWeight:     "500",
            rightColor:         "#cccccc",
            rightFontSize:      "40px",
            rightFontWeight:    "300",
            soundLoop:          "orchester1",
            pageScrollDuration: "10000",
            pageTextURL:        "sample.txt",
            ...props
        }
    }
    async start () {
        /*  initialize internal state  */
        this.started    = null
        this.show       = false
        this.ended      = false
        this.soundid    = null

        /*  create DOM fragment  */
        this.el = $(`
            <div class="closingcredits">
                <div class="canvas">
                </div>
            </div>
        `)
        $(this.el)
            .css("background-color", this.props.canvasColor)

        /*  inject DOM fragment into DOM tree  */
        $("body").append(this.el)

        /*  load and parse text  */
        let text = (await axios.get(this.props.pageTextURL))?.data ?? ""
        text = text.replace(/\(c\)/g, "&copy;")
        text.replace(/(^|[^\r\n]+)\r?\n-+\r?\n\s*\r?\n((?:[^\r\n]+\r?\n)+)(?=\s*\r?\n|$)/g, (_, h, b) => {
            $(".canvas", this.el).append(
                $(`<div class="header">${h}</div>`)
                    .css("color", this.props.headerColor)
                    .css("font-size", this.props.headerFontSize)
                    .css("font-weight", this.props.headerFontWeight))
            const lines = b.split(/\r?\n/)
            for (const line of lines) {
                const m = line.match(/^(.+?)\s*\|\s*(.+?)\s*$/)
                let el
                if (m !== null) {
                    const [ , left, right ] = m
                    el = $(`<div class="columns">
                        <div class="left">${left}</div>
                        <div class="right">${right}</div>
                    </div>`)
                    $(".left", el)
                        .css("color", this.props.leftColor)
                        .css("font-size", this.props.leftFontSize)
                        .css("font-weight", this.props.leftFontWeight)
                    $(".right", el)
                        .css("color", this.props.rightColor)
                        .css("font-size", this.props.rightFontSize)
                        .css("font-weight", this.props.rightFontWeight)
                }
                else {
                    el = $(`<div class="text">${line}</div>`)
                        .css("color", this.props.textColor)
                        .css("font-size", this.props.textFontSize)
                        .css("font-weight", this.props.textFontWeight)
                }
                $(".canvas", this.el).append(el)
            }
        })

        /*  optionally start sound loop  */
        let soundid = 0
        if (this.props.soundLoop !== "none") {
            soundid = soundlp.play(this.props.soundLoop)
            soundlp.fade(0, 1, 2000, soundid)
        }

        /*  fade-in canvas  */
        anime({
            targets:   $(this.el).get(0),
            duration:  3000,
            autoplay:  true,
            direction: "normal",
            easing:    "easeInSine",
            delay:     0,
            opacity:   [ 0.0, 1.0 ]
        }).finished,
        anime({
            targets:   $(".canvas", this.el).get(0),
            duration:  3000,
            autoplay:  true,
            direction: "normal",
            easing:    "easeInSine",
            delay:     0,
            opacity:   [ 0.0, 1.0 ]
        }).finished

        /*  scroll text  */
        const vh = $(this.el).height()
        const ch = $(".canvas", this.el).height()
        const vd = parseInt(this.props.pageScrollDuration)
        for (let offset = vh; offset > -ch; offset -= vh) {
            await anime({
                targets:   $(".canvas", this.el).get(0),
                duration:  vd,
                autoplay:  true,
                direction: "normal",
                easing:    "linear",
                delay:     0,
                top:       [ offset, offset - vh ]
            }).finished
        }

        /*  optionally stop sound loop  */
        if (soundid !== 0) {
            soundlp.fade(1, 0, 2000, soundid)
            soundlp.once("fade", () => {
                soundlp.stop(soundid)
            })
        }
    }
    async stop () {
    }
    async restart () {
        await this.stop()
        await this.start()
    }
}

