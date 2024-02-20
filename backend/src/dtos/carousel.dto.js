export class CorouselDTO {
    constructor(title, url, status, description) {
        this.title = title;
        this.url = url;
        this.status = status;
        this.description = description;
    }
}

export class CorouselResponseDTO extends CorouselDTO {
    constructor(id, title, url, status, description) {
        super(title, url, status, description);
        this.id = id;
    }
}
