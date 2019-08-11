"use strict"
const Generator = require("yeoman-generator")
const prettier = require("gulp-prettier")
const filter = require("gulp-filter")
const signBunny = require("sign-bunny")
const chalk = require("chalk")

const prettierFilter = filter(["**/*.{js,jsx,ts,tsx}"], { restore: true })

module.exports = class extends Generator {
    /**
     * Bind callbacks and register options/arguments.
     * @constructor
     */
    constructor(args, opts) {
        super(args, opts)
        this._registerTransformers()
    }

    /**
     * Registers formatter.
     * These must be registered individually, not in batch.
     */
    _registerTransformers() {
        this.registerTransformStream(prettierFilter)
        this.registerTransformStream(prettier())
        this.registerTransformStream(prettierFilter.restore)
    }

    _greet() {
        this.log(chalk.cyanBright(signBunny("rts-react")))
    }
}
