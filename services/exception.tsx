export class InvalidIdError extends Error {
    id: string

    constructor(id: string, message = "Invalid ID specified") {

        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message = message);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidIdError);
        }

        // Custom debugging information
        this.id = id;
    }
}

export class InvalidPropertyError extends Error {
    propertyName: string
    propertyValue: any

    constructor(propertyName: string, propertyValue: any, message = "Invalid value given for property: " + propertyName) {

        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message = message);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidPropertyError);
        }

        // Custom debugging information
        this.propertyName = propertyName;
        this.propertyValue = propertyValue;
    }
}