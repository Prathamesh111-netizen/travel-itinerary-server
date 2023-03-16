const { Configuration, OpenAIApi } = require("openai");

let openai = null;
class OpenAI {
    constructor() {
        if (openai) {
            return openai;
        }
        this._init();
        return openai;
    }

    _init() {
        const { OPENAI_API_KEY } = process.env;
        if (!OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not defined");
        }
        const configuration = new Configuration({
            apiKey: OPENAI_API_KEY,
        });
        openai = new OpenAIApi(configuration);
    }
}

module.exports = new OpenAI();