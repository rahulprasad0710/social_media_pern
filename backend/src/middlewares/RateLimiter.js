import rateLimiter from "express-rate-limit";
import logger from "../utils/logger.js";

const rateLimiterMiddleware = rateLimiter({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 10 requests,
    message: "Too many requests from this IP, please try again in an hour",
    handler: (req, res, _next) => {
        logger.error(`Rate limit exceeded from IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            error: "Too many requests from this IP, please try again in an hour",
            data: null,
        });
    },
    standardHeaders: true, // adds X-RateLimit-Limit and X-RateLimit-Remaining to the response header
    skipFailedRequests: true, // when true failed requests (response status >= 400) won't be counted
    skipSuccessfulRequests: false, // when true successful requests (response status < 400) won't be counted
    legacyHeaders: false, // when true the limit and remaining headers will be set according to RFC standard // when false (default) the limit-remaining and limit-reset headers will be set
});

export default rateLimiterMiddleware;
