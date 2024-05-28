/**
 * Represents the Olive class that handles sending Server-Sent Events (SSE) to a specified base URL.
 */
import axios from "axios";

class Olive {
  private baseURL: string;
  private config: object;

  /**
   * Constructs a new instance of the Olive class.
   */
  constructor() {
    this.baseURL = process.env.OLIVE_BASE_URL;
    this.config = {
      headers: {
        "X-Date": process.env.X_Date,
        "client-authorization": process.env.HMAC,
      },
    };
  }

  /**
   * Sends a Server-Sent Event (SSE) with the specified body to the configured base URL.
   * @param body - The body of the SSE.
   */
  async sendSSE(body: any) {
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

