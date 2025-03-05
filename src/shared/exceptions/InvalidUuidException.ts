class InvalidUuidException extends Error {
    constructor(invalidId: string) {
        super()
        this.message = `Invalid UUID ${invalidId}`
    }
}