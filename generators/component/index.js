'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const prettier = require('gulp-prettier')
const filter = require('gulp-filter')

const options = require('./options')

const prettierFilter = filter(['**/*.{js,jsx,ts,tsx}'], { restore: true })

module.exports = class extends Generator {
    /**
     * Bind callbacks and register options/arguments.
     * @constructor
     */
    constructor(args, opts) {
        super(args, opts)
        this._registerTransformers()

        // Register options
        Object.entries(options).forEach(([name, config]) => this.option(name, config))
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
                `Welcome to the majestic ${chalk.red('generator-rts-react')} generator!`
            )
        )
    }

    prompting() {
        const namePrompt = [
            {
                type: 'input',
                name: 'name',
                message: 'Component name?',
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
        // If module, generate within named directory
        this.destination = this.options.module ? `${this.name}/` : './'

        this._generateComponent()
        this._generateModule()
        this._generateMdx()
        this._generateTests()
    }

    _generateComponent() {
        this.fs.copyTpl(
            this.templatePath('Component.tsx'),
            this.destinationPath(`${this.destination}/${this.name}.tsx`),
            {
                name: this.name,
                props: this.columns,
                ...this.options
            }
        )
    }

    _generateModule() {
        if (this.options.module) {
            this.fs.copyTpl(
                this.templatePath('index.ts'),
                this.destinationPath(`${this.destination}/index.ts`),
                {
                    name: this.name,
                    props: this.columns,
                    ...this.options
                }
            )
        }
    }

    _generateMdx() {
        if (this.options.mdx) {
            this.fs.copyTpl(
                this.templatePath('Component.mdx'),
                this.destinationPath(`${this.destination}/${this.name}.mdx`),
                {
                    name: this.name,
                    props: this.columns,
                    ...this.options
                }
            )
        }
    }

    _generateTests() {
        if (this.options.tests) {
            if (this.options.inline) {
                this.fs.copyTpl(
                    this.templatePath('Component.test.tsx'),
                    this.destinationPath(`${this.destination}/${this.name}.test.tsx`),
                    {
                        name: this.name,
                        props: this.columns,
                        ...this.options
                    }
                )
            } else {
                let destination = `${this.destination}/__tests__`
                this.fs.copyTpl(
                    this.templatePath('__tests__/Component.test.tsx'),
                    this.destinationPath(`${destination}/${this.name}.tsx`),
                    {
                        name: this.name,
                        props: this.columns,
                        ...this.options
                    }
                )
            }
        }
    }
}
