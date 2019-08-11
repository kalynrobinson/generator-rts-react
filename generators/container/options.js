module.exports = {
    context: {
        type: Boolean,
        required: false,
        default: false,
        description: "Generate context for container"
    },
    output: {
        type: String,
        required: true,
        default: "containers",
        description: "Directory to generate in"
    },
    contextOutput: {
        type: String,
        default: "contexts",
        description: "Directory to generate context in"
    },
    module: {
        type: Boolean,
        default: false,
        description: "Update index.ts with generated files"
    }
}
