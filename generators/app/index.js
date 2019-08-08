"use strict"
const Generator = require("yeoman-generator")
var signBunny = require("sign-bunny")

module.exports = class extends Generator {
    prompting() {
        // Have Yeoman greet the user.
        this.log(signBunny("rts-react"))

        const prompts = [
            {
                type: "confirm",
                name: "someAnswer",
                message: "Would you like to enable this option?",
                default: true
            }
        ]

        return this.prompt(prompts).then(props => {
            this.props = props
        })
    }

    writing() {
        this.fs.copy(
            this.templatePath("dummyfile.txt"),
            this.destinationPath("dummyfile.txt")
        )
    }

    install() {
        this.installDependencies()
    }
}
