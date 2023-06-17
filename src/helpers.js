import { _getUsers } from "./DATABASE/_DATA";

const formatUserInfo = (data = {}) => {
  return Object.values(data);
};

const formatUserInfoToOptions = (data = []) => {
  if (data.length > 0) {
    return data.map((item) => {
      return { value: item.id, label: item.name };
    });
  }
};
export { formatUserInfo, formatUserInfoToOptions };
