import {
  CENTRE_LIST_REQUEST,
  CENTRE_LIST_SUCCESS,
  CENTRE_LIST_FAIL,
  CENTRE_DETAILS_REQUEST,
  CENTRE_DETAILS_SUCCESS,
  CENTRE_DETAILS_FAIL,
  CENTRE_REGISTER_REQUEST,
  CENTRE_REGISTER_SUCCESS,
  CENTRE_REGISTER_FAIL,
  CENTRE_DELETE_REQUEST,
  CENTRE_DELETE_SUCCESS,
  CENTRE_DELETE_FAIL,
  CENTRE_UPDATE_REQUEST,
  CENTRE_UPDATE_SUCCESS,
  CENTRE_UPDATE_FAIL,
} from "../constants/centreConstants";
import axios from "axios";

export const listCentres = () => async (dispatch) => {
  try {
    dispatch({ type: CENTRE_LIST_REQUEST });

    const { data } = await axios.get("/api/admin/centres");

    dispatch({
      type: CENTRE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CENTRE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCertreDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CENTRE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/admin/centres/${id}`);

    dispatch({
      type: CENTRE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CENTRE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const centreRegister = (centreName) => async (dispatch) => {
  try {
    dispatch({
      type: CENTRE_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/admin/centres/register",
      { centreName },
      config
    );

    dispatch({
      type: CENTRE_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CENTRE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CENTRE_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCentre = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CENTRE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorizatio: `Bearer ${userInfo.token},`,
      },
    };

    await axios.delete(`/api/admin/centres/${id}`, config);

    dispatch({
      type: CENTRE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CENTRE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCentre = (centre) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CENTRE_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorizatio: `Bearer ${userInfo.token},`,
      },
    };

    const { data } = await axios.put(
      `/api/admin/centres/${centre._id}`,
      centre,
      config
    );

    dispatch({
      type: CENTRE_UPDATE_SUCCESS,
    });

    dispatch({
      type: CENTRE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CENTRE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
