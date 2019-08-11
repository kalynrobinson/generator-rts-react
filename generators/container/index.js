"use strict"
const ContextGenerator = require("../context")

const optionsObj = require("./options")

const namePrompt = [
    {
        type: "input",
        name: "name",
        message: "container name?",
        required: true,
        default: "Dummy"
    },
    {
        type: "confirm",
        name: "addProps",
        message: "Do you want to add props?",
        default: "Y"
    }
]

const propPrompts = [
    {
        type: "input",
        name: "attributeName",
        message: "Prop name?",
        default: "dummy"
    },
    {
        type: "input",
        name: "attributeType",
        message: "Prop type?",
        default: "any"
    },
    {
        type: "confirm",
        name: "addProps",
        message: "Do you want to add more props?",
        default: "Y"
    }
]

/**
 * Generates stateful container, presumably rendering a context provider.
 */
module.exports = class extends ContextGenerator {
    /**
     * Bind callbacks and register options/arguments.
     * @constructor
     */
    constructor(args, opts, options = optionsObj) {
        super(args, opts, options)

        this.namePrompt = namePrompt
        this.propPrompts = propPrompts
    }

    prompting() {
        this._greet()

        return this._loop(this.namePrompt)
    }

    writing() {
        this._generateContainer(this.options.output)

        if (this.options.context) {
            this._generateContext(
                this.options.contextOutput || this.options.output
            )
        }

        if (this.options.context && this.options.module) {
            this._modifyContextModule(
                this.options.contextOutput || this.options.output
            )
        }

        if (this.options.module) {
            this._modifyContainerModule(this.options.output)
        }
    }
}
