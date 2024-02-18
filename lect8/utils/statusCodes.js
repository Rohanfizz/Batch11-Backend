module.exports = {
    OK: 200, // The request has succeeded
    CREATED: 201, // The request has been fulfilled and a new resource has been created
    ACCEPTED: 202, // The request has been accepted for processing, but the processing has not been completed
    BAD_REQUEST: 400, // The server cannot process the request due to a client error (e.g., malformed request syntax)
    UNAUTHORIZED: 401, // The client must authenticate itself to get the requested response
    FORBIDDEN: 403, // The client does not have access rights to the content
    NOT_FOUND: 404, // The server cannot find the requested resource
    INTERNAL_SERVER_ERROR: 500, // The server has encountered a situation it doesn't know how to handle
    SERVICE_UNAVAILABLE: 503 // The server is not ready to handle the request
};
