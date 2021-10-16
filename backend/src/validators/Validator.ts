
interface Lenght {
    min?: number;
    max: number;
}

enum StringError {
    PATTERN = "pattern",
    MAX_LENGHT = "max",
    MIN_LENGHT = "min"
}

export abstract class Validator {

    static validateString(value: string, lenght: Lenght, pattern?: RegExp): StringError {
        if (pattern && value.matchAll(pattern))
            return StringError.PATTERN;
        if (lenght?.min && value.length < lenght.min)
            return StringError.MIN_LENGHT;
        if (lenght?.max && value.length > lenght.max)
            return StringError.MAX_LENGHT;
        return null
    }
}