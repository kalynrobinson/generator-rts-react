"use strict"
const Generator = require("yeoman-generator")
const chalk = require("chalk")
const yosay = require("yosay")
const prettier = require("gulp-prettier")
const filter = require("gulp-filter")

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

    greeting() {
        this.log(
            yosay(
                `Welcome to the majestic ${chalk.red(
                    "generator-rts-react"
                )} generator!`
            )
        )
    }
}
