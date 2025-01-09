import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        lineHeight: {
            setLineHeight: (value: string) => ReturnType;
            unsetLineHeight: () => ReturnType;
        };
    }
}

export const LineHeightExtension = Extension.create({
    name: "lineHeight",

    addOptions() {
        return {
            types: ["textStyle"],
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: null,
                        renderHTML: (attributes) => {
                            if (!attributes.lineHeight) {
                                return {};
                            }
                            return { style: `line-height: ${attributes.lineHeight}` };
                        },
                        parseHTML: (element) => element.style.lineHeight || null,
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setLineHeight: (value) => ({ commands }) => {
                return commands.updateAttributes("textStyle", { lineHeight: value });
            },
            unsetLineHeight: () => ({ commands }) => {
                return commands.resetAttributes("textStyle", "lineHeight");
            },
        };
    },
});
