import axios from "axios";

class Olive {
  private baseURL: string;
  private config: object;
  constructor() {
    this.baseURL = process.env.OLIVE_BASE_URL;
    this.config = {
      headers: {
        "X-Date": process.env.X_Date,
        "client-authorization": process.env.HMAC,
      },
    };
  }

  async sendSSE(body:any) {
    if (process.env.NODE_ENV === "test") {
      return;
    }
    try {
      await axios.post(`${this.baseURL}/events`, body, this.config);
    } catch (error) {
      console.error(error.message);
    }
    return;
  }
}

export const olive = new Olive();

