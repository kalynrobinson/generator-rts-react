"use strict"
const BaseGenerator = require("../BaseGenerator")

const optionsObj = require("./options")

const namePrompt = [
    {
        type: "input",
        name: "name",
        message: "Context name?",
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

module.exports = class extends BaseGenerator {
    /**
     * Bind callbacks and register options/arguments.
     * @constructor
     */
    constructor(args, opts, options = optionsObj) {
        super(args, opts)

        this.namePrompt = namePrompt
        this.propPrompts = propPrompts
        this.templateProps = []
        this.baseName = ""
        this.optionObj = options

        this._registerOptions()
    }

    prompting() {
        this._greet()
        this._registerOptions()

        return this._loop(this.namePrompt)
    }

    _registerOptions() {
        Object.entries(this.optionObj).forEach(([name, config]) =>
            this.option(name, config)
        )
    }

    /**
     * Repeat props questions until user declines.
     */
    _loop(relevantPrompts) {
        return this.prompt(relevantPrompts).then(props => {
            // Initial question set
            if (props.name) {
                this.baseName = props.name
            }
            // Props question set
            else {
                this.templateProps.push(props)
            }

            return props.addProps ? this._loop(this.propPrompts) : this.prompt([])
        })
    }

    writing() {
        this._generateContext(this.options.output)

        if (this.options.container) {
            this._generateContainer(
                this.options.containerOutput || this.options.output
            )
        }

        if (this.options.module) {
            this._modifyContextModule(this.options.output)
        }

        if (this.options.container && this.options.module) {
            this._modifyContainerModule(
                this.options.containerOutput || this.options.output
            )
        }
    }

    _generateContext(output) {
        this.fs.copyTpl(
            this.templatePath("Context.tsx"),
            this.destinationPath(`${output}/${this.baseName}Context.tsx`),
            {
                name: this.baseName,
                props: this.templateProps,
                ...this.options
            }
        )
    }

    _generateContainer(output) {
        this.fs.copyTpl(
            this.templatePath("Container.tsx"),
            this.destinationPath(`${output}/${this.baseName}Container.tsx`),
            {
                name: this.baseName,
                props: this.templateProps,
                ...this.options
            }
        )
    }

    _modifyContextModule(output) {
        if (this.fs.exists(`${output}/index.ts`)) {
            this.fs.append(
                `${output}/index.ts`,
                `\nexport * from "./${this.baseName}Context"`
            )
        } else {
            this.fs.write(
                `${output}/index.ts`,
                `export * from "./${this.baseName}Context"`
            )
        }
    }

    /**
     * Appends ES6 export to index.ts or writes to a new file.
     * 
     * @param {string} output 
     * @param {string} name 
     */
    _modifyContainerModule(output) {
        if (this.fs.exists(`${output}/index.ts`)) {
            this.fs.append(
                `${output}/index.ts`,
    `\nexport * from "./${this.baseName}Container"`
            )
        } else {
            this.fs.write(
                `${output}/index.ts`,
                `export * from "./${this.baseName}Container"`
            )
        }
    }
}
