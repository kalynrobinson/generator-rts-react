"use strict"
const chalk = require("chalk")

const BaseGenerator = require("../BaseGenerator")
const subgenerators = require("./subgenerators")

module.exports = class extends BaseGenerator {
    /**
     * Set help output.
     * @constructor
     */
    constructor(args, opts) {
        super(args, opts)

        this.desc(this._listSubgenerators().join("\n"))
    }

    /**
     * Greet and list subgenerators.
     */
    prompting() {
        this._greet()

        this.log("")

        this.log(this._listSubgenerators().join("\n"))
    }

    /**
     * Builds list of subgenerator names to be logged.
     * @return {string[]} 
     */
    _listSubgenerators() {
        const lines = [
            chalk.yellow("Try running one of the subgenerators:")
        ]
        
        subgenerators.forEach(sub => {
            lines.push(`  ${chalk.gray("yo rts-react:")}${sub}`)
        })

        return lines
    }
}
