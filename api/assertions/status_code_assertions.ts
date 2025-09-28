import { APIResponse } from '@playwright/test';
import { expect } from '@playwright/test';

export class StatusCodeAssertions {
    /**
     * Assert that the response has the expected status code
     * @param response - The API response from Playwright
     * @param expectedStatusCode - The expected HTTP status code
     */
    static async assertStatusCode(response: APIResponse, expectedStatusCode: number): Promise<void> {
        expect(response.status()).toBe(expectedStatusCode);
    }

    /**
     * Assert that the response has status code 200 (OK)
     * Used for successful GET requests
     */
    static async assertStatusCode200(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(200);
    }

    /**
     * Assert that the response has status code 201 (Created)
     * Used for successful POST requests that create resources
     */
    static async assertStatusCode201(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(201);
    }

    /**
     * Assert that the response has status code 204 (No Content)
     * Used for successful DELETE requests or PUT requests with no response body
     */
    static async assertStatusCode204(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(204);
    }

    /**
     * Assert that the response has status code 400 (Bad Request)
     * Used when the request is malformed or has invalid parameters
     */
    static async assertStatusCode400(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(400);
    }

    /**
     * Assert that the response has status code 401 (Unauthorized)
     * Used when authentication is required but missing or invalid
     */
    static async assertStatusCode401(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(401);
    }

    /**
     * Assert that the response has status code 403 (Forbidden)
     * Used when the user is authenticated but doesn't have permission
     */
    static async assertStatusCode403(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(403);
    }

    /**
     * Assert that the response has status code 404 (Not Found)
     * Used when the requested resource doesn't exist
     */
    static async assertStatusCode404(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(404);
    }

    /**
     * Assert that the response has status code 405 (Method Not Allowed)
     * Used when the HTTP method is not allowed for the endpoint
     */
    static async assertStatusCode405(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(405);
    }

    /**
     * Assert that the response has status code 409 (Conflict)
     * Used when there's a conflict with the current state (e.g., duplicate resource)
     */
    static async assertStatusCode409(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(409);
    }

    /**
     * Assert that the response has status code 415 (Unsupported Media Type)
     * Used when the request payload format is not supported
     */
    static async assertStatusCode415(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(415);
    }

    /**
     * Assert that the response has status code 422 (Unprocessable Entity)
     * Used when the request is well-formed but has semantic errors
     */
    static async assertStatusCode422(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(422);
    }

    /**
     * Assert that the response has status code 429 (Too Many Requests)
     * Used when rate limiting is applied
     */
    static async assertStatusCode429(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(429);
    }

    /**
     * Assert that the response has status code 500 (Internal Server Error)
     * Used when there's an unexpected server error
     */
    static async assertStatusCode500(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(500);
    }

    /**
     * Assert that the response has status code 502 (Bad Gateway)
     * Used when there's an error in the upstream server
     */
    static async assertStatusCode502(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(502);
    }

    /**
     * Assert that the response has status code 503 (Service Unavailable)
     * Used when the service is temporarily unavailable
     */
    static async assertStatusCode503(response: APIResponse): Promise<void> {
        expect(response.status()).toBe(503);
    }

    /**
     * Assert that the response status code is in the 2xx range (success)
     */
    static async assertSuccessStatusCode(response: APIResponse): Promise<void> {
        const statusCode = response.status();
        expect(statusCode).toBeGreaterThanOrEqual(200);
        expect(statusCode).toBeLessThan(300);
    }

    /**
     * Assert that the response status code is in the 4xx range (client error)
     */
    static async assertClientErrorStatusCode(response: APIResponse): Promise<void> {
        const statusCode = response.status();
        expect(statusCode).toBeGreaterThanOrEqual(400);
        expect(statusCode).toBeLessThan(500);
    }

    /**
     * Assert that the response status code is in the 5xx range (server error)
     */
    static async assertServerErrorStatusCode(response: APIResponse): Promise<void> {
        const statusCode = response.status();
        expect(statusCode).toBeGreaterThanOrEqual(500);
        expect(statusCode).toBeLessThan(600);
    }
}
