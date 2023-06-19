import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "react";
import { TFetchedData } from "../types/TFetchedData";

export const fetchData = async (
    url: string,
    navigator: string,
    setData: Dispatch<TFetchedData>,
    navigate: NavigateFunction
) => {
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
        navigate(navigator);
    } catch (error) {
        console.log("Error fetching data:", error);
    }
};
