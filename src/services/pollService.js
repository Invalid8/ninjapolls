import { getFingerprint } from "./fingerprinting";
import Api from "./API";

export const getPolls = async () => {
  try {
    const response = await Api.get(`/polls/active`);
    const { polls, message } = await response;

    return {
      polls,
      success: true,
      message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getPollById = async (id) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/polls/${id}`);
    if (!response.ok) {
      const { message } = await response.json();
      return {
        success: false,
        message,
      };
    }
    const { poll, message } = await response.json();
    return {
      poll,
      success: true,
      message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deletePollById = async (id) => {
  try {
    const response = await Api.delete(`/polls/${id}`);
    if (!response.ok) {
      const { message } = await response.json();
      return {
        success: false,
        message,
      };
    }
    const { poll, message } = await response.json();
    return {
      poll,
      success: true,
      message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// pollServices.js

export const createPoll = async ({ question, options }) => {
  const iid = await getFingerprint(); // Pass device ID in the headers
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/polls/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-device-id": iid,
      },
      body: JSON.stringify({ question, options }),
    });

    if (!response.ok) {
      const { message } = await response.json();

      return {
        success: false,
        message,
      };
    }

    const { poll, message } = await response.json();

    return {
      poll,
      success: true,
      message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const vote = async ({ id, answer }) => {
  const iid = await getFingerprint(); // Pass device ID in the headers
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/polls/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-device-id": iid,
      },
      body: JSON.stringify({
        id,
        option: answer,
      }),
    });

    if (!response.ok) {
      const { message } = await response.json();

      return {
        success: false,
        message,
      };
    }

    const { message, poll } = await response.json();

    return {
      success: true,
      message,
      poll,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
