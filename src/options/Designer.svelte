<script lang="ts">
    import { onMount } from "svelte";
    import type { Template } from "@pdfme/common";
    import { BLANK_PDF } from "@pdfme/common";
    import { Designer } from "@pdfme/ui";
    import { generate } from "@pdfme/generator";

    let designer: Designer;
    let template: Template = {
        basePdf: BLANK_PDF,
        schemas: [],
    };
    const reader = new FileReader();

    onMount(() => {
        const target = document.getElementById("designer");
        if (target) {
            designer = new Designer({
                domContainer: target!,
                template,
                options: {
                    theme: {
                        components: {
                            Button: {
                                colorPrimary: "#00b96b",
                                colorBgBase: "red",
                                algorithm: true, // Enable algorithm
                            },
                        },
                    },
                },
            });
            designer.onChangeTemplate((t) => {
                template = { ...template, ...t };
            });
        }
    });

    const handleDownload = () => {
        generate({ template, inputs: template.sampledata ?? [{}] }).then(
            (pdf) => {
                const blob = new Blob([pdf.buffer], {
                    type: "application/pdf",
                });
                window.open(URL.createObjectURL(blob));
            },
        );
    };

    const handleLoadPDF = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = () => {
                template.basePdf = reader.result as string;
                designer.updateTemplate(template);
                designer = designer;
            };
        }
    };
</script>

<div id="container" class="static">
    <div class="absolute flex gap-2 flex-col left-4 top-4 z-50">
        <input
            on:change={handleLoadPDF}
            type="file"
            class="file-input file-input-bordered file-input-warning w-full max-w-xs"
        />
        <button on:click={handleDownload} class="btn btn-warning"
            >Download PDF</button
        >
    </div>
    <div id="designer"></div>
</div>
