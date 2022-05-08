interface GennericError {
    title: string
    message: string
}

interface AuthFieldError {
    hasError: boolean
    inlineErrorMessage: string
}

interface AuthFields {
    [field: string]: AuthFieldError
}

export interface AuthErrors {
    generic: GennericError
    fields: AuthFields
}