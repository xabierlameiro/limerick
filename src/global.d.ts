declare module "*.mdx" {
    const content: string;
    export default content;
}

declare namespace google.maps {
    class DirectionsService {
        route(
            request: DirectionsRequest,
            callback: (
                result: DirectionsResult,
                status: DirectionsStatus
            ) => void
        ): Promise;
    }
}
