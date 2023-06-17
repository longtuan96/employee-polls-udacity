import { _getUsers } from "./DATABASE/_DATA";

const formatUserInfo = (data = {}) => {
  return Object.values(data);
};

const formatQuestionInfo = (data = {}) => {
  return Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
};

const formatUserInfoToOptions = (data = []) => {
  if (data.length > 0) {
    return data.map((item) => {
      return { value: item.id, label: item.name };
    });
  }
};

const findQuestion = (questionId, questionList = []) => {
  if (!!questionId && questionList.length > 0) {
  }
};
export { formatUserInfo, formatUserInfoToOptions, formatQuestionInfo };
