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

export { formatUserInfo, formatUserInfoToOptions, formatQuestionInfo };
