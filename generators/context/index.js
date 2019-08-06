'use strict'
const BaseGenerator = require('../BaseGenerator')

const options = require('./options')

module.exports = class extends BaseGenerator {
    /**
     * Bind callbacks and register options/arguments.
     * @constructor
     */
    constructor(args, opts) {
        super(args, opts)

        // Register options
        Object.entries(options).forEach(([name, config]) => this.option(name, config))
    }

    prompting() {
        const namePrompt = [
            {
                type: 'input',
                name: 'name',
                message: 'Context name?',
                required: true,
                default: 'Dummy'
            },
            {
                type: 'confirm',
                name: 'addProps',
                message: 'Do you want to add props?',
                default: 'Y'
            }
        ]

        const columnPrompts = [
            {
                type: 'input',
                name: 'attributeName',
                message: 'Prop name?',
                default: 'dummy'
            },
            {
                type: 'input',
                name: 'attributeType',
                message: 'Prop type?',
                default: 'any'
            },
            {
                type: 'confirm',
                name: 'addProps',
                message: 'Do you want to add more props?',
                default: 'Y'
            }
        ]

        this.columns = []

        const loop = relevantPrompts => {
            return this.prompt(relevantPrompts).then(props => {
                // Initial question set
                if (props.name) {
                    this.name = props.name
                }
                // Props question set
                else {
                    this.columns.push(props)
                }

                return props.addProps ? loop(columnPrompts) : this.prompt([])
            })
        }

        return loop([...namePrompt])
    }

    writing() {
        this._generateContext()
        this._generateContainer()
        this._modifyModule()
        this._modifyContainerModule()
    }

    _generateContext() {
        this.fs.copyTpl(
            this.templatePath('Context.tsx'),
            this.destinationPath(`${this.options.output}/${this.name}Context.tsx`),
            {
                name: this.name,
                props: this.columns,
                ...this.options
            }
        )
    }

    _generateContainer() {
        if (this.options.container) {
            this.fs.copyTpl(
                this.templatePath('Container.tsx'),
                this.destinationPath(
                    `${this.options.containerOutput || this.options.output}/${
                        this.name
                    }Container.tsx`
                ),
                {
                    name: this.name,
                    props: this.columns,
                    ...this.options
                }
            )
        }
    }

    _modifyModule() {
        if (this.options.module) {
            this.fs.append(
                `${this.options.output}/index.ts`,
                `
            export * from "./${this.name}Context"`
            )
        }
    }

    _modifyContainerModule() {
        if (this.options.container && this.options.module) {
            const destination = this.options.containerOutput || this.options.output

            try {
                this.fs.append(
                    `${destination}/index.ts`,
                    `
            export * from "./${this.name}Container"`
                )
            } catch (e) {
                this.log(`Failed updating ${destination}/index.ts....`)
            }
        }
    }
}
