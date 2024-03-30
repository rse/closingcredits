#!/usr/bin/env zx

const dst = "dist"

await $`rm -rf ${dst}`
await $`mkdir ${dst}`

await $`cp -p closingcredits.{js,css} ${dst}/`

let html = fs.readFileSync("index.html", "utf8")
html = html.replace(/basedir: ".+?"/g, "basedir: \".\"")
html = html.replace(/node_modules\/.*?\/([^/]+")/g, "$1")
fs.writeFileSync(`${dst}/index.html`, html, "utf8")

await $`cp -rp node_modules/typopro-web/web/TypoPRO-SourceSansPro/* ${dst}/`
await $`cp -p node_modules/jquery/dist/jquery.min.js ${dst}/`
await $`cp -p node_modules/axios/dist/axios.min.js ${dst}/`
await $`cp -p node_modules/animejs/lib/anime.min.js ${dst}/`
await $`cp -p node_modules/mousetrap/mousetrap.min.js ${dst}/`
await $`cp -p node_modules/howler/dist/howler.min.js ${dst}/`
await $`cp -p node_modules/@rse/soundlp/soundlp.{browser.js,data*} ${dst}/`

