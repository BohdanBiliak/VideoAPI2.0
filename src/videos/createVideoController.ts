import { Request, Response } from "express";
import { db } from "../db/db";
import {  OutputVideoType} from "../input-output/video-types";

export const inputValidation = (video: OutputVideoType) => {
    const errors: { errorsMessages: { message: string; field: string }[] } = { errorsMessages: [] };

    // Validate title
    if (!video.title || video.title.trim() === "") {
        errors.errorsMessages.push({
            message: "Title is required and must be a non-empty string",
            field: "title"
        });
    } else if (video.title.length > 40) {
        errors.errorsMessages.push({
            message: "Title must not exceed 40 characters",
            field: "title"
        });
    }

    // Validate author
    if (!video.author || video.author.trim() === "") {
        errors.errorsMessages.push({
            message: "Author is required and must be a non-empty string",
            field: "author"
        });
    } else if (video.author.length > 20) {
        errors.errorsMessages.push({
            message: "Author must not exceed 20 characters",
            field: "author"
        });
    }

    // Validate available resolutions
    const allowedResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
    if (video.availableResolutions.some(res => !allowedResolutions.includes(res))) {
        errors.errorsMessages.push({
            message: `Invalid resolution(s). Must be one of: ${allowedResolutions.join(", ")}`,
            field: "availableResolutions"
        });
    }
    if (typeof video.canBeDownloaded !== 'boolean') {
        if (video.canBeDownloaded === "true") {
            video.canBeDownloaded = true;
        } else if (video.canBeDownloaded === "false") {
            video.canBeDownloaded = false;
        } else {
            errors.errorsMessages.push({
                message: "canBeDownloaded must be a boolean or a string that can be converted to a boolean",
                field: "canBeDownloaded"
            });
        }
    }

    return errors;
};




export const createVideoController = (req: Request<any, any, OutputVideoType>, res: Response) => {
    const errors = inputValidation(req.body);

    if (errors.errorsMessages.length > 0) {
        res.status(400).send(errors);
        return;
    }

    const newVideo: OutputVideoType = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author,
        availableResolutions: req.body.availableResolutions || [],
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
    };

    db.videos.push(newVideo);
    res.status(201).json(newVideo);
};
