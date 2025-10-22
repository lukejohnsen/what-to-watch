class Movie {
    #id;
    #title;
    #year;
    #poster;
    #overview;
    #rating;

    constructor(data) {
        this.#id = data.id;
        this.#title = data.title;
        this.#year = data.year;
        this.#poster = data.poster;
        this.#overview = data.overview;
        this.#rating = data.rating;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get year() {
        return this.#year;
    }

    get poster() {
        return this.#poster;
    }

    get overview() {
        return this.#overview;
    }

    get rating() {
        return this.#rating;
    }

    isValid() {
        return this.#id && this.#title;
    }

    get ratingStars() {
        const fullStars = Math.floor(this.#rating / 2);
        const halfStar = this.#rating % 2 >= 1 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        return '★'.repeat(fullStars) + '½'.repeat(halfStar) + '☆'.repeat(emptyStars);
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            year: this.#year,
            poster: this.#poster,
            overview: this.#overview,
            rating: this.#rating,
        };
    }

    static fromJSON(json) {
        return new Movie(json);
    }
}

export default Movie;