module.exports = {
    i18n: {
        type: Boolean,
        required: false,
        default: true,
        description: "Include translation hook"
    },
    typed: {
        type: Boolean,
        required: false,
        default: true,
        description: "Define props interface"
    },
    module: {
        type: Boolean,
        required: false,
        default: true,
        description: "Generate .tsx and index.ts files in named directory"
    },
    mdx: {
        type: Boolean,
        required: false,
        default: false,
        description: "Generate .mdx"
    },
    tests: {
        type: Boolean,
        required: false,
        default: false,
        description: "Generate Jest tests under __tests__"
    },
    inline: {
        type: Boolean,
        required: false,
        default: false,
        description:
            "Generate .test.tsx adjacent to component instead of under __tests__"
    },
    context: {
        type: Boolean,
        required: false,
        default: false,
        description: "Include useContext import and dummy usage"
    },
    state: {
        type: Boolean,
        required: false,
        default: false,
        description: "Include useState import and dummy usage"
    },
    output: {
        type: String,
        required: true,
        default: "components",
        description: "Directory to generate in"
    }
}
