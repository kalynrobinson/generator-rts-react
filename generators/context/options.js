module.exports = {
    container: {
        type: Boolean,
        required: false,
        default: false,
        description: 'Generate stateful container for context'
    },
    output: {
        type: String,
        required: true,
        default: 'contexts',
        description: 'Directory to generate in'
    },
    containerOutput: {
        type: String,
        default: 'containers',
        description: 'Directory to generate container in'
    },
    module: {
        type: Boolean,
        default: false,
        description: 'Update index.ts with generated files'
    }
}
