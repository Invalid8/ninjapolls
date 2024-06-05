import { getFingerprint } from "./fingerprinting";
import Api from "./API";
import { showNotification } from "../lib";

export const getPolls = async () => {
  try {
    const response = await Api.get(`/polls`);
    const { polls, message } = await response;

    return {
      polls,
      success: true,
      message,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const getPollById = async (id, opt) => {
  try {
    const response = await Api.get(
      `${!!opt?.example ? "/example" : ""}/polls/${id}`
    );
    const { poll, message } = await response;
    return {
      poll,
      success: true,
      message,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const deletePollById = async (id) => {
  try {
    const response = await Api.delete(`/polls/${id}`);

    const { poll, message } = await response;
    return {
      poll,
      success: true,
      message,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const toggleStatusById = async (id) => {
  try {
    const response = await Api.put(`/polls/toggle-status/${id}`);
    const { message } = await response;

    return {
      success: true,
      message,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

// pollServices.js

export const createPoll = async ({ question, options }) => {
  try {
    const response = await Api.post(
      `/polls/create`,
      JSON.stringify({ question, options })
    );

    const { poll, message } = await response;

    return {
      poll,
      success: true,
      message,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};

export const vote = async ({ id, answer }, opt) => {
  try {
    const response = await Api.post(
      `${!!opt?.example ? "/example" : ""}/polls/vote`,
      {
        id,
        option: answer,
      }
    );

    const { message, poll } = await response;

    return {
      success: true,
      message,
      poll,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || error.message,
    };
  }
};
