import { createAtMyAppClient } from "@atmyapp/core"


const localUrl = "http://localhost:8282/v0/projects/nexnest-website"
const apiKey = "pk-ama-72b98bf8-2daa-4b90-aeae-b701f2af8705"

export const getClient = (previewKey?: string) => {
    return createAtMyAppClient({
        previewKey: previewKey,
        baseUrl: localUrl,
        apiKey: apiKey,
        plugins: ["with-id", "static-url"] // plugins for resolving static urls (images) and adding ids to collection
    })
}

export const getPreviewClient = (req: Request,) => {
    const url = new URL(req.url);
    const previewKey = url.searchParams.get('amaPreviewKey');
    return getClient(previewKey || undefined);
}
