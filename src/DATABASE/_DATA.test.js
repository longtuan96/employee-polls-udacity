const { _saveQuestionAnswer, _saveQuestion } = require("./_DATA");
describe("Unit test for _saveQuestionAnswer and _saveQuestion", () => {
  it("_saveQuestionAnswer should return data when receive correct payload", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    });

    expect(response).toBeTruthy();
  });
  it("_saveQuestion should return data when receive correct payload", async () => {
    const quesion = {
      optionOneText: "do Some thing 1",
      optionTwoText: "do Some thing 2",
      author: "sarahedo",
    };
    const response = await _saveQuestion(quesion);
    expect(response).toBeTruthy();
  });
  it("_saveQuestionAnswer should return an error for incorrect payload", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
    }).catch((e) => e);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });

  it(" _saveQuestionshould return an error for incorrect payload", async () => {
    const response = await _saveQuestion({
      author: "sarahedo",
    }).catch((e) => e);

    expect(response).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});
