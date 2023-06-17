import React from "react";
import "./LeaderBoardPage.css";
import { useSelector } from "react-redux";
import { selectUserListSorted } from "../../redux/slices/userSlice";
const LeaderBoardPage = () => {
  const userListSorted = useSelector(selectUserListSorted);
  return (
    <div className="leaderboard-container">
      <h1 className="">Leaderboard</h1>

      <table className="leaderboard-table">
        <thead className="">
          <tr className="">
            <th className="cell">User</th>
            <th className="cell">Answered</th>
            <th className="cell">Created</th>
          </tr>
        </thead>
        <tbody className="">
          {userListSorted.length > 0 &&
            userListSorted.map((user) => (
              <tr key={user.id}>
                <td className="cell">
                  <img
                    src={user.avatarURL}
                    alt="avatar"
                    style={{ width: "70px" }}
                  />
                  <br />
                  <span className="">{user.name}</span>
                </td>
                <td className="cell">{Object.keys(user.answers).length}</td>
                <td className="cell">{user.questions.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoardPage;
